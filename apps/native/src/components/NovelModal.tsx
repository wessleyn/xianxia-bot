import { novelDetailTabs, novelDetailTabType } from '@constants/tabs';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { formatDistance } from 'date-fns';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from "react-native";
import { findNovelSource } from '../utils/sources/findNovelSource';
import CustomLoading from './custom/CustomLoading';
import CustomMovableModal from "./custom/CustomMovableModal";

// Data type definitions
interface Chapter {
    id: string;
    number: number;
    title: string;
    link: string
    isRead: boolean;
    lastReadAt?: string;
}

interface Volume {
    id: string;
    number: number;
    title: string;
    startingChapter: number;
    chapterCount: number;
    isComplete: boolean;
}

interface Bookmark {
    id: string;
    chapterId: string;
    chapterTitle: string;
    createdAt: string;
    notes?: string;
    position: number; // percentage or position in chapter
}

const NovelModal = ({ novelLink }: { novelLink: string }) => {
    const [navigationTab, setNavigationTab] = useState<novelDetailTabType>('chapters');
    const [chapters, setChapters] = useState<Chapter[]>();

    const [volumes, setVolumes] = useState<Volume[]>([
    ]);

    const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    ]);

    useEffect(() => {
        const checkLastOpenedTab = async () => {
            const lastOpenedTab = await AsyncStorage.getItem('lastOpenedTab') as novelDetailTabType;
            if (lastOpenedTab && ['chapters', 'volumes', 'bookmarks'].includes(lastOpenedTab)) {
                setNavigationTab(lastOpenedTab);
            }
        }

        checkLastOpenedTab();
    }, []);

    // Persist Navigation Tab in AsyncStorage whenever it changes
    useEffect(() => {
        AsyncStorage.setItem('lastOpenedTab', navigationTab);
    }, [navigationTab]);

    useEffect(() => {
        const fetchChapters = async () => {
            const source = findNovelSource(novelLink);
            const instance = new source();
            const fetchedChapters = await instance.getNovelChapters(novelLink);
            const formatedChapters = fetchedChapters.map((ch, index) => ({
                ...ch,
                // Clean up the title text to properly handle line breaks and extra spaces
                title: ch.title.replace(/\s+/g, ' ').trim(),
                isRead: false,
                id: `${index}-${ch.title}`,
                number: index + 1
            }));

            setChapters(formatedChapters)
        }

        fetchChapters();
    }, []);

    const handleTabPress = (tabKey: novelDetailTabType) => {
        setNavigationTab(tabKey);
    };

    return (
        <CustomMovableModal
            position="bottom"
        >
            {/* Bottom Navigation section - always visible */}
            <View className="flex-row justify-between items-center mt-6 mb-4">
                <View className="flex-row gap-3 p-2">
                    {novelDetailTabs.map(tab => {
                        const isActive = navigationTab === tab.key;
                        return (
                            <Pressable
                                key={tab.key}
                                onPress={() => handleTabPress(tab.key)}
                                className={`p-2 rounded-lg ${isActive ? 'bg-gray-200' : ''}`}
                            >
                                {tab.renderIcon(isActive)}
                            </Pressable>
                        );
                    })}
                </View>

                <View className="flex-row gap-1">
                    <Text className="bg-gray-300 py-3 text-center px-10 rounded-3xl rounded-r-none">Read</Text>
                    <View className="py-3 px-5 rounded-3xl bg-gray-300 rounded-l-none flex justify-center">
                        <Octicons
                            name="chevron-down"
                            size={18}
                            color="#4b5563"
                        />
                    </View>
                </View>
            </View>

            {/* Content revealed when modal expands - based on selected tab */}
            <View className="mt-4 pb-20">

                {/* Tab content based on selected tab */}
                {navigationTab === 'chapters' && (
                    <View>
                        {
                            chapters === undefined ?
                                <CustomLoading
                                    className='bg-transparent'
                                    position='center' />
                                : chapters.length === 0 ? (
                                    <View className="py-8 flex items-center justify-center">
                                        <MaterialCommunityIcons name="format-list-bulleted-square" size={48} color="#9ca3af" />
                                        <Text className="text-gray-500 mt-4">No chapters available</Text>
                                        <Text className="text-gray-400 text-sm text-center mt-1">
                                            Check back later for new chapters
                                        </Text>
                                    </View>
                                ) : (
                                    <ScrollView
                                        showsVerticalScrollIndicator={false}
                                        contentContainerStyle={{ paddingBottom: 20 }}
                                    >
                                        {
                                            chapters.map((item, index) => {
                                                const isActiveChapter = !item.isRead && index > 0 && chapters[index - 1]?.isRead;
                                                return (
                                                    <Link asChild href={{
                                                        pathname: '/chapter/[chapterLink]',
                                                        params: { chapterLink: item.link }
                                                    }}
                                                        key={item.id}
                                                    >
                                                        <Pressable className="flex-col items-start py-3">
                                                            <View className="flex-row justify-between items-center w-full">
                                                                <View className="flex-row items-center">
                                                                    {isActiveChapter && (
                                                                        <MaterialIcons name="play-arrow" size={24} color="#16a34a" style={{ marginRight: 4 }} />
                                                                    )}
                                                                    <Text className={`${item.isRead ? 'text-gray-500' : 'text-gray-800'}`}>
                                                                        {item.title}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <Text className={`${isActiveChapter ? 'text-gray-800' : 'text-gray-500'}`}>
                                                                # {item.number}
                                                            </Text>
                                                        </Pressable>
                                                    </Link>
                                                );
                                            })}
                                    </ScrollView>
                                )}
                    </View>
                )}

                {navigationTab === 'volumes' && (
                    <View>
                        {volumes.length === 0 ? (
                            <View className="py-8 flex items-center justify-center">
                                <MaterialCommunityIcons name="view-grid-outline" size={48} color="#9ca3af" />
                                <Text className="text-gray-500 mt-4">No volumes available</Text>
                                <Text className="text-gray-400 text-sm text-center mt-1">
                                    This novel doesn't have volume divisions yet
                                </Text>
                            </View>
                        ) : (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 20 }}
                            >
                                {volumes.map((item, index) => (
                                    <Pressable key={item.id}>
                                        <View className="flex-row justify-between items-center py-3">
                                            <View className="flex-row items-center">
                                                {!item.isComplete && index > 0 && volumes[index - 1].isComplete && (
                                                    <MaterialIcons name="play-arrow" size={24} color="#16a34a" style={{ marginRight: 4 }} />
                                                )}
                                                <Text className={`${item.isComplete ? 'text-gray-500' : 'text-gray-800'}`}>
                                                    Volume {item.number}: {item.title}
                                                </Text>
                                            </View>
                                            <Text className={`text-sm mr-2 ${item.isComplete ? 'text-gray-500' : 'text-gray-800'}`}>
                                                Ch {item.startingChapter} - {item.startingChapter + item.chapterCount - 1}
                                            </Text>
                                        </View>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                )}

                {navigationTab === 'bookmarks' && (
                    <View>
                        {bookmarks.length === 0 ? (
                            <View className="py-8 flex items-center justify-center">
                                <FontAwesome name="bookmark-o" size={48} color="#9ca3af" />
                                <Text className="text-gray-500 mt-4">No bookmarks yet</Text>
                                <Text className="text-gray-400 text-sm text-center mt-1">
                                    Bookmarks will appear here as you add them while reading
                                </Text>
                            </View>
                        ) : (
                            <ScrollView
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={{ paddingBottom: 20 }}
                            >
                                {bookmarks.map((item) => (
                                    <Pressable key={item.id}>
                                        <View className="flex-row justify-between items-center py-3 ">
                                            <View>
                                                <Text className="font-medium">{item.chapterTitle}</Text>
                                                {item.notes && (
                                                    <Text className="text-gray-500 text-sm mt-1" numberOfLines={1} ellipsizeMode="tail">
                                                        {item.notes}
                                                    </Text>
                                                )}
                                                <Text className="text-gray-400 text-xs mt-1">
                                                    Added {formatDistance(new Date(item.createdAt), new Date(), { addSuffix: true })}
                                                </Text>
                                            </View>
                                        </View>
                                    </Pressable>
                                ))}
                            </ScrollView>
                        )}
                    </View>
                )}
            </View>
        </CustomMovableModal>)
}


export default NovelModal