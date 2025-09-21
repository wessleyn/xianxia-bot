import CustomView from "@components/custom/CustomView";
import NovelImage from "@components/reusable/NovelImage";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useCallback, useState } from "react";
import { RefreshControl, ScrollView, SectionList, Text, TouchableOpacity, View } from "react-native";


interface Section {
  title: string;
  data: any[];
}
export default function Updates() {
  const [latestNovels, setLatestNovels] = useState<any[]>([
    {
      coverImage: "https://novelbin.me/media/novel/apocalypse-storage-queen-everything-i-need-is-in-my-space.jpg",
      name: "Apocalypse Storage Queen: Everything I Need Is in My Space ",
      novelLink: "https://novelbin.me/novel-book/apocalypse-storage-queen-everything-i-need-is-in-my-space",
      newChLink: "https://novelbin.me/novel-book/apocalypse-storage-queen-everything-i-need-is-in-my-space/chapter-77-lilian-awakening",
      newChTitle: "Chapter 77: Lilian Awakening ",
      newChCount: 1
    },
  ])

  const [updatedNovels, setUpdatedNovels] = useState<Section[]>([])

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      
      setRefreshing(false);
      setUpdatedNovels([
        {
          title: "4 days Ago",
          data: [
            {
              coverImage: "https://novelbin.me/media/novel/apocalypse-storage-queen-everything-i-need-is-in-my-space.jpg",
              name: "Apocalypse Storage Queen: Everything I Need Is in My Space ",
              novelLink: "https://novelbin.me/novel-book/apocalypse-storage-queen-everything-i-need-is-in-my-space",
              newChLink: "https://novelbin.me/novel-book/apocalypse-storage-queen-everything-i-need-is-in-my-space/chapter-77-lilian-awakening",
              newChTitle: "Chapter 77: Lilian Awakening ",
              genres: "Romance, Adult, Comedy",
              newChCount: 1
            }
          ]
        }
      ]);
    }, 2000);
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

      <View className="flex-col gap-4 px-2 ">
        <Text className="font-medium text-xl">Latest</Text>
        <View>
          <ScrollView
            horizontal
            pagingEnabled      
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                colors={["#6b7280"]}
                refreshing={refreshing}
                onRefresh={onRefresh} />
            }
          >
            {
              latestNovels.map(novel => (
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
                    {item.genres}
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
        />
      </View>
    </CustomView>
  );
}
