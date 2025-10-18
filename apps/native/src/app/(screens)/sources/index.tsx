import CustomView from "@//components/custom/CustomView";
import BackButton from "@//components/reusable/BackButton";
import AnimatedSearchInput from "@components/reusable/AnimatedSearchInput";
import SourceImage from "@components/reusable/SourceImage";
import { supportedLanguages } from "@constants/supportedLanguages";
import { createTheme } from "@constants/themes";
import { Source } from "@constants/types";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Modal, Pressable, ScrollView, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import Toast from 'react-native-toast-message';

export default function Sources() {
    const [sourcesList, setSourcesList] = useState<Source[]>([])
    const [filteredSources, setFilteredSources] = useState<Source[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("All")
    const [selectedLanguage, setSelectedLanguage] = useState<string>("en")
    const [showLanguageModal, setShowLanguageModal] = useState<boolean>(false)
    const [searchQuery, setSearchQuery] = useState<string>("")
    const [isSearching, setIsSearching] = useState<boolean>(false)
    const db = useSQLiteContext();

    // add theme resolution
    const colorScheme = useColorScheme();
    const theme = createTheme(colorScheme === 'dark');

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
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={{ backgroundColor: theme.primaryBgColor, borderRadius: 12, width: '80%', padding: 24 }}>
                        <Text style={{ color: theme.textColor, fontSize: 18, fontWeight: '700', marginBottom: 12, textAlign: 'center' }}>Select Language</Text>
                        <View style={{ borderTopWidth: 1, borderTopColor: theme.borderColor, marginBottom: 8 }}></View>
                        {supportedLanguages.map((language) => (
                            <TouchableOpacity
                                key={language.code}
                                onPress={() => handleLanguageSelect(language.code)}
                                style={{
                                    paddingVertical: 12,
                                    paddingHorizontal: 8,
                                    borderBottomWidth: 1,
                                    borderBottomColor: theme.borderColor,
                                    backgroundColor: selectedLanguage === language.code ? theme.pillSelectedBg : 'transparent'
                                }}
                            >
                                <Text style={{ color: selectedLanguage === language.code ? theme.textColor : theme.textColor, fontSize: 16, fontWeight: selectedLanguage === language.code ? '600' : '400' }}>
                                    {language.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity
                            style={{ marginTop: 12, backgroundColor: theme.borderColor, paddingVertical: 10, borderRadius: 8, alignItems: 'center' }}
                            onPress={() => setShowLanguageModal(false)}
                        >
                            <Text style={{ color: theme.textColor, fontWeight: '600' }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Page header */}
            <View className="flex-row items-center justify-between px-4 mt-2">
                <BackButton />

                {
                    !isSearching &&  <Text style={{ color: theme.textColor, fontSize: 20, textAlign: 'center' }}>Sources</Text>
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
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 999,
                                backgroundColor: selectedCategory === category ? theme.pillSelectedBg : theme.pillBg,
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 8
                            }}
                        >
                            {category === "Language" && (
                                <>
                                    <FontAwesome name="language" size={18} color={selectedCategory === category ? theme.textColor : theme.mutedColor} style={{ marginRight: 6 }} />
                                    {selectedCategory === "Language" && (
                                        <Text style={{ color: theme.textColor, fontWeight: '600', marginLeft: 4 }}>
                                            ({supportedLanguages.find(lang => lang.code === selectedLanguage)?.code.toUpperCase()})
                                        </Text>
                                    )}
                                </>
                            )}
                            {category === "Recently Updated" && (
                                <MaterialIcons name="update" size={18} color={selectedCategory === category ? theme.textColor : theme.mutedColor} style={{ marginRight: 6 }} />
                            )}
                            <Text style={{ color: selectedCategory === category ? theme.textColor : theme.textColor, fontWeight: '600' }}>
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
                            <Text style={{ color: theme.mutedColor }}>No sources found.</Text>
                        </View>
                    )
                }
                {filteredSources.map(source => (
                    <View key={source.id} className="flex-row items-center w-full justify-between px-8" >
                        <Link href={`/sources/${source.id}`} asChild>
                            <View className="flex-row items-center">
                                <SourceImage
                                    id={source.id}
                                    icon={source.icon}
                                    name={source.name}
                                    size={50}
                                />
                                <View style={{ padding: 16 }}>
                                    <Text style={{ color: theme.textColor, fontSize: 16, fontWeight: '600' }}>{source.name}</Text>
                                    <Text style={{ color: theme.mutedColor, fontSize: 12 }}>{source.mainCategory}, {source.language}</Text>
                                </View>
                            </View>
                        </Link>

                        <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
                            <View style={{ height: 32, width: 1, backgroundColor: theme.borderColor }}></View>
                            <Pressable
                                onPress={() => toggleSource(source.id, source.name, source.enabled)}
                            >
                                <Text style={{ color: theme.mutedColor, fontSize: 24, width: 24, textAlign: 'center' }}>{source.enabled ? '-' : '+'}</Text>
                            </Pressable>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </CustomView>
    );
}
