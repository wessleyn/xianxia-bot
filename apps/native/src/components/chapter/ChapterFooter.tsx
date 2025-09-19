import { Ionicons } from "@expo/vector-icons";
import * as Battery from "expo-battery";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const ChapterFooter = ({ readingProgress = 0 }) => {
    const [currentTime, setCurrentTime] = useState("");
    const [batteryLevel, setBatteryLevel] = useState(0);
    const [batteryState, setBatteryState] = useState<Battery.BatteryState | null>(null);

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

    return (
        <View
            className={`absolute bottom-0 left-0 py-2 px-5 w-full 
            bg-white bg-opacity-80 rounded-tl-lg
            flex-row items-center justify-between shadow-md`}
        >
            {/* Current time */}
            <Text className="text-gray-700 mr-2 text-sm" style={{ fontFamily: 'Verdana' }}>{currentTime}</Text>

            {/* Reading progress */}
            <Text style={{ fontFamily: 'Verdana' }}>{Math.floor(readingProgress).toFixed(1)}%</Text>

            {/* Battery info */}
            <View className="flex-row items-center">
                <Ionicons
                    name={getBatteryIcon()}
                    size={20}
                    color={batteryLevel > 0.2 ? "#16a34a" : "#ef4444"}
                />
                <Text
                    className={`ml-1 text-sm ${batteryLevel > 0.2 ? "text-green-600" : "text-red-500"
                        }`}
                    style={{ fontFamily: 'Verdana' }}
                >
                    {Math.round(batteryLevel * 100)}%
                </Text>
            </View>
        </View>
    );
};

export default ChapterFooter;
