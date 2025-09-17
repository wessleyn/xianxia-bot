import CustomView from "@//components/custom/CustomView";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function Chapter() {
    const params = useLocalSearchParams<{ chapterLink: string }>()
    const chapterLink = params.chapterLink
    
    return (
        <CustomView className="items-center justify-center">
            <Text className="font-bold mb-5 text-3xl">Novel Chapter </Text>
            <Text className="text-gray-500 px-10 text-center">
                This is where you'll view and interact with your selected chapter: {chapterLink}, including its
                 content, comments, rating and more.
            </Text>
        </CustomView>
    );
}
