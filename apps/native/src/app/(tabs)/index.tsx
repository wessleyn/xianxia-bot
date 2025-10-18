import CustomView from "@components/custom/CustomView";
import RandomNovel from "@components/reusable/RandomNovel";
import SourceImage from "@components/reusable/SourceImage";
import { MaterialIcons } from '@expo/vector-icons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from "expo-router";

import { Novel, Source } from "@constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, Pressable, Text, TouchableOpacity, useColorScheme, View } from "react-native";

export default function Explore() {
  const [enabledSources, setEnabledSources] = useState<Source[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const colorScheme = useColorScheme();
  const db = useSQLiteContext();

  useEffect(() => {
    const fetchSources = async () => {
      const sources = await db.getAllAsync<Source>('SELECT * FROM sources WHERE enabled = 1;')
      setEnabledSources(sources);
    }
    const checkSettings = async () => {
      const setting = await AsyncStorage.getItem('showSuggestions')
      const parsedSettings = JSON.parse(setting ?? 'true') as boolean
      setShowSuggestions(parsedSettings)
    }

    checkSettings();
    fetchSources();
  }, []);

  const suggestedNovels = [] as Novel[];

  const { width } = Dimensions.get('window');
  const CARD_WIDTH = width * 0.40;
  const isDark = colorScheme === 'dark';

  return (
    <CustomView className="flex-1 gap-2">

      {/* Navigation Matrix */}
      <View className="px-4 text-center">
        <View className="flex-row mb-4">
          <Link href={'/local'} push asChild>
            <Pressable className="flex-1 flex-row align gap-4 bg-gray-200 dark:bg-gray-800 p-4 mr-4 rounded-xl shadow-sm">
              <FontAwesome5
                name="folder"
                size={24}
                color={isDark ? "#9ca3af" : "#4b5563"}

              />
              <Text className="font-medium text-gray-400 mt-1">Local Storage</Text>
            </Pressable>
          </Link>
          <Link href={'/bookmarks'} asChild >
            <Pressable className="flex-1 flex-row gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <MaterialIcons
                name="bookmark-outline"
                size={24}
                color={isDark ? "#9ca3af" : "#4b5563"}

              />
              <Text className="font-medium text-gray-400 mt-1">Bookmarks</Text>
            </Pressable>
          </Link>
        </View>
        <View className="flex-row">
          <RandomNovel
            isDark={isDark}
            text
            containerClassName="flex-1 flex-row gap-4 bg-gray-200 dark:bg-gray-800 p-4 mr-4 rounded-xl shadow-sm"
          />
          <Link href={'/downloads'} asChild >
            <Pressable className="flex-1 flex-row gap-4 bg-gray-200 dark:bg-gray-800 p-4 rounded-xl shadow-sm">
              <MaterialCommunityIcons
                name="download-outline"
                size={24}
                color={isDark ? "#9ca3af" : "#4b5563"}

              />
              <Text className="font-medium text-gray-400 mt-1">Downloads</Text>
            </Pressable>
          </Link>
        </View>
      </View>

      {/* Suggested Novels Carousel */}
      {
        showSuggestions && <View className="mb-4">
          <View className="flex-row justify-between px-4 mb-4">
            <Text className="text-lg font-semibold dark:text-gray-400">Suggestions</Text>
            {suggestedNovels.length > 0 && <Link href={'/suggestions'} asChild>
              <TouchableOpacity>
                <Text className="text-gray-400 dark:font-bold">More</Text>
              </TouchableOpacity>
            </Link>}
          </View>

          <FlatList
            data={suggestedNovels}
            renderItem={({ item }) => (
              <Link href={`/novel/${item.id}`} asChild>
                <Pressable style={{ width: CARD_WIDTH }} className="mr-3">
                  <View className="h-44 rounded-xl overflow-hidden relative">
                    <Image
                      source={{ uri: item.image }}
                      className="w-full h-full rounded-xl"
                      style={{ resizeMode: 'cover' }}
                    />
                    <View className="absolute bottom-0 left-0 right-0 bg-black/60 p-2.5 rounded-b-xl">
                      <Text className="text-white font-bold text-base" numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
                      <Text className="text-gray-300 text-xs mt-0.5" numberOfLines={1} ellipsizeMode="tail">{item.tags}</Text>
                    </View>
                  </View>
                </Pressable>
              </Link>
            )}
            ListEmptyComponent={() => (
              <View className="flex h-[5vh] w-3/4 items-center justify-center px-4">
                <Text className=" text-gray-500 text-wrap text-center ">
                  Start Reading or Import History to get recommendations.
                </Text>
              </View>
            )}
            keyExtractor={(item: Novel) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 16, paddingRight: 8 }}
            pagingEnabled={false}
            snapToAlignment="center"
            snapToInterval={CARD_WIDTH + 12} // Card width + margin
            decelerationRate="fast"
            className="py-2"
          />
        </View>
      }

      {/* Supported and enabled Sources */}
      <View className="flex-1">
        <View className="flex-row justify-between px-4 mb-4">
          <Text className="text-lg font-semibold dark:text-gray-400">Sources</Text>
          <Link href={'/sources'} asChild>
            <TouchableOpacity>
              <Text className="text-gray-400 dark:font-bold">Catalog</Text>
            </TouchableOpacity>
          </Link>
        </View>

        <FlatList
          data={enabledSources}
          renderItem={({ item }) => (
            <Link href={`/sources/${item.id}`} asChild>
              <Pressable className="items-center mb-6">
                <View className="p-2">
                  <SourceImage
                    id={item.id}
                    icon={item.icon}
                    name={item.name}
                    size={64}
                  />
                </View>
                <Text className="text-center dark:text-gray-400 mt-2" numberOfLines={1}>{item.name}</Text>
              </Pressable>
            </Link>
          )}
          keyExtractor={item => item.id}
          numColumns={3}
          columnWrapperStyle={{ justifyContent: 'space-around', paddingHorizontal: 8 }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          ListEmptyComponent={() => (
            <View className="flex h-[45vh] items-center justify-center">
              <Text className=" text-gray-500 ">Explore Catalog to add more sources.</Text>
            </View>
          )}
          className="flex-1"
        />
      </View>

    </CustomView>
  );
}
