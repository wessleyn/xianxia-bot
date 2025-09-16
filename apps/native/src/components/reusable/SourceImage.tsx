import { useCallback, useState } from "react";
import { Image, Text, View } from "react-native";

interface SourceImageProps {
    id?: string;
    icon: string;
    name: string;
    size?: number;
}

export default function SourceImage({ id, icon, name, size = 16 }: SourceImageProps) {
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    const handleImageLoad = useCallback(() => {
        setLoaded(true);
    }, []);

    const handleImageError = useCallback(() => {
        setError(true);
    }, []);

    // Calculate dynamic font size based on container size
    const fontSize = Math.max(Math.floor(size / 2.5), 12);

    const imageSize = { width: size, height: size };

    return (
        <View style={imageSize} className="rounded-lg items-center justify-center">
            {!error && (
                <Image
                    source={{ uri: icon }}
                    style={[imageSize, { position: "absolute" }]}
                    className="rounded-lg"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                />
            )}
            {(!loaded || error) && (
                <Text
                    className="font-bold text-gray-500"
                    style={{ fontSize }}
                >
                    {name.charAt(0).toUpperCase()}
                </Text>
            )}
        </View>
    );
}