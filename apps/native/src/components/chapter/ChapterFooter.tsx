import { Ionicons } from "@expo/vector-icons";
// import * as Battery from 'expo-battery';
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const ChapterFooter = ({ readingProgress = 0 }) => {
    const [currentTime, setCurrentTime] = useState("");
    const [batteryLevel, setBatteryLevel] = useState(0);

    useEffect(() => {
        updateTime();
        const timeInterval = setInterval(updateTime, 60000);

        // Initialize battery level
        // getBatteryLevel();

        // Subscribe to battery level changes
        // const batterySubscription = Battery.addBatteryLevelListener(({ batteryLevel }) => {
        //     setBatteryLevel(batteryLevel);
        // });

        return () => {
            clearInterval(timeInterval);
            // batterySubscription.remove();
        };
    }, []);

    // const getBatteryLevel = async () => {
    //     const level = await Battery.getBatteryLevelAsync();
    //     setBatteryLevel(level);
    // };

    const updateTime = () => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    return (
        <View
            className={`absolute bottom-0 left-0 py-2 px-5 w-full 
            bg-white bg-opacity-80 rounded-tl-lg
            flex-row items-center  justify-between shadow-md`}
        >
            <Text className="text-gray-700 mr-2 text-sm">{currentTime}</Text>
            <Text>
                {Math.floor(readingProgress).toFixed(1)}%
            </Text>
            <View className="flex-row items-center">
                <Ionicons
                    name={batteryLevel > 0.2 ? "battery-half" : "battery-dead"}
                    size={20}
                    color={batteryLevel > 0.2 ? "#16a34a" : "#ef4444"}
                />
                <Text
                    className={`ml-1 text-sm ${batteryLevel > 0.2 ? "text-green-600" : "text-red-500"
                        }`}
                >
                    {Math.round(batteryLevel * 100)}%
                </Text>
            </View>
        </View>
    )
}

export default ChapterFooter