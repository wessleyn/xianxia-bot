import CustomView from "@//components/custom/CustomView";
import { Text, View } from "react-native";

export default function Bookmarks() {
    return (
        <CustomView className="items-center justify-center">
            <View className="flex-row items-center mb-5">
                <Text className="font-bold text-3xl">Bookmarks</Text>
                <View className="ml-2 bg-yellow-500 px-2 py-1 rounded-full">
                    <Text className="text-xs font-semibold text-white">Coming Soon</Text>
                </View>
            </View>
            <Text className="text-gray-500 px-10 text-center">
                This is where you'll find your saved stories and chapters.
                novels.
            </Text>
        </CustomView>
    );
}
