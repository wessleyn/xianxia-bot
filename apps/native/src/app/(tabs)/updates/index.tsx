import CustomView from "@components/custom/CustomView";
import NovelImage from "@components/reusable/NovelImage";
import { MaterialCommunityIcons, MaterialIcons, Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { formatSectionDate } from "@utils/format";
import fetchServerUpdates, { UpdateInfo } from "@utils/sources/fetchUpdates";
import { formatDistance } from "date-fns";
import { Link } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, ScrollView, SectionList, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import Toast from "react-native-toast-message";
import { createTheme } from "../../../constants/themes";
import { ReadNovel } from "../../../stores/history";


interface Section {
  title: string;
  data: UpdateInfo[];
}

interface TabDataType extends ReadNovel {
  newChLink?: string
  newChTitle?: string
  newChCount?: number
  latestUpdateDate?: Date


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
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const { secondaryBgColor, textColor, mutedColor, pillSelectedBg, pillBg, activityColor } = createTheme(isDark);
  const [latestNovels, setLatestNovels] = useState<any[]>([])
  const [updatedNovels, setUpdatedNovels] = useState<Section[]>([])
  const [refreshing, setRefreshing] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'all' | 'library' | 'liked'>('all')
  const [tabData, setTabData] = useState<TabDataType[]>([])

  const fetchUpdates = async () => {
    try {
      setRefreshing(true);
      const data = await fetchServerUpdates(selectedTab);
      data.sort((a, b) => new Date(b.latestUpdateDate).getTime() - new Date(a.latestUpdateDate).getTime());
      await AsyncStorage.setItem("updates", JSON.stringify(data))
      if (selectedTab === 'all') {
        setLatestNovels(data.splice(0, data.length == 2 ? 1 : data.length == 3 ? 2 : 3))
        setUpdatedNovels(groupUpdatesByDate(data))
      } else {
        setTabData(tabData.filter(t => data.find(d => d.novelLink === t.novelLink)).map(t => {
          const d = data.find(d => d.novelLink === t.novelLink);
          return {
            ...t,
            newChLink: d!.newChLink,
            newChTitle: d!.newChTitle,
            newChCount: d!.newChCount,
            latestUpdateDate: d!.latestUpdateDate
          }
        }))
      }

    } catch (error) {
      console.error("Error fetching updates:", error);
      Toast.show({
        text1: "Error",
        text2: "Error Fetching Updates",
        type: "error",
        position: "bottom",
        bottomOffset: 100,
      })
    } finally {
      setRefreshing(false);
      Toast.show({
        text1: "Success",
        text2: "Updated Successfully",
        type: "success",
        position: "bottom",
        bottomOffset: 100,
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedTab == 'all') return
        setRefreshing(true);
        const data = await AsyncStorage.getItem("readingHistory")
        const parsedData = await JSON.parse(data ?? '[]') as ReadNovel[]
        let filteredData = []
        switch (selectedTab) {
          case 'library':
            filteredData = parsedData.filter(n => n.isInLibrary)
            break
          case 'liked':
            filteredData = parsedData.filter(n => n.isLiked)
            break
        }
        setTabData(filteredData)
      } catch (error) {
        console.error("Error fetching updates:", error);
        Toast.show({
          text1: "Error",
          text2: "Error Fetching Updates",
          type: "error",
          position: "bottom",
          bottomOffset: 100,
        })
      } finally {
        setRefreshing(false);
        fetchUpdates()
      }
    }
    fetchData()
  }, [selectedTab])

  return (
    <CustomView className="flex gap-3 px-6" style={{ backgroundColor: secondaryBgColor }}>

      <View className="flex-row gap-2 pr-4 justify-between">
        <Pressable
          onPress={() => setSelectedTab('all')}
          className={`w-1/3 flex-row gap-4  p-3 rounded-xl items-center justify-center`}
          style={{  backgroundColor: selectedTab === 'all' ? pillSelectedBg : pillBg }}>
          <MaterialIcons name="local-library" size={20} color={mutedColor} />
          <Text style={{ color: textColor }}>All</Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab('library')}
          className={`w-1/3 flex-row gap-4  p-3 rounded-xl items-center justify-center`}
          style={{  backgroundColor: selectedTab === 'library' ? pillSelectedBg : pillBg }}>
          <MaterialIcons name="library-books" size={20} color={mutedColor} />
          <Text style={{ color: textColor }}>Library</Text>
        </Pressable>
        <Pressable
          onPress={() => setSelectedTab('liked')}
          className={`w-1/3 flex-row gap-4  p-3 rounded-xl items-center justify-center`}
          style={{  backgroundColor: selectedTab === 'liked' ? pillSelectedBg : pillBg }}>
          <Octicons name="heart" size={20} color={mutedColor} />
          <Text style={{ color: textColor }}>Liked</Text>
        </Pressable>
      </View>

      {
        latestNovels.length > 0 && selectedTab === 'all' && <View className="flex-col gap-4 px-2 ">
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
                            ellipsizeMode="tail"
                            style={{ color: textColor }}>
                            {novel.name}
                          </Text>
                          <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: mutedColor }}>{novel.newChTitle}</Text>
                          <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: mutedColor }}>{formatDistance(novel.latestUpdateDate, new Date(), { addSuffix: true })}</Text>
                          <View className="flex-row gap-2 items-center">
                            <View className="w-3 h-3 bg-red-500 rounded-[100%]"></View>
                            <Text numberOfLines={1} ellipsizeMode="tail" className="text-sm" style={{ color: mutedColor }}>
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

      {
        selectedTab === 'all' ? (
          <View className="flex-col gap-2 px-2 mt-4">
            <SectionList
              sections={updatedNovels}
              keyExtractor={(item, index) => `${index}-${item.novelLink}`}
              renderSectionHeader={({ section }: { section: Section }) => (
                <Text className="text-lg mb-4" style={{ color: textColor }}>{section.title}</Text>
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
                        style={{ color: textColor }}
                      >
                        {item.name}
                      </Text>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: mutedColor }}>{item.author}</Text>
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: mutedColor }}>{formatDistance(item.latestUpdateDate, new Date(), { addSuffix: true })}</Text>
                      <View className="flex-row gap-2 items-center">
                        <View className="w-2 h-2 bg-red-500 rounded-full"></View>
                        <Text className="text-sm" style={{ color: mutedColor }}>
                          {item.newChCount} New {item.newChCount > 1 ? "Chapters" : "Chapter"}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
              )}
              refreshControl={
                <RefreshControl
                  colors={[activityColor]}
                  refreshing={refreshing}
                  onRefresh={onRefresh} />
              }
              ListEmptyComponent={() => (
                <View className="items-center justify-center h-[50vh]">
                  <MaterialCommunityIcons name="timer-sync-outline" size={64} color={mutedColor} />
                  <Text className="text-xl font-medium mt-4" style={{ color: textColor }}>
                    {refreshing ? 'Updating' : latestNovels.length > 0 ? 'No More Updates' : 'No Updates'}
                  </Text>
                  {
                    !refreshing && <Text className="text-sm mt-2 text-center px-8" style={{ color: mutedColor }}>
                   Pull To Refresh
                    </Text>
                  }
                </View>
              )}
            />
          </View>
        ) : (
          <FlatList
            className="mt-4"
            keyExtractor={(item => item.novelLink)}
            data={tabData}
            renderItem={({ item }) => (
              <Link
                href={{
                  pathname: '/(screens)/novel/[novelLink]/chapter/[chapterLink]',
                  params: {
                    novelLink: item.novelLink,
                    chapterLink: item.newChLink!
                  }
                }}
                disabled={!item.newChLink}
                asChild
              >
                <TouchableOpacity className="flex-row gap-2 items-center">
                  <NovelImage
                    image={item.coverImage!}
                    className="w-full"
                    size={70}
                  />
                  <View className="flex-col gap-1 w-3/4">
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={{ color: textColor }}
                    >
                      {item.title}
                    </Text>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: mutedColor }}>{item.author}</Text>

                    {
                      item.latestUpdateDate &&
                      <Text numberOfLines={1} ellipsizeMode="tail" style={{ color: mutedColor }}>{formatDistance(item.latestUpdateDate, new Date(), { addSuffix: true })}</Text>
                    }

                    {
                      item.newChCount &&
                      <View className="flex-row gap-2 items-center">
                        <View className="w-2 h-2 bg-red-500 rounded-full"></View>
                        <Text className="text-sm" style={{ color: mutedColor }}>
                          {item.newChCount} New {item.newChCount > 1 ? "Chapters" : "Chapter"}
                        </Text>
                      </View>
                    }
                  </View>
                </TouchableOpacity>
              </Link>
            )}
            refreshControl={
              <RefreshControl
                colors={[activityColor]}
                refreshing={refreshing}
                onRefresh={tabData && onRefresh}

              />
            }
            ListEmptyComponent={() => (
              <View className="items-center justify-center h-[50vh]">
                <MaterialCommunityIcons name="timer-sync-outline" size={64} color={mutedColor} />
                <Text className="text-xl font-medium mt-4" style={{ color: textColor }}>
                  {selectedTab == 'liked' ? 'No liked novels' : 'No novels in the library'}</Text>
                <Text className="text-sm mt-2 text-center px-8" style={{ color: mutedColor }}>
                  {
                    refreshing ? "Refreshing..." :
                      selectedTab == 'liked' ?
                        'Like novels and they\'ll appear here' :
                        'Add Novels to Library to see updates here.'
                  }
                </Text>
              </View>
            )}
          />
        )
      }
    </CustomView>
  );
}