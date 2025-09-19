import { FilterOption } from '@constants/types';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React, { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TouchableWithoutFeedback, View } from 'react-native';


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
                    color="#3b82f6"
                />
                <Text className="text-blue-500">{selectedOption.label}</Text>
                <MaterialCommunityIcons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="#3b82f6"
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
                        <View className="absolute right-4 top-36 bg-white rounded-lg shadow-md w-48 z-50">
                            <FlatList
                                data={options}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <Pressable
                                        className={`p-3 flex-row items-center justify-between ${selectedOption.id === item.id ? 'bg-blue-50' : ''
                                            }`}
                                        onPress={() => handleSelect(item)}
                                    >
                                        <View className="flex-row items-center gap-2">
                                            {item.icon && (
                                                <MaterialCommunityIcons
                                                    name={item.icon as any}
                                                    size={18}
                                                    color={selectedOption.id === item.id ? '#3b82f6' : '#4b5563'}
                                                />
                                            )}
                                            <Text
                                                className={`${selectedOption.id === item.id ? 'text-blue-500 font-medium' : 'text-gray-700'
                                                    }`}
                                            >
                                                {item.label}
                                            </Text>
                                        </View>
                                        {selectedOption.id === item.id && (
                                            <MaterialCommunityIcons
                                                name="check"
                                                size={18}
                                                color="#3b82f6"
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
