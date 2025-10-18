import { Ionicons } from "@expo/vector-icons";
import * as Battery from "expo-battery";
import { useEffect, useState } from "react";
import { Text, useColorScheme, View, ViewStyle } from "react-native";
import { createTheme } from '../../constants/themes';

const ChapterFooter = ({ readingProgress = 0 }: { readingProgress?: number }) => {
    const [currentTime, setCurrentTime] = useState("");
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [batteryState, setBatteryState] = useState<Battery.BatteryState | null>(null);

    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";
    const { primaryBgColor, textColor, mutedColor } = createTheme(isDark);

    useEffect(() => {
        updateTime();
        const timeInterval = setInterval(updateTime, 60000);

        // Initialize battery
        getBatteryLevel();
        getBatteryState();

        // Subscribe to battery level changes
        const levelSub = Battery.addBatteryLevelListener(({ batteryLevel }) => {
            setBatteryLevel(batteryLevel);
        });

        // Subscribe to charging state changes
        const stateSub = Battery.addBatteryStateListener(({ batteryState }) => {
            setBatteryState(batteryState);
        });

        return () => {
            clearInterval(timeInterval);
            levelSub.remove();
            stateSub.remove();
        };
    }, []);

    const getBatteryLevel = async () => {
        const level = await Battery.getBatteryLevelAsync();
        setBatteryLevel(level);
    };

    const getBatteryState = async () => {
        const state = await Battery.getBatteryStateAsync();
        setBatteryState(state);
    };

    const updateTime = () => {
        const now = new Date();
        setCurrentTime(
            now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        );
    };

    // Pick icon based on level + charging state
    const getBatteryIcon = () => {
        if (batteryState === Battery.BatteryState.CHARGING) return "battery-charging";
        if (batteryLevel > 0.5) return "battery-full";
        if (batteryLevel > 0.2) return "battery-half";
        return "battery-dead";
    };

    const containerStyle: ViewStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 8,
        paddingHorizontal: 20,
        width: '105%',
        borderTopLeftRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: primaryBgColor,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 6,
    };

    const timeTextStyle = { color: textColor, marginRight: 8, fontSize: 12, fontFamily: 'Verdana' };
    const progressTextStyle = { color: textColor, fontFamily: 'Verdana' };
    const isBatteryGood = batteryLevel > 0.2;
    const iconColor = isBatteryGood ? (isDark ? '#86efac' : '#16a34a') : (isDark ? '#fca5a5' : '#ef4444');
    const batteryTextStyle = { color: isBatteryGood ? (isDark ? '#86efac' : '#16a34a') : (isDark ? '#fca5a5' : '#ef4444'), marginLeft: 6, fontSize: 12, fontFamily: 'Verdana' };

    return (
        <View style={containerStyle}>
            {/* Current time */}
            <Text style={timeTextStyle}>
                {currentTime}
            </Text>

            {/* Reading progress */}
            <Text style={progressTextStyle}>
                {Number(readingProgress).toFixed(1)}%
            </Text>

            {/* Battery info */}
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name={getBatteryIcon()} size={20} color={iconColor} />
                <Text style={batteryTextStyle}>
                    {Math.round(batteryLevel * 100)}%
                </Text>
            </View>
        </View>
    );
};

export default ChapterFooter;
