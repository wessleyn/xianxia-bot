import CustomView from "@//components/custom/CustomView";
import NovelImage from "@components/reusable/NovelImage";
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { useHistoryStore } from '@stores/history';
import { formatDistanceToNow, isToday, isYesterday } from 'date-fns';
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, SectionList, Text, TouchableOpacity, View } from "react-native";


export interface ReadNovel {
  id: string;

  lastReadChLink: string;
  lastReadChTitle: string;
  progress: number; // percentage of chapter read (0-100)

  novelLink: string;

  title: string;
  author: string;
  coverImage?: string;
  lastReadAt: string;
}


interface Section {
  title: string;
  data: ReadNovel[];
}

const formatSectionDate = (dateString: string) => {
  const date = new Date(dateString);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return formatDistanceToNow(date, { addSuffix: true });
};

// Group readings by date
const groupReadingsByDate = (readings: ReadNovel[]) => {
  // If no readings, return empty array
  if (!readings.length) return [];

  const groups: { [key: string]: ReadNovel[] } = {};

  readings.forEach(novel => {
    const date = novel.lastReadAt.split('T')[0]; // Get just the date part
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(novel);
  });

  // Convert to SectionList format
  return Object.keys(groups)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // Sort newest first
    .map(date => ({
      title: formatSectionDate(date),
      data: groups[date]
    }));
};


export default function History() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const { readNovels } = useHistoryStore();
  const [loading, setLoading] = useState<boolean>(true);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const isTagSelected = (tag: string) => selectedTags.includes(tag);


  useEffect(() => {
    useHistoryStore.getState().loadFromStorage();
    setLoading(false);
  }, []);

  // useEffect(() => {
  //   const fetchReadNovels = async () => {
  //     try {
  //       const data = await AsyncStorage.getItem("readingHistory");
  //       const parsedData: ReadNovel[] = data ? JSON.parse(data) : [];
  //       // Sort novels by lastReadAt in descending order (latest first)
  //       const sortedData = [...parsedData].sort((a, b) => 
  //         new Date(b.lastReadAt).getTime() - new Date(a.lastReadAt).getTime()
  //       );
  //       setReadNovels(sortedData);
  //       setLoading(false);
  //     } catch (error) {
  //       setLoading(false);
  //     }
  //   };

  //   fetchReadNovels();
  // }, []);

  useEffect(() => {
    // Convert the ReadingHistory object to an array of ReadNovel objects
    const novelsArray = Object.values(readNovels);
    setSections(groupReadingsByDate(novelsArray));
  }, [readNovels]);

  return (
    <CustomView className="px-5">
      {/* filters */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          <View className="flex-row gap-4 py-4">
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl ${isTagSelected('device') ? 'bg-gray-300 border-gray-300' : ' border-gray-400  bg-none'}`}
              onPress={() => toggleTag('device')}
            >
              {isTagSelected('device') ? (
                <Ionicons name="checkmark" size={24} color="black" />
              ) : (
                <FontAwesome5 name="folder" size={20} color="#6b7280" />
              )}
              <Text>On Device</Text>
            </Pressable>
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl ${isTagSelected('library') ? 'bg-gray-300 border-gray-300' : ' border-gray-400  bg-none'}`}
              onPress={() => toggleTag('library')}
            >
              {isTagSelected('library') ? (
                <Ionicons name="checkmark" size={24} color="black" />
              ) : (
                <MaterialIcons name="library-books" size={20} color="#6b7280" />
              )}
              <Text>Library</Text>
            </Pressable>
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl ${isTagSelected('new-chapters') ? 'bg-gray-300 border-gray-300' : ' border-gray-400  bg-none'}`}
              onPress={() => toggleTag('new-chapters')}
            >
              {isTagSelected('new-chapters') ? (
                <Ionicons name="checkmark" size={24} color="black" />
              ) : (
                <MaterialCommunityIcons name="timer-sync-outline" size={20} color="#6b7280" />
              )}
              <Text>New Chapters</Text>
            </Pressable>
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl ${isTagSelected('completed') ? 'bg-gray-300 border-gray-300' : ' border-gray-400  bg-none'}`}
              onPress={() => toggleTag('completed')}
            >
              {isTagSelected('completed') ? (
                <Ionicons name="checkmark" size={24} color="black" />
              ) : (
                <Ionicons name="checkmark-done-outline" size={20} color="#6b7280" />
              )}
              <Text>Completed</Text>
            </Pressable>
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl ${isTagSelected('favorites') ? 'bg-gray-300 border-gray-300' : 'border-gray-400 bg-none'}`}
              onPress={() => toggleTag('favorites')}
            >
              {isTagSelected('favorites') ? (
                <Ionicons name="checkmark" size={24} color="black" />
              ) : (
                <Octicons name="heart" size={20} color="#6b7280" />
              )}
              <Text>Favourites</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* history */}
      {loading ? (
        <View className="items-center justify-center h-[80%]">
          <ActivityIndicator size="large" color="#6b7280" />
          <Text className="text-gray-500 mt-4">Loading your reading history...</Text>
        </View>) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: ReadNovel }) => (
            <Link
              href={{
                pathname: '/(screens)/novel/[novelLink]/chapter/[chapterLink]',
                params: {
                  novelLink: item.novelLink,
                  chapterLink: item.lastReadChLink
                }
              }}
              asChild
            >
              <TouchableOpacity className="mb-4">
                <View className="flex-row gap-4 ">
                  <View className="w-max relative">

                    <NovelImage
                      image={item.coverImage ?? 'https://a.a/a.png'}
                      className="w-full"
                      size={100}
                    />
                    <Text className="absolute top-1 right-1 bg-blue-500 p-2 border-2 border-gray-800 rounded-full">
                      {`${item.progress}%`}
                    </Text>
                  </View>
                  <View className="-mt-1 w-[70%]">
                    <Text className="text-xl">{item.title}</Text>
                    <Text numberOfLines={1}>{item.author}</Text>
                    <Text className="text-gray-600 text-sm mt-2" numberOfLines={1}>
                      Chapter {item.lastReadChLink.split('-').pop()}: {item.lastReadChTitle}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>

          )}
          renderSectionHeader={({ section }: { section: Section }) => (
            <Text className="ml-2 font-medium text-base mt-4 mb-2 text-gray-800">
              {section.title}
            </Text>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center h-[80%]">
              <Ionicons name="book-outline" size={64} color="#d1d5db" />
              <Text className="text-xl font-medium text-gray-500 mt-4">No Reading History</Text>
              <Text className="text-sm text-gray-400 mt-2 text-center px-8">
                Start reading novels to see your history here.
              </Text>
            </View>
          )}
          stickySectionHeadersEnabled={false}
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </CustomView>
  );
}
