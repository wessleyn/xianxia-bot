import { FontAwesome, MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useHistoryStore } from "@stores/history";
import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { createTheme } from "../../constants/themes";
import { useNovelStore } from "../../stores/novel";
import CustomModal from "../custom/CustomModal";
import NovelModal from "../NovelModal";
import NovelImage from "../reusable/NovelImage";

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

    const colorScheme = useColorScheme()
    const isDark = colorScheme === "dark"

    // Colors that adapt to theme
    const bgCard = isDark ? "#374151" : "#e5e7eb"        // dark: gray-700, light: gray-200
    const textPrimary = isDark ? "#f3f4f6" : "#111827"   // light text on dark, dark text on light
    const textMuted = isDark ? "#9ca3af" : "#6b7280"     // muted text
    const iconColor = isDark ? "#e5e7eb" : "#4b5563"     // icon color
    const disabledIcon = isDark ? "#1f2937" : "#ffffff"  // disabled icon color
    const sliderMin = isDark ? "#a78bfa" : "#581c87"
    const sliderThumb = isDark ? "#a78bfa" : "#581c87"
    const sliderMax = isDark ? "#6b21a8" : "#c084fc"

    const handleChapterNav = (link: string) => {
        setIsModalVisible(false)
        handleAnonNav(link)
    }

    const onCloseModal = () => {
        setIsModalVisible(false)
        onRequestClose()
    }
    const historyNovel = readNovels.find(n => n.novelLink === params.novelLink);

    const theme = createTheme(isDark);
    return (
        <CustomModal
            visible={visible}
            onRequestClose={onCloseModal}
            position="bottom"
            bar
            blur
            animationType="slide"
            className="p-4 flex gap-2" 
        >
            <View className="mt-4 flex ">
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: textPrimary }}>
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
                            color={chapterContent.prevChapter ? iconColor : disabledIcon} />
                    </Pressable>
                    <Slider
                        style={{ width: 300, height: 10 }}
                        value={readingProgress / 100} // Convert percentage back to 0-1 range for slider
                        onSlidingComplete={handleSliderChange} // <- prevents feedback while dragging
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor={sliderMin}
                        thumbTintColor={sliderThumb}
                        maximumTrackTintColor={sliderMax}
                    />
                    <Pressable
                        onPress={handleNextChapter}
                        disabled={!chapterContent.nextChapter}
                    >
                        <FontAwesome
                            name="chevron-right"
                            size={18}
                            color={chapterContent.nextChapter ? iconColor : disabledIcon} />
                    </Pressable>
                </View>
            </View>

            {/* Book info */}
            <View className="flex-row  gap-2">
                <Pressable
                    onPress={() => setIsModalVisible(true)}
                    className="flex-row gap-3 items-center rounded-xl p-4 w-1/2"
                    style={{ backgroundColor: bgCard }}>
                    <Octicons name="three-bars" size={25} color={iconColor} />
                    <View className="flex-col gap-2">
                        <Text style={{ color: textPrimary }}>Contents</Text>
                        <Text style={{ color: textMuted }} className="text-sm">
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
                    <Pressable className="flex-row items-center rounded-xl p-4 flex-1" style={{ backgroundColor: bgCard }}>
                        <NovelImage
                            image={novelImage}
                            size={50}
                        />
                        <View className="flex-col ml-3 flex-1">
                            <Text style={{ color: textPrimary }}>About this book</Text>
                        </View>
                    </Pressable>
                </Link>
            </View>

            {/* Bottom buttons */}
            <View className="flex-row gap-2 w-full mt-2">
                <TouchableOpacity className="p-6 flex-1 rounded-xl justify-center items-center" style={{ backgroundColor: bgCard }}>
                    <MaterialIcons name="multitrack-audio" size={32} color={iconColor} />
                    <Text style={{ color: textPrimary }}>Listen</Text>
                </TouchableOpacity>
                <TouchableOpacity className="p-6 flex-1 rounded-xl justify-center items-center" style={{ backgroundColor: bgCard }}>
                    <MaterialCommunityIcons name="download-outline" size={32} color={iconColor} />
                    <Text style={{ color: textPrimary }}>Download</Text>
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