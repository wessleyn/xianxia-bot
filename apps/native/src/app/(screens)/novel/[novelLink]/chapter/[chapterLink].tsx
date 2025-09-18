import CustomView from "@//components/custom/CustomView";
import CustomLoading from "@components/custom/CustomLoading";
import CustomModal from "@components/custom/CustomModal";
import NovelImage from "@components/reusable/NovelImage";
import { ChapterContent, SourceDefinition } from "@constants/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Slider from "@react-native-community/slider";
import { findNovelSource } from "@utils/sources/findNovelSource";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { ReadNovel } from "../../../../(tabs)/history";

export default function Chapter() {
    const params = useLocalSearchParams<{ chapterLink: string; novelLink: string }>();
    const router = useRouter();

    const [chapterContent, setChapterContent] = useState<ChapterContent | null>(null);
    const [isInLib, setIsInLib] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);

    const [batteryLevel, setBatteryLevel] = useState(0);
    const [currentTime, setCurrentTime] = useState("");
    const [showModal, setShowModal] = useState(false);

    // Initial load
    useEffect(() => {
        const fetchData = async () => {
            const source = findNovelSource(params.chapterLink!);
            if (!source) throw new Error("Source not found or unsupported.");

            const instance = new source();
            const chapterData = await instance.getNovelChapterContent(params.chapterLink!);
            setChapterContent(chapterData);
            await fetchReadingHistory(chapterData, instance);
        };

        fetchData();
        updateTime();
        const timeInterval = setInterval(updateTime, 60000);
        return () => clearInterval(timeInterval);
    }, []);

    // Reading history loader
    const fetchReadingHistory = async (chapterData: ChapterContent, instance: SourceDefinition) => {
        const history = await AsyncStorage.getItem("readingHistory");
        const parsedHistory: ReadNovel[] = history ? JSON.parse(history) : [];

        const chapterHistory = parsedHistory.find(
            (item) =>
                item.novelLink === params.novelLink &&
                item.lastReadChLink === params.chapterLink
        );

        if (chapterHistory) {
            setReadingProgress(chapterHistory.progress);
        } else {
            const newEntry: ReadNovel = {
                novelLink: params.novelLink!,
                lastReadChLink: params.chapterLink!,
                lastReadChTitle:  chapterData?.title ?? "Unknown Title",
                progress: 0,
                id: params.novelLink!, // assuming novelLink is unique
                title:  "Unknown Title",
                author: "Unknown Author",
                coverImage: instance.getNovelImage(params.novelLink!) ?? undefined,
                lastReadAt: new Date().toISOString(),
            };

            await AsyncStorage.setItem(
                "readingHistory",
                JSON.stringify([...parsedHistory, newEntry])
            );
        }
    };

    // Update reading progress whenever state changes
    useEffect(() => {
        const updateReadingProgress = async () => {
            const history = await AsyncStorage.getItem("readingHistory");
            const parsedHistory: ReadNovel[] = history ? JSON.parse(history) : [];

            const updatedHistory = parsedHistory.map((item) =>
                item.novelLink === params.novelLink!
                    ? {
                        ...item,
                        lastReadChLink: params.chapterLink!,
                        lastReadAt: new Date().toISOString(),
                        progress: readingProgress,
                    }
                    : item
            );

            await AsyncStorage.setItem("readingHistory", JSON.stringify(updatedHistory));
        };

        if (readingProgress !== undefined) {
            updateReadingProgress();
        }
    }, [readingProgress]);

    const updateTime = () => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };

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
                <TouchableOpacity className="-mt-1 ">
                    <MaterialIcons
                        name={isInLib ? "library-add-check" : "library-add"}
                        size={24}
                        color="#4b5563"
                    />
                </TouchableOpacity>
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                className="text-gray-500 px-2 text-center flex gap-2 pb-16"
            >
                <TouchableOpacity activeOpacity={0.9} onPress={() => setShowModal(true)}>
                    <Text className="font-bold text-lg mb-4 mt-2">{chapterContent.title}</Text>
                    {chapterContent.content.map((item, index) => (
                        <Text key={index} className="mb-4">
                            {item}
                        </Text>
                    ))}
                </TouchableOpacity>
            </ScrollView>

            {/* Footer */}
            <View
                className={`absolute bottom-0 left-0 p-3 px-5 w-full 
            bg-white bg-opacity-80 rounded-tl-lg
            flex-row items-center  justify-between shadow-md`}
            >
                <Text className="text-gray-700 mr-2 text-sm">{currentTime}</Text>
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
                        {readingProgress}%, {chapterContent.title}
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
                        >
                            <FontAwesome name="chevron-left" size={20} color="#4b5563" />
                        </Link>
                        <Slider
                            style={{ width: 300, height: 10 }}
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
                        >
                            <FontAwesome name="chevron-right" size={18} color="#4b5563" />
                        </Link>
                    </View>
                </View>

                {/* Book info */}
                <View className="flex-row  gap-1">
                    <View className="flex-row gap-3 items-center bg-gray-300 rounded-xl p-4">
                        <Octicons name="three-bars" size={25} color="#4b5563" />
                        <View className="flex-col gap-2">
                            <Text>Contents</Text>
                            <Text className="text-gray-500 text-sm">1080 Chapters</Text>
                        </View>
                    </View>
                    <Link href={{
                        pathname: "/novel/[novelLink]",
                        params: { novelLink: params.novelLink }
                    }}>
                        <Pressable className="flex-row  p-2 gap-3 items-center bg-gray-300 rounded-xl w-[54%]">
                            <NovelImage
                                image="https://novelbin.me/media/novel/war-sovereign-soaring-the-heavens-novel.jpg"
                                size={40}
                            />
                            <View className="flex-col gap-2  w-[45%]">
                                <Text>About this book</Text>
                            </View>
                            <FontAwesome name="chevron-right" size={24} color="#4b5563" />
                        </Pressable>
                    </Link>
                </View>

                {/* Bottom buttons */}
                <View className="flex-row gap-2 w-full justify-between ">
                    <TouchableOpacity className="bg-gray-300 p-6 rounded-xl">
                        <MaterialIcons name="multitrack-audio" size={32} color="#4b5563" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-300 p-6 rounded-xl">
                        <FontAwesome name="comment-o" size={32} color="#4b5563" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-300 p-6 rounded-xl">
                        <MaterialIcons name="bookmark-add" size={32} color="#4b5563" />
                    </TouchableOpacity>
                    <TouchableOpacity className="bg-gray-300 p-6 rounded-xl">
                        <MaterialCommunityIcons name="download-outline" size={32} color="#4b5563" />
                    </TouchableOpacity>
                </View>
            </CustomModal>
        </CustomView>
    );
}
