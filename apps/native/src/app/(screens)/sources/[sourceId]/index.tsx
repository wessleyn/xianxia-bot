import CustomLoading from "@components/custom/CustomLoading";
import CustomView from "@components/custom/CustomView";
import FilterDropdown from "@components/novelSource/FilterDropdown";
import GenreFiltersCarousel from "@components/novelSource/GenreFiltersCarousel";
import GenreFiltersModal from "@components/novelSource/GenreFiltersModal";
import AnimatedSearchInput from "@components/reusable/AnimatedSearchInput";
import BackButton from "@components/reusable/BackButton";
import NovelImage from "@components/reusable/NovelImage";
import RandomNovel from "@components/reusable/RandomNovel";
import { FILTER_OPTIONS } from "@constants/constants";
import sources from "@constants/sources";
import { FilterOption, Novel, NovelPageResult, Source } from "@constants/types";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { getSupportedFilters } from "@utils/supportedFilter";
import { Link, useLocalSearchParams } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import React, { memo, useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import CustomSafeArea from "../../../../components/custom/CustomSafeArea";


const NovelItem = memo(({ novel, selectedFilter }: { novel: Novel, selectedFilter: FilterOption }) => (
    <Link href={
        {
            pathname: '/novel/[novelLink]',
            params: {
                novelLink: novel.link
            }
        }
    } asChild>
        <Pressable className="flex-row items-center gap-4 p-4 ">
            <NovelImage image={novel.image} size={120} sizingMode="cover"  />
            <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-400">{novel.title}</Text>
                <View className="flex-row gap-2">
                    {novel.genres.slice(0, 2).map((g: string, index: number) => (
                        <Text key={index} className="text-gray-500">
                            {g}
                        </Text>
                    ))}
                </View>
                {
                    selectedFilter.id === 'updated' && novel.time && (
                        <Text className="text-sm text-gray-600 mt-1 italic">
                            Updated {novel.time}
                        </Text>
                    )
                }{
                    selectedFilter.id === 'completed' && (
                        <Text className="text-sm text-gray-800 mt-1 italic">
                            {novel.chapters}  Chapters
                        </Text>
                    )
                }
            </View>
        </Pressable>
    </Link>
));

export default function SourceDetail() {
    const params = useLocalSearchParams<{ sourceId: string }>()
    const sourceId = params.sourceId

    const [sourceDetails, setSourceDetails] = useState<Source | null>(null)
    const [sourceFound, setSourceFound] = useState(false)
    const [sourceGenres, setSourceGenres] = useState<string[]>([])

    const [selectedSourceGenres, setSelectedSourceGenres] = useState<string[]>([])
    const [genreModalVisible, setGenreModalVisible] = useState(false)
    const [selectedFilter, setSelectedFilter] = useState<FilterOption>(FILTER_OPTIONS[0])

    const [loading, setLoading] = useState<boolean>(false)
    const [fetchedNovels, setFetchedNovels] = useState<Novel[]>([])
    const [fetchError, setFetchError] = useState<boolean>(false)

    const [filteredNovels, setFilteredNovels] = useState<Novel[]>([])
    const [supportedFilters, setSupportedFilters] = useState<FilterOption[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    const [currentPage, setCurrentPage] = useState<number>(1)
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
        // TODO: add source visit details in the sqlite db and use this to sort sources
        const fetchSource = async () => {
            if (sourceId) {
                const source = await db.getFirstAsync<Source>('SELECT * FROM sources WHERE id = ?;', [sourceId])
                setSourceDetails(source)
                setSourceGenres(JSON.parse(source?.genres ?? "[]"))
                setSourceFound(source !== null);

                // Check which filters are supported
                if (source) {
                    const src = sources[source.id!];
                    if (src) {
                        const sourceInstance = new src();
                        const supported = getSupportedFilters(sourceInstance);
                        setSupportedFilters(supported);

                        // Set default filter to the first supported one
                        if (supported.length > 0) {
                            setSelectedFilter(supported[0]);
                        }
                    }
                }
            }
        }
        fetchSource()
    }, [sourceId, db])

    const fetchNovels = async (pageNum: number = 1) => {
        if (!sourceDetails || loading) return;

        setLoading(true);
        try {
            const src = sources[sourceDetails.id!];
            if (src) {
                const sourceInstance = new src();
                let result: NovelPageResult = {} as NovelPageResult;

                try {
                    switch (selectedFilter.id) {
                        case 'updated':
                            result = await sourceInstance.getUpdatedNovels?.(pageNum) || await sourceInstance.getNovels(pageNum);
                            break;
                        case 'newest':
                            result = await sourceInstance.getNewestNovels?.(pageNum) || await sourceInstance.getNovels(pageNum);
                            break;
                        case 'completed':
                            result = await sourceInstance.getCompletedNovels?.(pageNum) || await sourceInstance.getNovels(pageNum);
                            break;
                        case 'rating':
                            result = await sourceInstance.getHighestRatedNovels?.(pageNum) || await sourceInstance.getNovels(pageNum);
                            break;
                        case '100chapters':
                            result = await sourceInstance.getNovelsWithChapters?.(100, pageNum) || await sourceInstance.getNovels(pageNum);
                            break;
                        case '1000chapters':
                            result = await sourceInstance.getNovelsWithChapters?.(1000, pageNum) || await sourceInstance.getNovels(pageNum);
                            break;
                        case 'oldest':
                            result = await sourceInstance.getOldestNovels?.(pageNum) || await sourceInstance.getNovels(pageNum);
                            break;
                        default:
                            result = await sourceInstance.getNovels(pageNum);
                    }
                } catch (error) {
                    console.error("Error in sourceInstance.getNovels():", error);
                    setFetchError(true);
                    return
                }
                const { novels, hasNextPage } = result;
                setHasMoreData(hasNextPage);

                if (pageNum === 1) {
                    // First page - replace existing data
                    setFetchedNovels(novels);
                } else {
                    // Subsequent pages - append data
                    setFetchedNovels(prevNovels => [...prevNovels, ...novels]);
                }
                setCurrentPage(hasNextPage ? pageNum + 1 : pageNum);

            }
        } catch (error) {
            console.error("Error fetching novels:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (sourceFound) {
            // fetch the new first page
            setLoading(true)
            setHasMoreData(false)
            setCurrentPage(1)
            setFilteredNovels([])
            setFetchedNovels([])
            fetchNovels(1);
        }
    }, [sourceDetails, selectedFilter]);

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

        if (searchQuery) {
            filteredResults = filteredResults.filter(
                (novel: Novel) => novel.title.includes(searchQuery)
            )
        }

        // TODO: sort by chap
        // if (selectedFilter.id === 'completed') {
        //     filteredResults = filteredResults.sort((a, b) => {
        //         // Get chapter counts as numbers
        //         const chaptersA = typeof a.chapters === 'string' ? parseInt(a.chapters, 10) : (a.chapters || 0);
        //         const chaptersB = typeof b.chapters === 'string' ? parseInt(b.chapters, 10) : (b.chapters || 0);

        //         // Sort in descending order (highest chapter count first)
        //         return chaptersB - chaptersA;
        //     });
        // }

        setFilteredNovels(filteredResults);
    }, [fetchedNovels, selectedSourceGenres, searchQuery]);

    // Memoize the renderItem function
    const renderItem = useCallback(({ item: novel }: { item: Novel }) => (
        <NovelItem novel={novel} selectedFilter={selectedFilter} />
    ), [selectedFilter]);

    return (
        <CustomSafeArea className="flex gap-6">

            <View className="w-full flex-row items-center justify-between px-4">
                <BackButton />
                <View className="flex-row items-center gap-4">
                    {/* 
                      TODO: Implement server side searching
                      - Add a search method to source classes
                      - Send the search query to the website's search endpoint
                      - Parse and return those specific results
                    */}
                    <AnimatedSearchInput
                        headerName=""
                        iconPosition="right"
                        placeholder="Search by novels title."
                        onSearch={(query) => setSearchQuery(query)}
                        onToggle={() => { }}
                    />
                    <RandomNovel
                        text={false}
                        className={sourceDetails?.id ?? ''}
                        containerClassName="flex justify-center items-center p-2"
                    />
                </View>
            </View>

            {
                (sourceDetails === null) ? (
                    <Text> Source Loading...</Text>
                ) : <View className="w-full flex-row items-center justify-between px-4">
                    <Text className="text-3xl font-medium dark:text-gray-400">{sourceDetails?.name}</Text>

                    <FilterDropdown
                        options={supportedFilters}
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
                            renderItem={renderItem}
                            onEndReached={() => {
                                // FIXME: VirtualizedList: You have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate
                                if (!loading && hasMoreData) {
                                    fetchNovels();
                                }
                            }}
                            onEndReachedThreshold={0.5}
                            initialNumToRender={10}
                            windowSize={5}
                            maxToRenderPerBatch={10}
                            updateCellsBatchingPeriod={50}
                            removeClippedSubviews={true}
                            ListFooterComponent={() => (
                                loading ? (
                                    <View className="py-4 flex items-center justify-center">

                                        {
                                            currentPage === 1 ?
                                                <CustomLoading position="center" /> :
                                                <Text className="text-gray-500">
                                                    Loading more novels...
                                                </Text>
                                        }

                                    </View>
                                ) : !hasMoreData ? (
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
        </CustomSafeArea>
    );
}
