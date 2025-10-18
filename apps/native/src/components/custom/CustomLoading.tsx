import React from "react"
import { ActivityIndicator, View, useColorScheme } from "react-native"
import { createTheme } from '../../constants/themes';

const CustomLoading = ({
    position,
    className,
}: {
    position: "center" | "top"
    className?: string
}) => {
    const colorScheme = useColorScheme()
    const { secondaryBgColor, activityColor } = createTheme(colorScheme === 'dark')

    return (
        <View
            className={`flex justify-center items-center ${position === "center" ? "h-full" : ""} ${
                className ?? ""
            }`}
            style={{ backgroundColor: secondaryBgColor }}
        >
            <ActivityIndicator size="large" color={activityColor} />
        </View>
    )
}

export default CustomLoading