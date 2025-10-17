import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import CustomSafeArea from './custom/CustomSafeArea';

export default function HeaderBar({ tabName }: { tabName: string }) {
    const [searchText, setSearchText] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const colorScheme = useColorScheme()

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const isDark = colorScheme === 'dark';
    
    return (
        <CustomSafeArea className="flex-row px-4 py-4  items-center  ">
            <View className="flex-1 flex-row items-center bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-3">
                <MaterialIcons
                    name="search"
                    size={20}
                    color={isDark ? "#9ca3af" : "#6b7280"}
                    className="mr-2"
                />
                <TextInput
                    className="flex-1 h-10 text-base  placeholder:text-gray-500  placeholder:dark:text-gray-400 p-0"
                    placeholder="Search novels"
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={toggleMenu} className="ml-3 p-1">
                    <MaterialIcons
                        name="more-vert"
                        size={24}
                        color={isDark ? "#9ca3af" : "#4b5563"}
                    />
                </TouchableOpacity>
            </View>
        </CustomSafeArea>
    );
}