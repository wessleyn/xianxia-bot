import { FilterOption } from '@constants/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TouchableWithoutFeedback, View, useColorScheme } from 'react-native';
import { createTheme } from '../../constants/themes';


interface FilterDropdownProps {
    options: FilterOption[];
    selectedOption: FilterOption;
    onSelectOption: (option: FilterOption) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
    options,
    selectedOption,
    onSelectOption,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (option: FilterOption) => {
        onSelectOption(option);
        setIsOpen(false);
    };

    const scheme = useColorScheme();
    const { mutedColor, activityColor, textColor, pillBg } = createTheme(scheme === 'dark');

    return (
        <View>
            {/* Dropdown trigger */}
            <Pressable
                className="flex-row items-center gap-2"
                onPress={toggleDropdown}
            >
                <MaterialCommunityIcons
                    name="filter-menu-outline"
                    size={24}
                    color={activityColor}
                />
                <Text style={{ color: activityColor }}>{selectedOption.label}</Text>
                <MaterialCommunityIcons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color={activityColor}
                />
            </Pressable>

            {/* Dropdown menu */}
            <Modal
                visible={isOpen}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setIsOpen(false)}
            >
                <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
                    <View className="flex-1">
                        <View className="absolute right-4 top-36 rounded-lg shadow-md w-48 z-50" >
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <Pressable
                                        style={{
                                            padding: 12,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                                            {item.icon && (
                                                <MaterialCommunityIcons
                                                    name={item.icon as any}
                                                    size={18}
                                                    color={selectedOption.id === item.id ? activityColor : mutedColor}
                                                />
                                            )}
                                            <Text style={{
                                                color: selectedOption.id === item.id ? activityColor : textColor,
                                                fontWeight: selectedOption.id === item.id ? '600' : '400'
                                            }}>
                                                {item.label}
                                            </Text>
                                        </View>
                                        {selectedOption.id === item.id && (
                                            <MaterialCommunityIcons
                                                name="check"
                                                size={18}
                                                color={activityColor}
                                            />
                                        )}
                                    </Pressable>
                                )}
                            />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

export default FilterDropdown;
