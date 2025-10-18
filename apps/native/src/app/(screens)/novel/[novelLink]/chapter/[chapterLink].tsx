import CustomView from "@//components/custom/CustomView";
import ChapterContentView from "@components/chapter/ChapterContent";
import ChapterFooter from "@components/chapter/ChapterFooter";
import ChapterModal from "@components/chapter/ChapterModal";
import CustomLoading from "@components/custom/CustomLoading";
import { ChapterContent, SourceDefinition } from "@constants/types";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useHistoryStore } from '@stores/history';
import { useNovelStore } from "@stores/novel";
import { findNovelSource } from "@utils/sources/findNovelSource";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, Text, TouchableOpacity, View, useColorScheme } from "react-native";

export default function Chapter() {
    const params = useLocalSearchParams<{ chapterLink: string; novelLink: string }>();
    const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === "dark";

    const [sourceInstance, setSourceInstance] = useState<SourceDefinition | null>(null);
    const [chapterContent, setChapterContent] = useState<ChapterContent | null>(null);
    const [isFetchingChapter, setIsFetchingChapter] = useState(false);
    const [novelImage, setNovelImage] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [readingProgress, setReadingProgress] = useState(0);
    const { readNovels, upsertNovel } = useHistoryStore();
    const { setLastReadChapterLink, currentNovel } = useNovelStore()

    const [isInLib, setIsInLib] = useState(readNovels.find(n => n.novelLink === params.novelLink)?.isInLibrary || false);

    const sliderHandlerRef = useRef<(value: number) => void>(() => { });

    useEffect(() => {
        const loadChapter = async () => {
            console.log(`Loading chapter: ${params.chapterLink}, novel: ${params.novelLink}`);
            try {
                const source = findNovelSource(params.chapterLink!);
                if (!source) {
                    console.error("Source not found or unsupported for:", params.chapterLink);
                    throw new Error("Source not found or unsupported.");
                }
                console.log("Source found:", source.name);

                const instance = new source();
                console.log("Fetching chapter content...");
                const chapterData = await instance.getNovelChapterContent(params.chapterLink!);
                console.log("Chapter content fetched:", chapterData.title);
                
                const coverImage = currentNovel?.coverImage ?? instance.getNovelImage(params.novelLink!);
                console.log("Cover image:", coverImage);

                setSourceInstance(instance);
                setNovelImage(coverImage);
                setChapterContent(chapterData);

                const existing = readNovels.find(n => n.novelLink === params.novelLink);
                console.log("Existing novel in history:", existing ? "Yes" : "No");
                
                if (existing) {
                    if (existing.lastReadChLink === params.chapterLink) {
                        console.log("Resuming reading at progress:", existing.progress);
                        setReadingProgress(existing.progress);
                    } else {
                        console.log("Updating history with new chapter");
                        upsertNovel({
                            novelLink: params.novelLink!,
                            lastReadChLink: params.chapterLink!,
                            lastReadChTitle: chapterData.title,
                            lastReadAt: new Date().toISOString(),
                            progress: readingProgress,
                        });
                    }
                } else {
                    console.log("Adding new novel to reading history");
                    upsertNovel({
                        novelLink: params.novelLink!,
                        lastReadChLink: params.chapterLink!,
                        lastReadChTitle: chapterData.title,
                        title: currentNovel?.title ?? "Unknown Title",
                        author: currentNovel?.author ?? "Unknown Author",
                        coverImage: coverImage,
                        lastReadAt: new Date().toISOString(),
                        progress: readingProgress,
                    });
                }
            } catch (error) {
                console.error("Error loading chapter:", error);
            }
        };

        loadChapter();
    }, []);

    useEffect(() => {
        if (chapterContent) {
            upsertNovel({
                novelLink: params.novelLink!,
                lastReadChLink: chapterContent.link,
                lastReadChTitle: chapterContent.title,
                lastReadAt: new Date().toISOString(),
                progress: readingProgress,
            });
        }
    }, [readingProgress, chapterContent]);

    useEffect(() => {
        if (params.novelLink) {
            upsertNovel({
                novelLink: params.novelLink!,
                isInLibrary: isInLib
            });
        }
    }, [isInLib, params.novelLink]);


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

    const handleAnonNav = async (link: string) => {
        setIsFetchingChapter(true)
        setReadingProgress(0);
        setShowModal(false)
        setLastReadChapterLink(link)
        const chapterData = await sourceInstance!.getNovelChapterContent(link);
        setChapterContent(chapterData)
        setIsFetchingChapter(false)
    }

    const bgClass = isDark ? "bg-gray-900" : "bg-white";
    const headerBorderClass = isDark ? "border-gray-700" : "border-gray-200";
    const headerBtnBg = isDark ? "bg-gray-700" : "bg-gray-300";
    const titleTextClass = isDark ? "text-white" : "text-gray-800";
    const iconColor = isDark ? "#e5e7eb" : "#4b5563";

    if (!chapterContent) return <CustomLoading position="center" className={bgClass} />;

    return (
        <CustomView className={`px-2 ${bgClass}`}>
            {/* Header */}
            <View className={`flex-row items-center justify-between border-b ${headerBorderClass}`}>
                <Pressable
                    onPress={() => router.back()}
                    className={`flex items-center justify-center ${headerBtnBg} rounded-full -mt-1 p-1`}
                >
                    <Ionicons name="chevron-back-sharp" size={17} color={iconColor} />
                </Pressable>

                <Text
                    className={`font-bold text-lg mb-4 mt-2 w-2/3 ${titleTextClass}`}
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
                        color={iconColor}
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
                                <View className={`${isDark ? 'bg-gray-800' : 'bg-gray-200'} mt-6 mb-10 py-3 px-6 rounded-lg`}>
                                    <Text className={`${isDark ? 'text-gray-200' : 'text-gray-700'} text-center font-bold`}>
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
                handleAnonNav={handleAnonNav}
                novelImage={novelImage}
            />
        </CustomView>
    );
}
