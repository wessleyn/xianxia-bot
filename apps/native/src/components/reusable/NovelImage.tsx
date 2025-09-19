import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Image, View } from "react-native";

interface NovelImageProps {
    image: string;
    name?: string;
    size?: number;
    sizingMode?: 'cover' | 'contain';
    className?: string;
}

export default function NovelImage({ image, size = 128, className, sizingMode = 'cover' }: NovelImageProps) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const blinkAnim = useRef(new Animated.Value(0)).current;

    const handleImageLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
        setError(true);
    }, []);

    // Set up blink animation
    useEffect(() => {
        if (!loaded && !error) {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(blinkAnim, {
                        toValue: 1,
                        duration: 700,
                        useNativeDriver: false,
                    }),
                    Animated.timing(blinkAnim, {
                        toValue: 0.3,
                        duration: 700,
                        useNativeDriver: false,
                    }),
                ])
            ).start();
        } else {
            // Stop animation when image is loaded or on error
            blinkAnim.stopAnimation();
        }
    }, [loaded, error, blinkAnim]);

    const imageSize = { width: size, height: size };

    // Simple animated background
    const skeletonStyle = {
        backgroundColor: blinkAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['rgba(255, 0, 0, 0.2)', 'rgba(255, 0, 0, 0.5)']
        }),
    };

    return (
        <View style={[imageSize, { overflow: 'hidden' }]} className="relative rounded-[20%]">
            {/* Blinking Skeleton */}
            {(!loaded || error) && (
                <Animated.View
                    style={[imageSize, skeletonStyle]}
                    className="rounded-[20%]"
                />
            )}

            {!error && (
                <Image
                    source={{ uri: image }}
                    style={[imageSize, {
                        position: loaded ? 'relative' : 'absolute',
                        resizeMode: sizingMode,
                        borderRadius: 20,
                    }]}
                    className={`w-full ${className}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            )}
        </View>
    );
}
