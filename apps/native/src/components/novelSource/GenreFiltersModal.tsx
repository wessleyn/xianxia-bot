import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";
import CustomModal from "../custom/CustomModal";


interface GenreFiltersModalProps {
    visible: boolean;
    onClose: () => void;
    onSelectGenre: (genre: string) => void;
    selectedGenres: string[];
    genres: string[];
}

const GenreFiltersModal = ({ visible, onClose, onSelectGenre, selectedGenres, genres }: GenreFiltersModalProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredGenres, setFilteredGenres] = useState(genres);

    useEffect(() => {
        if (searchQuery) {
            const filtered = genres.filter(genre =>
                genre.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredGenres(filtered);
        } else {
            setFilteredGenres(genres);
        }
    }, [searchQuery, genres]);

    return (
        <CustomModal
            visible={visible}
            onRequestClose={onClose}
            position="center"
            bar={true}
            className="p-4"
        >
            <View className="pt-6">
                <Text className="text-xl font-bold mb-4 text-center">Select Genres</Text>

                {/* Search input */}
                <View className="flex-row items-center text-gray-800 bg-gray-200 rounded-lg px-3 py-2 mb-4">
                    <MaterialCommunityIcons name="magnify" size={20} color="#6b7280" />
                    <TextInput
                        className="flex-1 ml-2  placeholder:text-gray-600"
                        placeholder="Search genres..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => setSearchQuery("")}>
                            <MaterialCommunityIcons name="close-circle" size={20} color="#6b7280" />
                        </Pressable>
                    )}
                </View>

                {/* Genre list */}
                <FlatList
                    data={filteredGenres}
                    keyExtractor={(item) => item}
                    className="max-h-[70%]"
                    renderItem={({ item }) => (
                        <Pressable
                            onPress={() => onSelectGenre(item)}
                            className={`p-3 rounded-lg mb-2 flex-row justify-between items-center ${selectedGenres.includes(item) ? "bg-blue-100" : "bg-gray-200"
                                }`}
                        >
                            <Text className={`${selectedGenres.includes(item) ? "text-blue-700 font-medium" : "text-gray-800"}`}>
                                {item}
                            </Text>
                            {selectedGenres.includes(item) && (
                                <MaterialCommunityIcons name="check-circle" size={20} color="#3b82f6" />
                            )}
                        </Pressable>
                    )}
                />

            </View>
        </CustomModal>
    );
};

export default GenreFiltersModal;
