import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    TextInput,
    TouchableOpacity,
    useColorScheme,
    View
} from 'react-native';
import { createTheme } from '../constants/themes';
import { cn } from '../utils/cn';
import CustomSafeArea from './custom/CustomSafeArea';

export default function HeaderBar({ tabName }: { tabName: string }) {
    const [searchText, setSearchText] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);
    const colorScheme = useColorScheme()

    const toggleMenu = () => setMenuVisible(!menuVisible);

    const isDark = colorScheme == 'dark';
    const { primaryBgColor, secondaryBgColor, mutedColor, textColor } = createTheme(isDark);

    return (
        <CustomSafeArea
            style={{
                backgroundColor: secondaryBgColor
            }}
            className="flex-row py-2 px-4 items-center"
        >
            <View
                style={{
                    backgroundColor: primaryBgColor,
                }}
                className={cn(
                    'flex-1 flex-row items-center',
                    'px-6 py-3 rounded-xl',
                )}>
                <MaterialIcons
                    name="search"
                    size={20}
                    color={mutedColor}
                    className="mr-2"
                />
                <TextInput
                    className="flex-1 h-10 text-base p-0"
                    placeholder="Search novels"
                    placeholderTextColor={mutedColor}
                    style={{ color: textColor }}
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={toggleMenu} className="ml-3 p-1">
                    <MaterialIcons
                        name="more-vert"
                        size={24}
                        color={mutedColor}
                    />
                </TouchableOpacity>
            </View>
        </CustomSafeArea >
    );
}