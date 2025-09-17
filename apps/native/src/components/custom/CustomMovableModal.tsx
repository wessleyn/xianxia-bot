import { useCallback, useEffect, useState } from "react";
import { Dimensions, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const POSITIONS = {
    bottom: SCREEN_HEIGHT * 0.15, // 15% height
    center: SCREEN_HEIGHT * 0.5,  // 50% height
    full: SCREEN_HEIGHT,          // 100% height
};

interface Props {
    className?: string;
    children: React.ReactNode;
    position?: keyof typeof POSITIONS; // default: bottom
    fixedPosition?: boolean;           // if true, modal snaps back to initial position
}

const CustomMovableModal = ({
    className,
    children,
    position = "bottom",
    fixedPosition = false,
}: Props) => {
    const [currentPosition, setCurrentPosition] = useState<
        keyof typeof POSITIONS
    >(position);

    const translateY = useSharedValue(0);
    const contentHeight = useSharedValue(POSITIONS[position]);

    useEffect(() => {
        if (position !== currentPosition) {
            setCurrentPosition(position);
            contentHeight.value = withSpring(POSITIONS[position], {
                damping: 20,
                stiffness: 120,
            });
            translateY.value = withSpring(0);
        }
    }, [position]);

    const updatePosition = useCallback(
        (newPosition: keyof typeof POSITIONS) => {
            if (newPosition !== currentPosition) {
                setCurrentPosition(newPosition);
            }
        },
        [currentPosition]
    );

    // Gesture only for drag handle
    const gesture = Gesture.Pan()
        .onUpdate((event) => {
            const isDraggingDown = event.translationY > 0;
            if (
                (currentPosition === "bottom" && isDraggingDown) ||
                (currentPosition === "full" && !isDraggingDown)
            ) {
                translateY.value = event.translationY * 0.2;
                return;
            }
            translateY.value = event.translationY * 0.1;
        })
        .onEnd((event) => {
            const velocity = event.velocityY;
            let newPosition: keyof typeof POSITIONS = currentPosition;

            if (Math.abs(velocity) > 500) {
                if (velocity > 0) {
                    if (currentPosition === "full") newPosition = "center";
                    else if (currentPosition === "center") newPosition = "bottom";
                } else {
                    if (currentPosition === "bottom") newPosition = "center";
                    else if (currentPosition === "center") newPosition = "full";
                }
            } else {
                if (event.translationY > SCREEN_HEIGHT * 0.15) {
                    if (currentPosition === "full") newPosition = "center";
                    else if (currentPosition === "center") newPosition = "bottom";
                } else if (event.translationY < -SCREEN_HEIGHT * 0.15) {
                    if (currentPosition === "bottom") newPosition = "center";
                    else if (currentPosition === "center") newPosition = "full";
                }
            }

            if (fixedPosition) {
                newPosition = position;
            }

            runOnJS(updatePosition)(newPosition);

            translateY.value = withSpring(0, { damping: 20, stiffness: 120 });
            contentHeight.value = withSpring(POSITIONS[newPosition], {
                damping: 20,
                stiffness: 120,
            });
        });

    const animatedStyle = useAnimatedStyle(() => ({
        height: contentHeight.value,
        transform: [{ translateY: translateY.value }],
    }));

    return (
        <View
            style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 1000 }}
        >
            <Animated.View className="flex-1 relative">
                <Animated.View
                    style={animatedStyle}
                    className={`bg-gray-100 relative w-full rounded-t-3xl overflow-hidden ${className}`}
                >
                    {/* Drag handle (only draggable part) */}
                    <GestureDetector gesture={gesture}>
                        <View className="absolute top-2 left-0 right-0 flex justify-center items-center z-10">
                            <View className="bg-gray-400 dark:bg-gray-300 rounded-lg w-14 h-2" />
                        </View>
                    </GestureDetector>

                    {/* Content (not draggable, can scroll freely) */}
                    <View className="w-full h-full pt-6 px-4">{children}</View>
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default CustomMovableModal;
