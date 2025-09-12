import { useState } from "react";
import { Switch, Text, View } from "react-native";

const SettingsSection = () => {
    const [isAutoSync, setIsAutoSync] = useState(false);
    const toggleSync = () => setIsAutoSync(prev => !prev);

    return (
        <View className="w-full px-5 mt-6">
            <Text className='text-xl font-bold text-gray-500 mb-4'>Settings</Text>

            <View className='w-full flex-row justify-between items-center py-3'>
                <Text className="text-lg">
                    Auto Sync
                </Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isAutoSync ? '#4287f5' : '#f4f3f4'}
                    value={isAutoSync}
                    onValueChange={toggleSync}
                />
            </View>
        </View>
    )
}

export default SettingsSection