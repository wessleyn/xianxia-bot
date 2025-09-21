import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons"
import Slider from "@react-native-community/slider"
import { useHistoryStore } from "@stores/history"
import { Link } from "expo-router"
import { useState } from "react"
import { Pressable, Text, TouchableOpacity, View } from "react-native"
import { useNovelStore } from "../../stores/novel"
import CustomModal from "../custom/CustomModal"
import NovelModal from "../NovelModal"
import NovelImage from "../reusable/NovelImage"

type ChapterModalProps = {
    visible: boolean;
    onRequestClose: () => void;
    readingProgress: number;
    chapterContent: any
    params: { novelLink: string; chapterLink: string };
    handleSliderChange: (value: number) => void;
    handleNextChapter: () => void
    handlePrevChapter: () => void
    handleAnonNav: (link: string) => void
    novelImage: string;
}

const ChapterModal = ({
    visible,
    onRequestClose,
    readingProgress,
    chapterContent,
    params,
    handleSliderChange,
    handleNextChapter,
    handlePrevChapter,
    handleAnonNav,
    novelImage,
}: ChapterModalProps) => {

    const { currentNovel } = useNovelStore()
    const { readNovels } = useHistoryStore();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleChapterNav = (link: string) => {
        setIsModalVisible(false)
        handleAnonNav(link)
    }
    const historyNovel = readNovels.find(n => n.novelLink === params.novelLink);

    return (
        <CustomModal
            visible={visible}
            onRequestClose={onRequestClose}
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
                    <Pressable
                        disabled={!chapterContent.prevChapter}
                        onPress={handlePrevChapter}
                    >
                        <FontAwesome
                            name="chevron-left"
                            size={20}
                            color={`${chapterContent.prevChapter ? '#4b5563' : 'white'}`} />
                    </Pressable>
                    <Slider
                        style={{ width: 300, height: 10 }}
                        value={readingProgress / 100} // Convert percentage back to 0-1 range for slider
                        onSlidingComplete={handleSliderChange} // <- prevents feedback while dragging
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#581c87"
                        thumbTintColor="#581c87"
                        maximumTrackTintColor="#c084fc"
                    />
                    <Pressable
                        onPress={handleNextChapter}
                        disabled={!chapterContent.nextChapter}
                    >
                        <FontAwesome
                            name="chevron-right"
                            size={18}
                            color={`${chapterContent.nextChapter ? '#4b5563' : 'white'}`} />
                    </Pressable>
                </View>
            </View>

            {/* Book info */}
            <View className="flex-row  gap-2">
                <Pressable
                    onPress={() => setIsModalVisible(true)}
                    className="flex-row gap-3 items-center bg-gray-300 rounded-xl p-4 w-1/2">
                    <Octicons name="three-bars" size={25} color="#4b5563" />
                    <View className="flex-col gap-2">
                        <Text>Contents</Text>
                        <Text className="text-gray-500 text-sm">
                            {currentNovel ? currentNovel.chapters : historyNovel!.chapters.length} Chapters
                        </Text>
                    </View>
                </Pressable>
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
            <NovelModal
                novelLink={params.novelLink}
                position="center"
                fixedPosition={true}
                visible={isModalVisible}
                handleNav={handleChapterNav}
            />
        </CustomModal>)
}

export default ChapterModal