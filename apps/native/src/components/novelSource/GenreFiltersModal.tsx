import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View, useColorScheme } from "react-native";
import { createTheme } from '../../constants/themes';
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
    const theme = createTheme(useColorScheme() === 'dark');

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
                <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center', color: theme.textColor }}>Select Genres</Text>

                {/* Search input */}
                <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: theme.pillBg, borderRadius: 8, paddingHorizontal: 12, paddingVertical: 8, marginBottom: 12 }}>
                    <MaterialCommunityIcons name="magnify" size={20} color={theme.mutedColor} />
                    <TextInput
                        style={{ flex: 1, marginLeft: 8, color: theme.textColor }}
                        placeholder="Search genres..."
                        placeholderTextColor={theme.mutedColor}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <Pressable onPress={() => setSearchQuery("")}>
                            <MaterialCommunityIcons name="close-circle" size={20} color={theme.mutedColor} />
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
                            style={{
                                padding: 12,
                                borderRadius: 8,
                                marginBottom: 8,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: selectedGenres.includes(item) ? theme.activityColor + '10' : theme.pillBg
                            }}
                        >
                            <Text style={{ color: selectedGenres.includes(item) ? theme.activityColor : theme.textColor, fontWeight: selectedGenres.includes(item) ? '600' : '400' }}>
                                {item}
                            </Text>
                            {selectedGenres.includes(item) && (
                                <MaterialCommunityIcons name="check-circle" size={20} color={theme.activityColor} />
                            )}
                        </Pressable>
                     )}
                 />
 
             </View>
         </CustomModal>
     );
 };
 
 export default GenreFiltersModal;
