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
    const params = useLocalSearchParams<{ sourceId: string }>()
    const sourceId = params.sourceId

    const [sourceDetails, setSourceDetails] = useState<Source | null>(null)
    const [sourceFound, setSourceFound] = useState(false)
    const [sourceGenres, setSourceGenres] = useState<string[]>([])

    const [selectedSourceGenres, setSelectedSourceGenres] = useState<string[]>([])
    const [genreModalVisible, setGenreModalVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>(FILTER_OPTIONS[0])

    const [fetchedNovels, setFetchedNovels] = useState<Novel[]>([])
    const [filteredNovels, setFilteredNovels] = useState<Novel[]>([])
    const [fetchError, setFetchError] = useState<boolean>(false)

    const [page, setPage] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(false)
    const [hasMoreData, setHasMoreData] = useState<boolean>(true)

    const db = useSQLiteContext()

    const handleSelectGenre = (genre: string) => {
        setSelectedSourceGenres(prevGenres => {
            if (prevGenres.includes(genre)) {
                // remove the genre if it was already present
                return prevGenres.filter(g => g !== genre);
            } else {
                // otherwise append it
                return [...prevGenres, genre];
            }
        });
    };

    useEffect(() => {
        const fetchSource = async () => {
            if (sourceId) {
                const source = await db.getFirstAsync<Source>('SELECT * FROM sources WHERE id = ?;', [sourceId])
                setSourceDetails(source)
                setSourceGenres(JSON.parse(source?.genres ?? "[]"))
                setSourceFound(source !== null);
            }
        }
        fetchSource()
    }, [sourceId, db])

    const fetchNovels = async (pageNum: number = 1) => {
        if (!sourceDetails || loading || !hasMoreData) return;
        console.log("in fetching novels..")

        setLoading(true);
        try {
            const src = sources[sourceDetails.id!];
            if (src) {
                const sourceInstance = new src();
                // Note: If the getNovels method doesn't support pagination,
                // you'll need to modify the source class to implement it properly

                try {
                    const novels = await sourceInstance.getNovels();

                    if (novels.length === 0) {
                        setHasMoreData(false);
                    } else {
                        if (pageNum === 1) {
                            setFetchedNovels(novels);
                            // Initialize filtered novels with the same data
                            setFilteredNovels(novels);
                        } else {
                            setFetchedNovels(prevNovels => {
                                const updatedNovels = [...prevNovels, ...novels];
                                return updatedNovels;
                            });
                        }
                        setPage(pageNum);
                    }
                } catch (error) {
                    console.error("Error in sourceInstance.getNovels():", error);
                    setFetchError(true);
                }
            }
        } catch (error) {
            console.error("Error fetching novels:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (sourceDetails) {
            fetchNovels(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sourceDetails]);

    useEffect(() => {
        let filteredResults = [...fetchedNovels];

        // Apply genre filter if any genres are selected
        if (selectedSourceGenres.length > 0) {
            filteredResults = filteredResults.filter((novel: Novel) =>
                selectedSourceGenres.every(selectedGenre =>
                    novel.genres.includes(selectedGenre)
                )
            );
        }

        // TODO:  apply dropdown filters based on selectedFilter

        setFilteredNovels(filteredResults);
    }, [fetchedNovels, selectedSourceGenres, selectedFilter]);

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
                        // TODO: Check which filtering options are supported per source and display and trigger those methods accordingly
                        options={FILTER_OPTIONS}
                        selectedOption={selectedFilter}
                        onSelectOption={(option: FilterOption) => {
                            setSelectedFilter(option);
                            console.log(`Filtering by: ${option.label}`);
                        }}
                    />

                </View>
            }

            <View >
                <GenreFiltersCarousel
                    genres={sourceGenres}
                    selectedGenres={selectedSourceGenres}
                    onOpenGenreModal={() => setGenreModalVisible(true)}
                    onSelectGenre={handleSelectGenre}
                />
            </View>

            {
                !sourceFound ? <Text>Source Unavailable</Text> :
                    fetchError ?
                        <View className="w-full h-3/4 items-center justify-center py-4 gap-2">
                            <MaterialCommunityIcons name="power-plug-off-outline" size={24} color="#fca5a5" />
                            <Text className="text-black mb-2">Network Error</Text>
                            <Pressable
                                className="bg-gray-400 px-4 py-2 rounded"
                                onPress={() => {
                                    setFetchError(false);
                                    fetchNovels(1);
                                }}
                            >
                                <Text className="text-white font-semibold">Try Again</Text>
                            </Pressable>
                        </View>
                        :
                        <FlatList<Novel>
                            data={filteredNovels}
                            keyExtractor={(item: Novel, index) => `${index}-${item.id}`}
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
                                ) : !hasMoreData && filteredNovels.length > 0 ? (
                                    <View className="py-4 flex items-center justify-center">
                                        <Text className="text-gray-500">No more novels to load</Text>
                                    </View>
                                ) : null
                            )}

                            className="w-full"
                        />
            }

            <GenreFiltersModal
                genres={sourceGenres}
                visible={genreModalVisible}
                onClose={() => setGenreModalVisible(false)}
                onSelectGenre={handleSelectGenre}
                selectedGenres={selectedSourceGenres}
            />
        </CustomView>
    );
}
