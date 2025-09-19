import CustomLoading from "@components/custom/CustomLoading";
import CustomRating from "@components/custom/CustomRating";
import CustomView from "@components/custom/CustomView";
import NovelModal from "@components/NovelModal";
import BackButton from "@components/reusable/BackButton";
import NovelImage from "@components/reusable/NovelImage";
import SourceImage from "@components/reusable/SourceImage";
import { NovelMetaData } from "@constants/types";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useHistoryStore } from "@stores/history";
import { useNovelStore } from "@stores/novel";
import { findNovelSource } from "@utils/sources/findNovelSource";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

export default function NovelDetail() {
    const params = useLocalSearchParams<{ novelLink: string }>()
    const [novelMetadata, setNovelMetadata] = useState<NovelMetaData>()
    const { setCurrentNovel } = useNovelStore()
    const { readNovels, upsertNovel } = useHistoryStore()
    const [sourceFound, setSourceFound] = useState(false)
    const novelLink = params.novelLink

    // Get liked and library status from history store
    const novelInHistory = readNovels.find(n => n.novelLink === novelLink)
    const [isInLibrary, setIsInLibrary] = useState(novelInHistory?.isInLibrary || false)
    const [isLiked, setIsLiked] = useState(novelInHistory?.isLiked || false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const clas = findNovelSource(novelLink)
                const newInstance = new clas()
                const data = await newInstance.getNovelMetaData(novelLink)
                setCurrentNovel({
                    title: data.name,
                    author: data.author,
                    coverImage: data.cover,
                    novelLink: novelLink,
                    status: data.status,
                    chapters: data.chapters,
                })
                setNovelMetadata(data)
                setSourceFound(true)
            } catch (e) {
                setSourceFound(false)
                console.error(e)
            }
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (novelLink && novelMetadata) {
            upsertNovel({
                novelLink: novelLink,
                isInLibrary: isInLibrary,
                isLiked: isLiked,
                title: novelMetadata.name,
                author: novelMetadata.author,
                coverImage: novelMetadata.cover
            });
        }
    }, [isInLibrary, isLiked])

    // console.log(novelMetadata)
    if (!novelMetadata) return <CustomLoading position="center" />

    if (!sourceFound) return <Text>Novel Source Not Found/Supported</Text>

    return (
        <CustomView className="flex gap-4 px-4">

            <View className="flex-row items-center justify-between">
                <BackButton />
                <View className="flex-row items-center gap-8">
                    <Pressable>
                        <Octicons name="share-android" size={24} color="#4b5563" />
                    </Pressable>
                    <Pressable onPress={() => setIsLiked(!isLiked)}>
                        <Octicons name={isLiked ? "heart-fill" : "heart"} size={24} color="#4b5563" />
                    </Pressable>
                    <Pressable>
                        <MaterialCommunityIcons name="download-outline" size={30} color="#4b5563" />
                    </Pressable>
                </View>
            </View>

            <View className="flex-row justify-between gap-4 ">
                <View className="py-1">
                    <NovelImage
                        image={novelMetadata.cover}
                        size={144}
                        className="rounded-lg" />
                </View>
                <View className="flex gap-8 w-4/6">
                    <Text className="text-lg w-3/4">{novelMetadata.name}</Text>
                    <Pressable
                        onPress={() => setIsInLibrary(!isInLibrary)}
                        className={`flex-row items-center p-2 border-2 ${isInLibrary ? 'bg-gray-300 border-gray-500' : 'border-gray-400'} rounded-xl w-9/12`}
                    >
                        <Ionicons
                            name={isInLibrary ? "library" : "library-outline"}
                            size={24}
                            color="#4b5563"
                        />
                        <Text className="text-gray-600">
                            {isInLibrary ? " In Library" : " Add to Library"}
                        </Text>
                    </Pressable>
                </View>
            </View>

            <View className="p-4 flex gap-3 bg-gray-100 rounded-lg justify-start overflow-hidden">
                <View className="flex-row">
                    <Text className="w-2/5 ">Source</Text>
                    <View className="flex-row gap-4 self-end flex-1 flex-wrap">
                        <SourceImage
                            size={20}
                            icon={novelMetadata.source.icon}
                            name={novelMetadata.source.name}
                        />
                        <Text numberOfLines={1} ellipsizeMode="tail" className="flex-shrink">{novelMetadata.source.name}</Text>
                    </View>
                </View>
                <View className="flex-row justify-start gap-2">
                    <Text className="w-2/5">Author</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" className="flex-1 text-wrap">{novelMetadata.author} </Text>
                </View>
                <View className="flex-row justify-start gap-2">
                    <Text className="w-2/5">Translation</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" className="flex-1">{novelMetadata.language}</Text>
                </View>
                <View className="flex-row justify-start gap-2">
                    <Text className="w-2/5">Rating</Text>
                    <CustomRating
                        val={novelMetadata.rating.val}
                        outOf={novelMetadata.rating.outOf}
                    />
                </View>
                <View className="flex-row justify-start gap-2">
                    <Text className="w-2/5">Status</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" className="flex-1">{novelMetadata.status} </Text>
                </View>
                <View className="flex-row justify-start gap-2">
                    <Text className="w-2/5">Chapters</Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" className="flex-1">{novelMetadata.chapters}</Text>
                </View>
            </View>

            <View className="h-12" >
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    className="flex-row flex-wrap gap-4 "
                >
                    {
                        novelMetadata.genres.map((genre, index) => (
                            <Text
                                key={index}
                                className={`border-2 border-gray-400 rounded-xl p-2  ${index > 0 ? 'ml-4' : ''} text-center text-gray-600 `}>
                                {genre}
                            </Text>
                        ))
                    }
                </ScrollView>
            </View>

            <View className="h-[11rem]">
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <Text>
                        {novelMetadata.desc}
                    </Text>
                </ScrollView>
            </View>

            <NovelModal novelLink={novelLink} />
        </CustomView>
    );
}
