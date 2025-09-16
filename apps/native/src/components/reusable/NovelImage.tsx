import { useCallback, useEffect, useRef, useState } from "react";
import { Animated, Image, View } from "react-native";

interface NovelImageProps {
    image: string;
    name?: string;
    size?: number;
    className?: string;
}

export default function NovelImage({ image, size = 128, className }: NovelImageProps) {
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
            // Simple blinking animation
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
        <View style={[imageSize, { borderRadius: 0, overflow: 'hidden' }]} className="relative">
            {/* Blinking Skeleton */}
            {(!loaded || error) && (
                <Animated.View
                    style={[imageSize, skeletonStyle]}
                    className="rounded-lg"
                />
            )}

            {/* Actual Image */}
            {!error && (
                <Image
                    source={{ uri: image }}
                    style={[imageSize, {
                        position: loaded ? 'relative' : 'absolute',
                        resizeMode: 'contain',
                        borderRadius: 50,
                    }]}
                    className={`rounded-lg ${className}`}
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            )}
        </View>
    );
}
