import { useCallback, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const BOTTOM_POSITION_HEIGHT = SCREEN_HEIGHT * 0.15; // 15% height at bottom
const CENTER_POSITION_HEIGHT = SCREEN_HEIGHT * 0.50;  // 50% height at center
const FULL_POSITION_HEIGHT = SCREEN_HEIGHT;          // Full height

const CustomMovableModal = ({ ...Props }: Props) => {
    // Track current position state
    const [currentPosition, setCurrentPosition] = useState<'bottom' | 'center' | 'full'>(
        Props.position || 'bottom'
    );

    // Shared values for animation
    const translateY = useSharedValue(0);
    const contentHeight = useSharedValue(
        Props.position === 'full' ? FULL_POSITION_HEIGHT :
            Props.position === 'center' ? CENTER_POSITION_HEIGHT :
                BOTTOM_POSITION_HEIGHT
    );

    // Create a shared value to track drag progress (0 to 1)
    const dragProgress = useSharedValue(0);

    // Update height when position prop changes
    useEffect(() => {
        if (Props.position !== currentPosition) {
            setCurrentPosition(Props.position || 'bottom');
            contentHeight.value = withSpring(
                Props.position === 'full' ? FULL_POSITION_HEIGHT :
                    Props.position === 'center' ? CENTER_POSITION_HEIGHT :
                        BOTTOM_POSITION_HEIGHT,
                { damping: 20, stiffness: 120 }
            );
            translateY.value = withSpring(0, { damping: 20, stiffness: 120 });
        }
    }, [Props.position]);

    // Handle position changes
    const updatePosition = useCallback((position: 'bottom' | 'center' | 'full') => {
        if (position !== currentPosition) {
            setCurrentPosition(position);
        }
    }, [currentPosition]);

    // Gesture logic
    const gesture = Gesture.Pan()
        .onStart(() => {
            // Reset drag state when gesture begins
            translateY.value = 0;
        })
        .onUpdate((event) => {
            // Get current height based on position
            const currentHeight =
                currentPosition === 'full' ? FULL_POSITION_HEIGHT :
                    currentPosition === 'center' ? CENTER_POSITION_HEIGHT :
                        BOTTOM_POSITION_HEIGHT;

            // Determine drag direction
            const isDraggingDown = event.translationY > 0;

            // Apply minimal resistance at extremes
            if ((currentPosition === 'bottom' && isDraggingDown) ||
                (currentPosition === 'full' && !isDraggingDown)) {
                // At extremes (bottom trying to go lower, or full trying to go higher)
                // Just show a small movement for feedback
                translateY.value = event.translationY * 0.2;
                return;
            }

            // Handle normal drag between positions
            let nextHeight;
            if (isDraggingDown) {
                // Dragging down - determine target height
                nextHeight = currentPosition === 'full' ? CENTER_POSITION_HEIGHT : BOTTOM_POSITION_HEIGHT;
            } else {
                // Dragging up - determine target height
                nextHeight = currentPosition === 'bottom' ? CENTER_POSITION_HEIGHT : FULL_POSITION_HEIGHT;
            }

            // Calculate the drag progress (0-1) - use a smaller threshold for easier dragging
            // 20% of screen height is enough to trigger transition
            const dragThreshold = SCREEN_HEIGHT * 0.2;
            const dragDistance = Math.min(Math.abs(event.translationY), dragThreshold);
            const progress = dragDistance / dragThreshold;
            dragProgress.value = progress;

            // Calculate the height change
            const heightDiff = nextHeight - currentHeight;

            // Update height in real-time as user drags
            if (isDraggingDown) {
                // When dragging down, decrease height
                contentHeight.value = currentHeight - (heightDiff * progress * -1);
            } else {
                // When dragging up, increase height
                contentHeight.value = currentHeight + (heightDiff * progress);
            }

            // Add a small translation for tactile feedback
            translateY.value = event.translationY * 0.1;
        })
        .onEnd((event) => {
            // Reset drag progress
            dragProgress.value = 0;

            // Handle gesture end and determine where modal should settle
            const currentHeight =
                currentPosition === 'full' ? FULL_POSITION_HEIGHT :
                    currentPosition === 'center' ? CENTER_POSITION_HEIGHT :
                        BOTTOM_POSITION_HEIGHT;

            const velocity = event.velocityY;
            const endTranslation = translateY.value;

            let newPosition: 'bottom' | 'center' | 'full' = currentPosition;

            // Determine new position based on gesture velocity and distance
            if (Math.abs(velocity) > 500) {
                // Fast swipe
                if (velocity > 0) {
                    // Swiping down
                    if (currentPosition === 'full') {
                        newPosition = 'center';
                    } else if (currentPosition === 'center') {
                        newPosition = 'bottom';
                    }
                } else {
                    // Swiping up
                    if (currentPosition === 'bottom') {
                        newPosition = 'center';
                    } else if (currentPosition === 'center') {
                        newPosition = 'full';
                    }
                }
            } else {
                // Slow swipe - check translation threshold
                const translationPercent = endTranslation / currentHeight;

                if (translationPercent > 0.15) {
                    // Move down one position
                    if (currentPosition === 'full') {
                        newPosition = 'center';
                    } else if (currentPosition === 'center') {
                        newPosition = 'bottom';
                    }
                } else if (translationPercent < -0.15) {
                    // Move up one position
                    if (currentPosition === 'bottom') {
                        newPosition = 'center';
                    } else if (currentPosition === 'center') {
                        newPosition = 'full';
                    }
                }
            }

            // If fixedPosition is true, always return to initial position
            if (Props.fixedPosition) {
                newPosition = Props.position || 'bottom';
            }

            // Animate to new position
            runOnJS(updatePosition)(newPosition);

            translateY.value = withSpring(0, { damping: 20, stiffness: 120 });
            contentHeight.value = withSpring(
                newPosition === 'full' ? FULL_POSITION_HEIGHT :
                    newPosition === 'center' ? CENTER_POSITION_HEIGHT :
                        BOTTOM_POSITION_HEIGHT,
                { damping: 20, stiffness: 120 }
            );
        });

    // Animated styles
    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: contentHeight.value,
            transform: [{ translateY: translateY.value }]
        };
    });

    return (
        <View {...Props} style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 1000 }}>
            <GestureDetector gesture={gesture}>
                <Animated.View className="flex-1 relative">
                    <Animated.View
                        style={animatedStyle}
                        className={`bg-gray-100 relative w-full rounded-t-3xl overflow-hidden ${Props.className}`}>
                        {/* Modal drag handle */}
                        <View className='absolute top-2 left-0 right-0 flex justify-center items-center z-10'>
                            <View className='bg-gray-500 dark:bg-gray-300 rounded-lg w-[3.6rem] h-2'></View>
                        </View>

                        {/* Scrollable content container */}
                        <View className="w-full h-full pt-6 px-4">
                            {Props.children}
                        </View>
                    </Animated.View>
                </Animated.View>
            </GestureDetector>
        </View>
    );
}

interface Props {
    className?: string
    children: React.ReactNode
    position?: 'bottom' | 'center' | 'full'
    fixedPosition?: boolean // When true, modal will return to initial position when not interacted with
}

export default CustomMovableModal