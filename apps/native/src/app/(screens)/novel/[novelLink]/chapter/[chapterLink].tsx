import CustomView from "@//components/custom/CustomView";
import CustomLoading from "@components/custom/CustomLoading";
import CustomModal from "@components/custom/CustomModal";
import NovelImage from "@components/reusable/NovelImage";
import { ChapterContent } from "@constants/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { useHistoryStore } from '@stores/history';
import { useNovelStore } from "@stores/novel";
import { findNovelSource } from "@utils/sources/findNovelSource";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Chapter() {
    const params = useLocalSearchParams<{ chapterLink: string; novelLink: string }>();
    const router = useRouter();
    const [chapterContent, setChapterContent] = useState<ChapterContent | null>(null);
    const [isInLib, setIsInLib] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);
    const { setLastReadChapterLink, currentNovel } = useNovelStore()

    const [batteryLevel, setBatteryLevel] = useState(0);
    const [novelImage, setNovelImage] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [showModal, setShowModal] = useState(false);
    const { readNovels, upsertNovel } = useHistoryStore();

    // Scroll position tracking
    const scrollViewRef = useRef<ScrollView>(null);
    const [contentHeight, setContentHeight] = useState(0);
    const [scrollViewHeight, setScrollViewHeight] = useState(0);
    const [isRestoring, setIsRestoring] = useState(true);

    useEffect(() => {
        const loadChapter = async () => {
            const source = findNovelSource(params.chapterLink!);
            if (!source) throw new Error("Source not found or unsupported.");

            const instance = new source();
            const chapterData = await instance.getNovelChapterContent(params.chapterLink!);
            const coverImage = currentNovel?.coverImage ?? instance.getNovelImage(params.novelLink!)

            setNovelImage(coverImage);
            setChapterContent(chapterData);

            const existing = readNovels.find(n => n.novelLink === params.novelLink);
            if (existing) {
                setReadingProgress(existing.progress);
            } else {
                upsertNovel({
                    novelLink: params.novelLink!,
                    lastReadChLink: params.chapterLink!,
                    lastReadChTitle: chapterData.title ?? "Unknown Title",
                    title: currentNovel?.title ?? "Unknown Title",
                    author: currentNovel?.author ?? "Unknown Author",
                    coverImage: coverImage,
                    progress: readingProgress,
                });
            }
        };

        loadChapter();
    }, [params.chapterLink]);


    // Initial load
    useEffect(() => {

        const fetchLibStatus = async () => {
            const library = await AsyncStorage.getItem("library");
            const parsedLibrary: string[] = library ? JSON.parse(library) : [];
            setIsInLib(parsedLibrary.includes(params.novelLink!));
        }

        fetchLibStatus();
        updateTime();
        const timeInterval = setInterval(updateTime, 60000);
        return () => clearInterval(timeInterval);
    }, []);

    useEffect(() => {
        if (chapterContent) {
            upsertNovel({
                novelLink: params.novelLink!,
                lastReadChLink: params.chapterLink!,
                lastReadChTitle: chapterContent.title,
                progress: readingProgress,
            });
        }
    }, [readingProgress, chapterContent]);

    useEffect(() => {
        const upsertLibrary = async () => {
            const library = await AsyncStorage.getItem("library");
            const parsedLibrary: string[] = library ? JSON.parse(library) : [];
            await AsyncStorage.setItem("library",
                JSON.stringify(
                    isInLib ? [...parsedLibrary, params.novelLink]
                        : parsedLibrary.filter(link => link !== params.novelLink)
                ));
        };
        upsertLibrary();
    }, [isInLib]);


    const updateTime = () => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };

    // Handle scroll events to update reading progress
    const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (!contentHeight || !scrollViewHeight || isRestoring) return;

        const scrollY = event.nativeEvent.contentOffset.y;
        const maxScrollPosition = contentHeight - scrollViewHeight;

        if (maxScrollPosition <= 0) return; // Avoid division by zero

        // Calculate progress as a value between 0 and 1
        const progress = Math.min(Math.max(scrollY / maxScrollPosition, 0), 1);

        // Convert to percentage (0-100) when storing in state
        setReadingProgress(progress * 100);
    }, [contentHeight, scrollViewHeight, isRestoring]);    // Handle slider change to scroll to position
    const handleSliderChange = useCallback((value: number) => {
        if (!scrollViewRef.current || !contentHeight || !scrollViewHeight) return;

        const maxScrollPosition = contentHeight - scrollViewHeight;
        const targetScrollPosition = value * maxScrollPosition;

        setIsRestoring(true);
        // prevent scroll updates
        setReadingProgress(value * 100);

        scrollViewRef.current.scrollTo({ y: targetScrollPosition, animated: false });

        // Small delay to re-enable scroll tracking
        setTimeout(() => {
            setIsRestoring(false);
        }, 200);
    }, [contentHeight, scrollViewHeight]);

    // Set initial scroll position when component mounts or when progress changes externally
    useEffect(() => {
        if (scrollViewRef.current && contentHeight && scrollViewHeight) {
            const maxScrollPosition = contentHeight - scrollViewHeight;
            // Convert percentage (0-100) back to fraction (0-1) for scroll position
            const targetScrollPosition = (readingProgress / 100) * maxScrollPosition;

            setIsRestoring(true);
            scrollViewRef.current.scrollTo({ y: targetScrollPosition, animated: false });

            // Release after the layout stabilizes
            setTimeout(() => setIsRestoring(false), 300);
        }
    }, [chapterContent, contentHeight, scrollViewHeight]);

    if (!chapterContent) return <CustomLoading position="center" />;

    return (
        <CustomView className="px-2">
            {/* Header */}
            <View className="flex-row items-center justify-between border-b border-gray-200">
                <Pressable
                    onPress={() => router.back()}
                    className="flex items-center justify-center bg-gray-300 rounded-full -mt-1 p-1"
                >
                    <Ionicons name="chevron-back-sharp" size={17} color="#4b5563" />
                </Pressable>

                <Text
                    className="font-bold text-lg mb-4 mt-2 w-2/3"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                >
                    {chapterContent.title}
                </Text>
                <TouchableOpacity
                    onPress={() => setIsInLib(!isInLib)}
                    className="-mt-1 "
                >
                    <MaterialIcons
                        name={isInLib ? "library-add-check" : "library-add"}
                        size={24}
                        color="#4b5563"
                    />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <View>
                <ScrollView
                    ref={scrollViewRef}
                    showsVerticalScrollIndicator={false}
                    className="text-gray-500 px-2 text-center flex gap-2"
                    onScroll={handleScroll}
                    scrollEventThrottle={16} // Update about every 16ms for smooth tracking
                    onLayout={(event) => {
                        setScrollViewHeight(event.nativeEvent.layout.height);
                    }}
                >
                    <View
                        onLayout={(event) => {
                            setContentHeight(event.nativeEvent.layout.height);
                        }}
                    >
                        <Pressable onPress={() => setShowModal(true)}>
                            <Text className="font-bold text-lg mb-4 mt-2">{chapterContent.title}</Text>
                            {chapterContent.content.map((item, index) => (
                                <Text key={index} className="mb-4">
                                    {item}
                                </Text>
                            ))}
                        </Pressable>
                    </View>

                    <TouchableOpacity className="mb-12 flex items-center justify-center">
                        {chapterContent.nextChapter ? (
                            <Link
                                href={{
                                    pathname: "/novel/[novelLink]/chapter/[chapterLink]",
                                    params: {
                                        novelLink: params.novelLink,
                                        chapterLink: chapterContent.nextChapter,
                                    },
                                }}
                                replace={true}
                                className="mt-6 mb-12"
                            >
                                <View className="bg-gray-900 py-3 px-6 rounded-lg">
                                    <Text className="text-white text-center font-bold">
                                        {chapterContent.nextChapterTitle}
                                    </Text>
                                </View>
                            </Link>
                        ) : (
                            <View className="mt-6 mb-10 py-3 px-6 bg-gray-200 rounded-lg">
                                <Text className="text-gray-700 text-center font-bold">
                                    {
                                        currentNovel?.status?.toLowerCase().includes('completed') ?
                                            "Finished" : "You've reached the latest chapter"
                                    }                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </ScrollView>
            </View>

            {/* Footer */}
            <View
                className={`absolute bottom-0 left-0 py-2 px-5 w-full 
            bg-white bg-opacity-80 rounded-tl-lg
            flex-row items-center  justify-between shadow-md`}
            >
                <Text className="text-gray-700 mr-2 text-sm">{currentTime}</Text>
                <Text>
                    {Math.floor(readingProgress).toFixed(1)}%
                </Text>
                <View className="flex-row items-center">
                    <Ionicons
                        name={batteryLevel > 0.2 ? "battery-half" : "battery-dead"}
                        size={20}
                        color={batteryLevel > 0.2 ? "#16a34a" : "#ef4444"}
                    />
                    <Text
                        className={`ml-1 text-sm ${batteryLevel > 0.2 ? "text-green-600" : "text-red-500"
                            }`}
                    >
                        {Math.round(batteryLevel * 100)}%
                    </Text>
                </View>
            </View>

            {/* Modal */}
            <CustomModal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
                position="bottom"
                bar
                blur
                animationType="slide"
                className="p-4 flex gap-2"
            >
                <View className="mt-4 flex">
                    <Text numberOfLines={1} ellipsizeMode="tail">
                        {Math.floor(readingProgress)}%, {chapterContent.title}
                    </Text>
                    <View className="flex-row items-center justify-between mt-4">
                        <Link
                            href={{
                                pathname: "/novel/[novelLink]/chapter/[chapterLink]",
                                params: {
                                    novelLink: params.novelLink,
                                    chapterLink: chapterContent.nextChapter!,
                                },
                            }}
                            disabled={!chapterContent.prevChapter}
                            replace={true}
                        >
                            <FontAwesome
                                name="chevron-left"
                                size={20}
                                color={`${chapterContent.prevChapter ? '#4b5563' : 'white'}`} />
                        </Link>
                        <Slider
                            style={{ width: 300, height: 10 }}
                            value={readingProgress / 100} // Convert percentage back to 0-1 range for slider
                            onValueChange={handleSliderChange}
                            minimumValue={0}
                            maximumValue={1}
                            minimumTrackTintColor="#581c87"
                            thumbTintColor="#581c87"
                            maximumTrackTintColor="#c084fc"
                        />
                        <Link
                            href={{
                                pathname: "/novel/[novelLink]/chapter/[chapterLink]",
                                params: {
                                    novelLink: params.novelLink,
                                    chapterLink: chapterContent.nextChapter!,
                                },
                            }}
                            replace={true}
                            disabled={!chapterContent.nextChapter}
                        >
                            <FontAwesome
                                name="chevron-right"
                                size={18}
                                color={`${chapterContent.nextChapter ? '#4b5563' : 'white'}`} />
                        </Link>
                    </View>
                </View>

                {/* Book info */}
                <View className="flex-row  gap-2">
                    <View className="flex-row gap-3 items-center bg-gray-300 rounded-xl p-4 w-1/2">
                        <Octicons name="three-bars" size={25} color="#4b5563" />
                        <View className="flex-col gap-2">
                            <Text>Contents</Text>
                            <Text className="text-gray-500 text-sm">{currentNovel?.chapters} Chapters</Text>
                        </View>
                    </View>
                    <Link
                        href={{
                            pathname: "/novel/[novelLink]",
                            params: { novelLink: params.novelLink }
                        }}
                        asChild>
                        <Pressable className="flex-row items-center bg-gray-300 rounded-xl p-4 flex-1">
                            <NovelImage
                                image={novelImage}
                                size={50}
                            />
                            <View className="flex-col ml-3 flex-1">
                                <Text >About this book</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={24} color="#4b5563" />
                        </Pressable>
                    </Link>
                </View>

                {/* Bottom buttons */}
                <View className="flex-row gap-2 w-full mt-2">
                    <TouchableOpacity className="bg-gray-300 p-6 flex-1 rounded-xl justify-center items-center">
                        <MaterialIcons name="multitrack-audio" size={32} color="#4b5563" />
                        <Text>Listen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-300 p-6 flex-1 rounded-xl justify-center items-center">
                        <MaterialCommunityIcons name="download-outline" size={32} color="#4b5563" />
                        <Text>Download</Text>
                    </TouchableOpacity>
                </View>
            </CustomModal>
        </CustomView>
    );
}
