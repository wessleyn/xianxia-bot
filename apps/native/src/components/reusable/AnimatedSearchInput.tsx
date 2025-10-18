import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, TextInput, useColorScheme } from 'react-native';
import { createTheme } from '../../constants/themes';

interface AnimatedSearchInputProps {
    headerName: string;
    onSearch: (text: string) => void;
    onToggle?: (expanded: boolean) => void;
    placeholder?: string;
    iconPosition?: 'left' | 'right';
}

const AnimatedSearchInput = ({
    headerName,
    onSearch,
    onToggle,
    placeholder = 'Search...',
    iconPosition = 'left'
}: AnimatedSearchInputProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchText, setSearchText] = useState('');
    const animatedWidth = useRef(new Animated.Value(40)).current;
    const textInputOpacity = useRef(new Animated.Value(0)).current;
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';

    const theme = createTheme(isDark);
    const backgroundColor = theme.primaryBgColor;
    const iconColor = theme.mutedColor;
    const inputTextColor = theme.textColor;
    const placeholderColor = theme.mutedColor;

    const handleToggle = () => {
        if (isExpanded) {
            if (searchText) {
                setSearchText('');
                return;
            }
            Animated.parallel([
                Animated.timing(animatedWidth, {
                    toValue: 40,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(textInputOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: false,
                })
            ]).start(() => {
                setIsExpanded(false);
                onToggle && onToggle(false);
                setSearchText('');
                if (onSearch) onSearch('');
            });
        } else {
            setIsExpanded(true);
            onToggle && onToggle(true);
            Animated.parallel([
                Animated.timing(animatedWidth, {
                    toValue: 250,
                    duration: 300,
                    useNativeDriver: false,
                }),
                Animated.timing(textInputOpacity, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: false,
                })
            ]).start();
        }
    };

    const handleChangeText = (text: string) => {
        setSearchText(text);
        if (onSearch) onSearch(text);
    };

    const iconButton = (
        <Pressable onPress={handleToggle} className="p-2">
            <MaterialIcons name={isExpanded ? "clear" : "search"} size={24} color={iconColor} />
        </Pressable>
    );

    const inputField = isExpanded && (
        <Animated.View
            style={{
                opacity: textInputOpacity,
                flex: 1,
            }}
        >
            <TextInput
                className={`flex-1 ${iconPosition === 'left' ? 'pr-4' : 'pl-4'}`}
                placeholder={placeholder || `Search ${headerName}...`}
                placeholderTextColor={placeholderColor}
                value={searchText}
                onChangeText={handleChangeText}
                autoFocus
                style={{ color: inputTextColor }}
            />
        </Animated.View>
    );

    return (
        <Animated.View
            className="flex-row items-center rounded-full overflow-hidden"
            style={{
                width: animatedWidth,
                justifyContent: iconPosition === 'right' && !isExpanded ? 'flex-end' : 'flex-start',
                backgroundColor,
            }}
        >
            {iconPosition === 'left' ? (
                <>
                    {iconButton}
                    {inputField}
                </>
            ) : (
                <>
                    {inputField}
                    {iconButton}
                </>
            )}
        </Animated.View>
    );
};

export default AnimatedSearchInput;
