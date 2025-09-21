import CustomView from "@components/custom/CustomView";
import NovelImage from "@components/reusable/NovelImage";
import { MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatSectionDate } from "@utils/format";
import fetchServerUpdates, { UpdateInfo } from "@utils/sources/fetchUpdates";
import { formatDistance } from "date-fns";
import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { RefreshControl, ScrollView, SectionList, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";


interface Section {
  title: string;
  data: UpdateInfo[];
}

const groupUpdatesByDate = (updates: UpdateInfo[]) => {
  if (!updates.length) return [];

  const groups: { [key: string]: UpdateInfo[] } = {};

  updates.forEach(novel => {
    const date = novel.latestUpdateDate!.toISOString().split('T')[0];
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(novel);
  });

  return Object.keys(groups)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .map(date => ({
      title: formatSectionDate(date),
      data: groups[date]
    }));
};

export default function Updates() {
  const [latestNovels, setLatestNovels] = useState<any[]>([])

  const [updatedNovels, setUpdatedNovels] = useState<Section[]>([])

  const [refreshing, setRefreshing] = useState(false);

  const fetchUpdates = async () => {
    try {
      setRefreshing(true);
      const data = await fetchServerUpdates();
      data.sort((a, b) => new Date(b.latestUpdateDate).getTime() - new Date(a.latestUpdateDate).getTime());
      await AsyncStorage.setItem("updates", JSON.stringify(data))
      setLatestNovels(data.splice(0, 3))
      setUpdatedNovels(groupUpdatesByDate(data))

    } catch (error) {
      console.error("Error fetching updates:", error);
      Toast.show({
        text1: "Error",
        text2: "Error Fetching Updates",
        type: "error",
        position: "bottom"
      })
    } finally {
      setRefreshing(false);
      Toast.show({
        text1: "Success",
        text2: "Updated Successfully",
        type: "success",
        position: "bottom",
      })

    }

   }
  const onRefresh = useCallback(fetchUpdates, []);

  useEffect(() => {
    const fetchData = async () => {
      const settings = await AsyncStorage.getItem("autoCheckUpdates")
      const parsedSettings = settings ? JSON.parse(settings) : false

      if (parsedSettings) {
        fetchUpdates();
      } else {
        const storedUpdates = await AsyncStorage.getItem("updates")
        if (storedUpdates) {
          const parsedUpdates = JSON.parse(storedUpdates) as UpdateInfo[]
          setLatestNovels(parsedUpdates.splice(0, 3))
          setUpdatedNovels(groupUpdatesByDate(parsedUpdates))
        }
      }

    }
    fetchData();
  }, []);

  return (
    <CustomView className="flex gap-3 px-6">

      <View className="flex-row gap-2 pr-4 justify-between">
        <View className="w-1/3 flex-row gap-4 border-2 border-[#6b7280] p-3 rounded-xl items-center justify-center">
          <MaterialIcons name="local-library" size={20} color="#6b7280" />
          <Text>All</Text>
        </View>
        <View className="w-1/3 flex-row gap-4 border-2 border-[#6b7280] p-3 rounded-xl items-center justify-center">
          <MaterialIcons name="library-books" size={20} color="#6b7280" />
          <Text>Library</Text>
        </View>
        <View className="w-1/3 flex-row gap-4 border-2 border-[#6b7280] p-3 rounded-xl items-center justify-center">
          <Octicons name="heart" size={20} color="#6b7280" />
          <Text>Liked</Text>
        </View>
      </View>

      {
        latestNovels.length > 0 && <View className="flex-col gap-4 px-2 ">
          <Text className="font-medium text-xl">Latest</Text>
          <View>
            <ScrollView
              horizontal
              pagingEnabled
              decelerationRate="fast"
              showsHorizontalScrollIndicator={false}
            >
              {
                latestNovels.map((novel: UpdateInfo) => (
                  <View key={novel.novelLink} className="flex-row gap-4 mr-4 w-[21rem]">
                    <Link
                      href={{
                        pathname: '/(screens)/novel/[novelLink]/chapter/[chapterLink]',
                        params: {
                          novelLink: novel.novelLink,
                          chapterLink: novel.newChLink
                        }
                      }}
                      asChild
                    >
                      <TouchableOpacity className="flex-row gap-2 items-center">
                        <NovelImage
                          image={novel.coverImage}
                          className="w-full"
                          size={100}
                        />
                        <View className="flex-col gap-1 w-[64%]">
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail">
                            {novel.name}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="text-gray-700"
                          >
                            {novel.newChTitle}
                          </Text>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            className="text-gray-700"
                          >
                            {formatDistance(novel.latestUpdateDate, new Date(), { addSuffix: true })}
                          </Text>
                          <View className="flex-row gap-2 items-center">
                            <View className="w-3 h-3 bg-red-500 rounded-[100%]"></View>
                            <Text
                              numberOfLines={1}
                              ellipsizeMode="tail"
                              className="text-sm text-gray-500"
                            >
                              {novel.newChCount} New {novel.newChCount > 1 ? "Chapters" : "Chapter"}
                            </Text>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Link>
                  </View>
                ))
              }
            </ScrollView>
          </View>
        </View>
      }

      <View className="flex-col gap-2 px-2 mt-4">
        <SectionList
          sections={updatedNovels}
          keyExtractor={(item, index) => `${index}-${item.novelLink}`}
          renderSectionHeader={({ section }: { section: Section }) => (
            <Text className="text-lg mb-4">{section.title}</Text>
          )}
          renderItem={({ item }) => (
            <Link
              href={{
                pathname: '/(screens)/novel/[novelLink]/chapter/[chapterLink]',
                params: {
                  novelLink: item.novelLink,
                  chapterLink: item.newChLink
                }
              }}
              asChild
            >
              <TouchableOpacity className="flex-row gap-2 items-center">
                <NovelImage
                  image={item.coverImage}
                  className="w-full"
                  size={70}
                />
                <View className="flex-col gap-1 w-3/4">
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.name}
                  </Text>
                  <Text
                    className="text-gray-600"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {item.author}
                  </Text>
                  <Text
                    className="text-gray-600"
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {formatDistance(item.latestUpdateDate, new Date(), { addSuffix: true })}
                  </Text>
                  <View className="flex-row gap-2 items-center">
                    <View className="w-2 h-2 bg-red-500 rounded-full"></View>
                    <Text
                      className="text-sm text-gray-500"
                    >
                      {item.newChCount} New {item.newChCount > 1 ? "Chapters" : "Chapter"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>
          )}
          refreshControl={
            <RefreshControl
              colors={["#6b7280"]}
              refreshing={refreshing}
              onRefresh={onRefresh} />
          }
          ListEmptyComponent={() => (
            <View className="items-center justify-center h-[50vh]">
              <MaterialCommunityIcons name="timer-sync-outline" size={64} color="#6b7280" />
              <Text className="text-xl font-medium text-gray-500 mt-4">No Updates</Text>
              <Text className="text-sm text-gray-400 mt-2 text-center px-8">
                {refreshing ? "Refreshing..." : "                Pull To Refresh"}
              </Text>
            </View>
          )}
        />
      </View>
    </CustomView>
  );
}
