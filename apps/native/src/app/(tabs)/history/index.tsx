import CustomView from "@//components/custom/CustomView";
import NovelImage from "@components/reusable/NovelImage";
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { ReadNovel, useHistoryStore } from '@stores/history';
import { formatSectionDate } from "@utils/format";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, SectionList, Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { createTheme } from '../../../constants/themes';


interface Section {
  title: string;
  data: ReadNovel[];
}

const groupReadingsByDate = (readings: ReadNovel[]) => {
  if (!readings.length) return [];

  const groups: { [key: string]: ReadNovel[] } = {};

  readings.forEach(novel => {
    const date = novel.lastReadAt!.split('T')[0];
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


export default function History() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {
    secondaryBgColor,
    textColor,
    mutedColor,
    borderColor,
    pillSelectedBg,
    pillBg,
    activityColor,
    badgeBg,
    badgeText,
    emptyIconColor,
  } = createTheme(isDark);

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const { readNovels } = useHistoryStore();
  const [loading, setLoading] = useState<boolean>(true);

  const [filterCounts, setFilterCounts] = useState({
    device: 0,
    library: 0,
    'new-chapters': 0,
    completed: 0,
    favorites: 0,
  });

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const isTagSelected = (tag: string) => selectedTags.includes(tag);


  const calculateFilterCounts = (novels: ReadNovel[]) => {
    const validNovels = novels.filter(n => n.lastReadAt !== undefined);

    return {
      device: 0,
      library: validNovels.filter(n => n.isInLibrary === true).length,
      'new-chapters': 0,
      completed: 0,
      favorites: validNovels.filter(n => n.isLiked === true).length,
    };
  };

  useEffect(() => {
    const initialize = async () => {
      await useHistoryStore.getState().loadFromStorage();
      setLoading(false);
    };

    initialize();
  }, []);


  const applyFilters = (novels: ReadNovel[]) => {
    let filteredNovels = novels.filter(n => n.lastReadAt !== undefined);

    if (selectedTags.length === 0) {
      return filteredNovels;
    }

    return filteredNovels.filter(novel => {
      return selectedTags.some(tag => {
        switch (tag) {
          case 'device':
            return false;
          case 'library':
            return novel.isInLibrary === true;
          case 'new-chapters':
            // TODO: check against the actual novel data
            return false;
          case 'completed':
            // TODO: check against the actual novel data
            return false;
          case 'favorites':
            return novel.isLiked === true;
          default:
            return false;
        }
      });
    });
  };

  useEffect(() => {
    const filteredNovels = readNovels.filter(n => n.lastReadAt !== undefined);
    const filteredData = applyFilters(filteredNovels);
    setSections(groupReadingsByDate(filteredData));

    setFilterCounts(calculateFilterCounts(filteredNovels));
  }, [readNovels, selectedTags]);

  return (
    <CustomView
      style={{
        backgroundColor: secondaryBgColor,
        flex: 1,
        paddingLeft: 8,
        paddingRight: 8,
      }}>
      {/* filters */}
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} >
          <View className="flex-row gap-4 py-4">
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl`}
              onPress={() => toggleTag('device')}
              style={{
                backgroundColor: isTagSelected('device') ? pillSelectedBg : pillBg,
                borderColor,
              }}
            >
              {isTagSelected('device') ? (
                <Ionicons name="checkmark" size={24} color={textColor} />
              ) : (
                <FontAwesome5 name="folder" size={20} color={mutedColor} />
              )}
              <Text style={{ color: textColor }}>On Device ({filterCounts.device})</Text>
            </Pressable>
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl`}
              onPress={() => toggleTag('library')}
              style={{
                backgroundColor: isTagSelected('library') ? pillSelectedBg : pillBg,
                borderColor,
              }}
            >
              {isTagSelected('library') ? (
                <Ionicons name="checkmark" size={24} color={textColor} />
              ) : (
                <MaterialIcons name="library-books" size={20} color={mutedColor} />
              )}
              <Text style={{ color: textColor }}>Library ({filterCounts.library})</Text>
            </Pressable>
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl`}
              onPress={() => toggleTag('new-chapters')}
              style={{
                backgroundColor: isTagSelected('new-chapters') ? pillSelectedBg : pillBg,
                borderColor,
              }}
            >
              {isTagSelected('new-chapters') ? (
                <Ionicons name="checkmark" size={24} color={textColor} />
              ) : (
                <MaterialCommunityIcons name="timer-sync-outline" size={20} color={mutedColor} />
              )}
              <Text style={{ color: textColor }}>New Chapters ({filterCounts['new-chapters']})</Text>
            </Pressable>
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl`}
              onPress={() => toggleTag('completed')}
              style={{
                backgroundColor: isTagSelected('completed') ? pillSelectedBg : pillBg,
                borderColor,
              }}
            >
              {isTagSelected('completed') ? (
                <Ionicons name="checkmark" size={24} color={textColor} />
              ) : (
                <Ionicons name="checkmark-done-outline" size={20} color={mutedColor} />
              )}
              <Text style={{ color: textColor }}>Completed ({filterCounts.completed})</Text>
            </Pressable>
            <Pressable
              className={`flex-row gap-2 border-2 p-2 rounded-2xl`}
              onPress={() => toggleTag('favorites')}
              style={{
                backgroundColor: isTagSelected('favorites') ? pillSelectedBg : pillBg,
                borderColor,
              }}
            >
              {isTagSelected('favorites') ? (
                <Ionicons name="checkmark" size={24} color={textColor} />
              ) : (
                <Octicons name="heart" size={20} color={mutedColor} />
              )}
              <Text style={{ color: textColor }}>Favorites ({filterCounts.favorites})</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      {/* history */}
      {loading ? (
        <View className="items-center justify-center h-[80%]">
          <ActivityIndicator size="large" color={activityColor} />
          <Text style={{ color: mutedColor }} className="mt-4">Loading your reading history...</Text>
        </View>) : (
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: ReadNovel }) => (
            <Link
              href={
                item.lastReadChLink ? {
                  pathname: '/(screens)/novel/[novelLink]/chapter/[chapterLink]',
                  params: {
                    novelLink: item.novelLink,
                    chapterLink: item.lastReadChLink
                  }
                } : {
                  pathname: '/(screens)/novel/[novelLink]',
                  params: { novelLink: item.novelLink }
                }
              }
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
                    <Text
                      className="absolute top-1 right-1 p-2 border-2 rounded-full"
                      style={{
                        backgroundColor: badgeBg,
                        color: badgeText,
                        borderColor: isDark ? '#0b1220' : '#111827',
                      }}
                    >
                      {`${Math.floor(item.progress)}%`}
                    </Text>
                  </View>
                  <View className="-mt-1 w-[70%]">
                    <Text className="text-lg" style={{ color: textColor }}>{item.title}</Text>
                    <Text numberOfLines={1} style={{ color: mutedColor }}>{item.author}</Text>
                    <Text className="text-sm mt-2" numberOfLines={1} style={{ color: mutedColor }}>

                      {
                        item.lastReadChTitle?.includes("Unknown Title")
                          ? "Start Reading"
                          : `Chapter ${item.lastReadChLink!.split('-').pop()}: ${item.lastReadChTitle}`
                      }

                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Link>

          )}
          renderSectionHeader={({ section }: { section: Section }) => (
            <Text className="ml-2 font-medium text-base mt-4 mb-2" style={{ color: textColor }}>
              {section.title}
            </Text>
          )}
          ListEmptyComponent={() => (
            <View className="items-center justify-center h-[80%]">
              <Ionicons name="book-outline" size={64} color={emptyIconColor} />
              <Text className="text-xl font-medium mt-4" style={{ color: textColor }}>No Reading History</Text>
              <Text className="text-sm mt-2 text-center px-8" style={{ color: mutedColor }}>
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
