import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import React from 'react';
import { Pressable, ScrollView, Text, View, useColorScheme } from 'react-native';
import { createTheme } from '../../constants/themes';

interface GenreFilterChipProps {
    label: string;
    selected: boolean;
    onPress: () => void;
}

export const GenreFilterChip = ({ label, selected, onPress }: GenreFilterChipProps) => {
    const scheme = useColorScheme();
    const { activityColor, textColor, mutedColor, pillBg } = createTheme(scheme === 'dark');

    const backgroundColor = selected ? activityColor : pillBg;
    const color = selected ? '#fff' : textColor;

    return (
        <Pressable
            style={{ marginRight: 8, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 16, backgroundColor }}
            onPress={onPress}
        >
            <Text style={{ color, fontWeight: '600' }}>{label}</Text>
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
    const colorScheme = useColorScheme();
    const { activityColor, textColor, mutedColor, pillBg } = createTheme(colorScheme === 'dark');
    const iconColor = activityColor;
    const moreBgColor = activityColor + '10';
    const moreTextColor = activityColor;

    return (
        <View className={`w-full px-4 py-2 ${colorScheme === 'dark' ? 'bg-transparent' : ''}`}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                className="flex-row"
            >
                {/* First button - opens advanced genre filter modal */}
                <Pressable
                    onPress={onOpenGenreModal}
                    style={{ marginRight: 8, borderRadius: 999, paddingVertical: 8, paddingHorizontal: 12, backgroundColor: moreBgColor, flexDirection: 'row', alignItems: 'center' }}
                >
                    <MaterialCommunityIcons name="filter-variant-plus" size={16} color={iconColor} />
                    <Text style={{ color: moreTextColor, fontWeight: '600', marginLeft: 6 }}>More</Text>
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
