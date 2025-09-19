import CustomView from "@//components/custom/CustomView";
import ChapterContentView from "@components/chapter/ChapterContent";
import ChapterFooter from "@components/chapter/ChapterFooter";
import ChapterModal from "@components/chapter/ChapterModal";
import CustomLoading from "@components/custom/CustomLoading";
import { ChapterContent, SourceDefinition } from "@constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHistoryStore } from '@stores/history';
import { useNovelStore } from "@stores/novel";
import { findNovelSource } from "@utils/sources/findNovelSource";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";

export default function Chapter() {
    const params = useLocalSearchParams<{ chapterLink: string; novelLink: string }>();
    const router = useRouter();

    const [sourceInstance, setSourceInstance] = useState<SourceDefinition | null>(null);
    const [chapterContent, setChapterContent] = useState<ChapterContent | null>(null);
    const [isFetchingChapter, setIsFetchingChapter] = useState(false);
    const [isInLib, setIsInLib] = useState(false);

    const [novelImage, setNovelImage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [readingProgress, setReadingProgress] = useState(0);
    const { readNovels, upsertNovel } = useHistoryStore();
    const { setLastReadChapterLink, currentNovel } = useNovelStore()

    const sliderHandlerRef = useRef<(value: number) => void>(() => { });

    useEffect(() => {

        const fetchLibStatus = async () => {
            const library = await AsyncStorage.getItem("library");
            const parsedLibrary: string[] = library ? JSON.parse(library) : [];
            setIsInLib(parsedLibrary.includes(params.novelLink!));
        }

        const loadChapter = async () => {
            const source = findNovelSource(params.chapterLink!);
            if (!source) throw new Error("Source not found or unsupported.");

            const instance = new source();
            const chapterData = await instance.getNovelChapterContent(params.chapterLink!);
            const coverImage = currentNovel?.coverImage ?? instance.getNovelImage(params.novelLink!)

            setSourceInstance(instance)
            setNovelImage(coverImage);
            setChapterContent(chapterData);

            const existing = readNovels.find(n => n.novelLink === params.novelLink);
            if (existing) {
                if (existing.lastReadChLink === params.chapterLink) {
                    setReadingProgress(existing.progress);
                } else {
                    upsertNovel({
                        novelLink: params.novelLink!,
                        lastReadChLink: params.chapterLink!,
                        lastReadChTitle: chapterData.title,
                        progress: readingProgress,
                    });
                }
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
        fetchLibStatus();
    }, []);

    useEffect(() => {
        if (chapterContent) {
            upsertNovel({
                novelLink: params.novelLink!,
                lastReadChLink: chapterContent.link,
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


    const handleSliderChange = useCallback((value: number) => {
        if (sliderHandlerRef.current) {
            sliderHandlerRef.current(value);
        }
        setReadingProgress(value * 100);
    }, []);

    const handleNextChapter = async () => {
        setIsFetchingChapter(true)
        setReadingProgress(0);
        setShowModal(false)
        setLastReadChapterLink(chapterContent?.nextChapter!)
        const chapterData = await sourceInstance!.getNovelChapterContent(chapterContent?.nextChapter!);
        setChapterContent(chapterData)
        setIsFetchingChapter(false)

    }
    const handlePrevChapter = async () => {
        setIsFetchingChapter(true)
        setReadingProgress(0);
        setShowModal(false)
        setLastReadChapterLink(chapterContent?.prevChapter!)
        const chapterData = await sourceInstance!.getNovelChapterContent(chapterContent?.prevChapter!);
        setChapterContent(chapterData)
        setIsFetchingChapter(false)
    }

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
                    className="-mt-1 mr-2 "
                >
                    <MaterialIcons
                        name={isInLib ? "library-add-check" : "library-add"}
                        size={24}
                        color="#4b5563"
                    />
                </TouchableOpacity>
            </View>

            {
                isFetchingChapter ?
                    <CustomLoading position="center" /> :
                    <ChapterContentView
                        chapterContent={chapterContent}
                        readingProgress={readingProgress}
                        setReadingProgress={setReadingProgress}
                        onPressContent={() => setShowModal(true)}
                        sliderHandlerRef={sliderHandlerRef}
                    >
                        <TouchableOpacity className="mb-[32%] flex items-center justify-center">
                            {chapterContent.nextChapter ? (
                                <Pressable
                                    onPress={handleNextChapter}
                                    className="bg-gray-900 py-3 px-6 rounded-lg">
                                    <Text className="text-white text-center font-bold">
                                        {chapterContent.nextChapterTitle}
                                    </Text>
                                </Pressable>
                            ) : (
                                <View className="mt-6 mb-10 py-3 px-6 bg-gray-200 rounded-lg">
                                    <Text className="text-gray-700 text-center font-bold">
                                        {
                                            currentNovel?.status?.toLowerCase().includes('completed') ?
                                                "Finished" : "You've reached the latest chapter"
                                        }
                                    </Text>
                                </View>
                            )}
                        </TouchableOpacity>
                    </ChapterContentView>

            }

            <ChapterFooter readingProgress={readingProgress} />

            <ChapterModal
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
                readingProgress={readingProgress}
                chapterContent={chapterContent}
                params={params}
                handleSliderChange={handleSliderChange}
                handleNextChapter={handleNextChapter}
                handlePrevChapter={handlePrevChapter}
                novelImage={novelImage}
            />
        </CustomView>
    );
}
