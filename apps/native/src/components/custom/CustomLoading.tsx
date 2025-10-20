import React from "react";
import { ActivityIndicator, View, useColorScheme } from "react-native";
import { createTheme } from '../../constants/themes';

const CustomLoading = ({
    position,
    className,
    transparent = false,
}: {
    position: "center" | "top"
        className?: string,
    transparent?: boolean,
}) => {
    const colorScheme = useColorScheme()
    const { secondaryBgColor, activityColor } = createTheme(colorScheme === 'dark')

    return (
        <View
            className={`flex justify-center items-center ${position === "center" ? "h-full" : ""} ${
                className }`}
            style={{ backgroundColor: transparent ? 'transparent' : secondaryBgColor }}
        >
            <ActivityIndicator size="large" color={activityColor} />
        </View>
    )
}

export default CustomLoading