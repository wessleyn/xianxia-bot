import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import CustomSafeArea from './CustomSafeArea';

interface HeaderBarProps {
    title?: string;
}

export default function HeaderBar({ title }: HeaderBarProps) {
    const [searchText, setSearchText] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => setMenuVisible(!menuVisible);

    return (
        <CustomSafeArea className="flex-row px-4 py-4  items-center shadow-none border-none ">
            <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-3 py-3">
                <MaterialIcons name="search" size={20} color="#6b7280" className="mr-2" />
                <TextInput
                    className="flex-1 h-10 text-base text-gray-800 p-0"
                    placeholder="Search novels"
                    value={searchText}
                    onChangeText={setSearchText}
                />
            <TouchableOpacity onPress={toggleMenu} className="ml-3 p-1">
                <MaterialIcons name="more-vert" size={24} color="#4b5563" />
            </TouchableOpacity>
            </View>
        </CustomSafeArea>
    );
}