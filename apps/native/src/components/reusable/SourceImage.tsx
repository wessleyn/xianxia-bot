import { useCallback, useState } from "react";
import { Image, Text, View, useColorScheme } from "react-native";
import { createTheme } from '../../constants/themes';

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
                    className="font-bold"
                    style={{ fontSize, color: createTheme(useColorScheme() === 'dark').mutedColor }}
                >
                    {name.charAt(0).toUpperCase()}
                </Text>
            )}
        </View>
    );
}