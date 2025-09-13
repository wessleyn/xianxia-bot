import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React, { useRef, useState } from 'react';
import { Animated, Pressable, TextInput } from 'react-native';

interface AnimatedSearchInputProps {
    headerName: string;
    onSearch?: (text: string) => void;
    onToggle: (expanded: boolean) => void;
    placeholder?: string;
}

const AnimatedSearchInput = ({
    headerName,
    onSearch,
    onToggle,
    placeholder = 'Search...'
}: AnimatedSearchInputProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchText, setSearchText] = useState('');
    const animatedWidth = useRef(new Animated.Value(40)).current;
    const textInputOpacity = useRef(new Animated.Value(0)).current;

    const handleToggle = () => {
        if (isExpanded) {
            // Collapse animation
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
                onToggle(false);
                setSearchText('');
                if (onSearch) onSearch('');
            });
        } else {
            // Expand animation
            setIsExpanded(true);
            onToggle(true);
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

    return (
        <Animated.View
            className="flex-row items-center bg-gray-100 rounded-full overflow-hidden"
            style={{
                width: animatedWidth,
            }}
        >
            <Pressable onPress={handleToggle} className="p-2">
                <MaterialIcons name="search" size={24} color="#4b5563" />
            </Pressable>

            {isExpanded && (
                <Animated.View
                    style={{
                        opacity: textInputOpacity,
                        flex: 1,
                    }}
                >
                    <TextInput
                        className="flex-1 pr-4"
                        placeholder={placeholder || `Search ${headerName}...`}
                        placeholderTextColor="#9ca3af"
                        value={searchText}
                        onChangeText={handleChangeText}
                        autoFocus
                    />
                </Animated.View>
            )}
        </Animated.View>
    );
};

export default AnimatedSearchInput;
