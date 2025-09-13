import CustomView from "@//components/custom/CustomView";
import BackButton from "@//components/reusable/BackButton";
import SourceImage from "@components/reusable/SourceImage";
import { supportedLanguages } from "@constants/supportedLanguages";
import { Source } from "@constants/types";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Toast from 'react-native-toast-message';
import AnimatedSearchInput from "../../components/reusable/AnimatedSearchInput";

export default function Sources() {
    const [sourcesList, setSourcesList] = useState<Source[]>([])
    const [filteredSources, setFilteredSources] = useState<Source[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
    const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const db = useSQLiteContext();

    // Extract unique categories from sources and count occurrences
    const categoryFilters = useMemo(() => {
        // Start with "All" and static filters
        const staticFilters = ["Language", "Recently Updated"];

        // Count category occurrences
        const categoryCounts: Record<string, number> = {};

        sourcesList.forEach(source => {
            if (source.mainCategory) {
                const categories = source.mainCategory.split(',').map(c => c.trim());
                categories.forEach(category => {
                    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                });
            }
        });

        // Sort categories by occurrence count (descending)
        const sortedCategories = Object.entries(categoryCounts)
            .sort(([, countA], [, countB]) => countB - countA)
            .map(([category]) => category);

        // Combine static filters with dynamic categories
        return [...staticFilters, ...sortedCategories];
    }, [sourcesList]);

    useEffect(() => {
        const fetchSources = async () => {
            const sources = await db.getAllAsync<Source>('SELECT * FROM sources;')
            setSourcesList(sources);
            setFilteredSources(sources);
        }

        fetchSources()
    }, [])

    // Filter sources when category selection changes or search query changes
    useEffect(() => {
        let filtered = [...sourcesList];

        // Apply category filters first
        if (selectedCategory === "All") {
            // Keep all sources
        } else if (selectedCategory === "Language") {
            filtered = filtered.filter(source => source.language === selectedLanguage);
        } else if (selectedCategory === "Recently Updated") {
            // Sort by last_updated date
            filtered = [...filtered].sort((a, b) => {
                const dateA = new Date(a.last_updated || 0);
                const dateB = new Date(b.last_updated || 0);
                return dateB.getTime() - dateA.getTime(); // Descending order
            });
        } else {
            // Filter by category
            filtered = filtered.filter(source =>
                source.mainCategory &&
                source.mainCategory.split(',').map(c => c.trim()).includes(selectedCategory)
            );
        }

        // Then apply search filter if there's a query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(source =>
                source.name.toLowerCase().includes(query) ||
                (source.mainCategory && source.mainCategory.toLowerCase().includes(query)) ||
                (source.language && source.language.toLowerCase().includes(query))
            );
        } setFilteredSources(filtered);
    }, [selectedCategory, selectedLanguage, sourcesList, searchQuery])

    // Handle category selection
    const handleCategorySelect = useCallback((category: string) => {
        setSelectedCategory(category);
        if (category === "Language") {
            setShowLanguageModal(true);
        }
    }, []);

    // Handle language selection
    const handleLanguageSelect = useCallback((languageCode: string) => {
        setSelectedLanguage(languageCode);
        setShowLanguageModal(false);
    }, []);

    const toggleSource = async (sourceId: string, name: string, isEnabled: boolean) => {
        console.log(sourceId)
        try {
            await db.execAsync(`UPDATE sources SET enabled = ${Number(!isEnabled)} WHERE id = '${sourceId}';`)
            setSourcesList(sourcesList.map(source => source.id === sourceId ? { ...source, enabled: !isEnabled } : source))
            Toast.show({
                type: 'success',
                text1: isEnabled ? `${name} Disabled` : `${name} Enabled`,
                position: 'bottom',
                visibilityTime: 2000,
            })
        } catch (error) {
            console.error("Error updating source:", error)
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Could not update source status',
                position: 'bottom',
                visibilityTime: 3000,
            })
        }
    }

    return (
        <CustomView>
            {/* Language Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={showLanguageModal}
                onRequestClose={() => setShowLanguageModal(false)}
            >
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white rounded-lg w-4/5 p-6">
                        <Text className="text-xl font-bold mb-4 text-center">Select Language</Text>
                        <View className="border-t border-gray-200"></View>
                        {supportedLanguages.map((language) => (
                            <TouchableOpacity
                                key={language.code}
                                className={`py-4 px-2 border-b border-gray-200 ${selectedLanguage === language.code ? 'bg-indigo-50' : ''}`}
                                onPress={() => handleLanguageSelect(language.code)}
                            >
                                <Text className={`text-base ${selectedLanguage === language.code ? 'text-indigo-600 font-medium' : ''}`}>
                                    {language.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            className="mt-4 bg-gray-200 py-2 rounded-lg"
                            onPress={() => setShowLanguageModal(false)}
                        >
                            <Text className="text-center font-medium">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Page header */}
            <View className="flex-row items-center justify-between px-4 mt-2">
                <BackButton />

                {
                    !isSearching &&  <Text className="text-center text-2xl">Sources</Text>
                }
                <AnimatedSearchInput
                    headerName="Sources"
                    onSearch={setSearchQuery}
                    onToggle={(expanded) => setIsSearching(expanded)}
                    placeholder="Search by name, category..."
                />
            </View>

            {/* Filter ScrollView */}
            <View className="mt-4 mb-2">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 16 }}
                >
                    {categoryFilters.map((category, index) => (
                        <TouchableOpacity
                            key={category}
                            onPress={() => handleCategorySelect(category)}
                            className={`px-4 py-2 rounded-full ${selectedCategory === category ? 'bg-indigo-500' : 'bg-gray-100'} flex-row items-center mr-2`}
                        >
                            {category === "Language" && (
                                <>
                                    <FontAwesome name="language" size={18} color={selectedCategory === category ? "white" : "#4b5563"} style={{ marginRight: 4 }} />
                                    {selectedCategory === "Language" && (
                                        <Text className={`${selectedCategory === category ? 'text-white' : 'text-gray-700'} font-medium ml-1`}>
                                            ({supportedLanguages.find(lang => lang.code === selectedLanguage)?.code.toUpperCase()})
                                        </Text>
                                    )}
                                </>
                            )}
                            {category === "Recently Updated" && (
                                <MaterialIcons name="update" size={18} color={selectedCategory === category ? "white" : "#4b5563"} style={{ marginRight: 4 }} />
                            )}
                            <Text
                                className={`${selectedCategory === category ? 'text-white' : 'text-gray-700'} font-medium`}
                            >
                                {category}
                            </Text>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>

            <ScrollView className="flex flex-col">

                {
                    filteredSources.length === 0 && (
                        <View className="flex-1 justify-center items-center h-[80vh]">
                            <Text className="text-gray-500">No sources found.</Text>
                        </View>
                    )
                }
                {filteredSources.map(source => (
                    <View key={source.id} className="flex-row items-center w-full justify-between px-8" >
                        <View className="flex-row items-center">
                            <SourceImage
                                id={source.id}
                                icon={source.icon}
                                name={source.name}
                                size={50}
                            />
                            <View className="p-4 ">
                                <Text className="text-lg font-semibold">{source.name}</Text>
                                <Text className="text-sm text-gray-500">{source.mainCategory}, {source.language}</Text>
                            </View>
                        </View>

                        <View className="flex-row gap-4 items-center">
                            <View className="h-8 w-px bg-gray-300"></View>
                            <Pressable
                                onPress={() => toggleSource(source.id, source.name, source.enabled)}
                            >
                                <Text
                                    className="text-gray-500 text-3xl w-6 text-center"
                                >{source.enabled ? '-' : '+'}</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </CustomView>
    );
}
