import CustomView from "@components/custom/CustomView";
import FilterDropdown from "@components/novelSource/FilterDropdown";
import GenreFiltersCarousel from "@components/novelSource/GenreFiltersCarousel";
import GenreFiltersModal from "@components/novelSource/GenreFiltersModal";
import AnimatedSearchInput from "@components/reusable/AnimatedSearchInput";
import BackButton from "@components/reusable/BackButton";
import { FILTER_OPTIONS } from "@constants/constants";
import sources from "@constants/sources";
import { FilterOption, Novel, Source } from "@constants/types";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";


export default function SourceDetail() {
    const { sourceId } = useLocalSearchParams<{ sourceId: string }>()
    const [sourceDetails, setSourceDetails] = useState<Source | null>(null)
    const [sourceFound, setSourceFound] = useState(false)
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [genreModalVisible, setGenreModalVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>(FILTER_OPTIONS[0])
    const [fetchedNovels, setFetchedNovels] = useState<Novel[]>([])
    const [genres, setGenres] = useState<string[]>([])
    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMoreData, setHasMoreData] = useState<boolean>(true)

    const db = useSQLiteContext()

    const handleSelectGenre = (genre: string) => {
        setSelectedGenres(prevGenres => {
            if (prevGenres.includes(genre)) {
                return prevGenres.filter(g => g !== genre);
            } else {
                return [...prevGenres, genre];
            }
        });
    };

    useEffect(() => {
        const fetchSources = async () => {
            const source = await db.getFirstAsync<Source>('SELECT * FROM sources WHERE id = ?;', [sourceId])
            setSourceDetails(source)
            setGenres(JSON.parse(source?.genres ?? "[]"))
            setSourceFound(source !== null);
        }
        fetchSources()
    }, [])

    const fetchNovels = async (pageNum: number = 1) => {
        // if (!sourceDetails || loading || !hasMoreData) return;
        console.log("in fetching novels..")

        setLoading(true);
        try {
            const src = sources[sourceDetails.id];
            if (src) {
                const sourceInstance = new src();
                // Note: If the getNovels method doesn't support pagination,
                // you'll need to modify the source class to implement it properly
                console.log("Fetching novels..")
                const novels = await sourceInstance.getNovels();

                if (novels.length === 0) {
                    setHasMoreData(false);
                } else {
                    if (pageNum === 1) {
                        setFetchedNovels(novels);
                    } else {
                        setFetchedNovels(prevNovels => [...prevNovels, ...novels]);
                    }
                    setPage(pageNum);
                }
            }
        } catch (error) {
            console.error("Error fetching novels:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log("details changed")
        if (sourceDetails) {
            console.log("fetching novels")
            fetchNovels(1);
        }
    }, [sourceDetails]);

    return (
        <CustomView className="flex gap-6">

            <View className="w-full flex-row items-center justify-between px-4">
                <BackButton />
                <View className="flex-row items-center gap-4">
                    <AnimatedSearchInput
                        headerName=""
                        placeholder="Search through novels."
                        onSearch={(query) => console.log(query)}
                        onToggle={() => { }}
                    />
                    <Pressable>
                        {/* Random novel from the current source */}
                        <MaterialCommunityIcons name="dice-multiple-outline" size={24} color="#4b5563" />
                    </Pressable>

                </View>

            </View>

            {
                (sourceDetails === null) ? (
                    <Text>Loading...</Text>
                ) : <View className="w-full flex-row items-center justify-between px-4">
                    <Text className="text-3xl font-medium">{sourceDetails?.name}</Text>

                    <FilterDropdown
                        options={FILTER_OPTIONS}
                        selectedOption={selectedFilter}
                        onSelectOption={(option: FilterOption) => {
                            setSelectedFilter(option);
                            // Here you would implement the actual filtering logic based on the selected option
                            console.log(`Filtering by: ${option.label}`);
                        }}
                    />

                </View>
            }

            <View >
                <GenreFiltersCarousel
                    genres={genres}
                    selectedGenres={selectedGenres}
                    onOpenGenreModal={() => setGenreModalVisible(true)}
                    onSelectGenre={handleSelectGenre}
                />
            </View>

            {
                !sourceFound ? <Text>Source Unavailable</Text> :
                        <FlatList<Novel>
                            data={fetchedNovels}
                            keyExtractor={(item: Novel) => item.id}
                            renderItem={({ item: novel }: { item: Novel }) => (
                                <View className="flex-row items-center gap-4 p-4 border-b border-gray-200">
                                    <Image source={{ uri: novel.image }} className="w-16 h-24 rounded-lg" />
                                    <View className="flex-1">
                                        <Text className="text-lg font-semibold">{novel.title}</Text>
                                        <View className="flex-row gap-2">
                                            {novel.genres.map((g: string, index: number) => (
                                                <Text key={index} className="text-gray-500">
                                                    {g}
                                                </Text>
                                            ))}
                                        </View>
                                    </View>
                                </View>
                            )}
                            onEndReached={() => {
                                if (!loading && hasMoreData) {
                                    fetchNovels(page + 1);
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            initialNumToRender={10}
                            ListFooterComponent={() => (
                                loading ? (
                                    <View className="py-4 flex items-center justify-center">
                                        <Text className="text-gray-500">Loading more novels...</Text>
                                    </View>
                                ) : !hasMoreData && fetchedNovels.length > 0 ? (
                                    <View className="py-4 flex items-center justify-center">
                                        <Text className="text-gray-500">No more novels to load</Text>
                                    </View>
                                ) : null
                            )}
                        
                            className="w-full"
                        />
            }

            <GenreFiltersModal
                genres={genres}
                visible={genreModalVisible}
                onClose={() => setGenreModalVisible(false)}
                onSelectGenre={handleSelectGenre}
                selectedGenres={selectedGenres}
            />
        </CustomView>
    );
}
