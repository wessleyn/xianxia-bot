import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

interface GenreFilterChipProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export const GenreFilterChip = ({ label, selected, onPress }: GenreFilterChipProps) => {
    return (
        <Pressable
            className={`mr-2 rounded-full px-4 py-2 ${selected ? 'bg-blue-500' : 'bg-gray-200'}`}
            onPress={onPress}
        >
            <Text className={`${selected ? 'text-white' : 'text-gray-800'} font-medium`}>{label}</Text>
        </Pressable>
    );
};

interface GenreFiltersCarouselProps {
    genres: string[];
    selectedGenres: string[];
    onOpenGenreModal: () => void;
    onSelectGenre: (genre: string) => void;
}

const GenreFiltersCarousel = ({
    genres,
    selectedGenres,
    onOpenGenreModal,
    onSelectGenre
}: GenreFiltersCarouselProps) => {
    return (
        <View className="w-full px-4 py-2">
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
            >
                {/* First button - opens advanced genre filter modal */}
                <Pressable
                    onPress={onOpenGenreModal}
                    className="mr-2 rounded-full px-4 py-2 bg-blue-100 flex-row items-center"
                >
                    <MaterialCommunityIcons name="filter-variant-plus" size={16} color="#3b82f6" />
                    <Text className="text-blue-500 font-medium ml-1">More</Text>
                </Pressable>

                {/* Display all genres that can be toggled directly from the carousel */}
                {genres.map((genre: string) => (
                    <GenreFilterChip
                        key={genre}
                        label={genre}
                        selected={selectedGenres.includes(genre)}
                        onPress={() => onSelectGenre(genre)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

export default GenreFiltersCarousel;
