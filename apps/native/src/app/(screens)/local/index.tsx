import CustomView from "@//components/custom/CustomView";
import { Text, View } from "react-native";

export default function Local() {
    return (
        <CustomView className="items-center justify-center">
            <Text className="font-bold mb-2 text-3xl">Local Novels</Text>
            <View className="mb-3 px-3 py-1 bg-amber-500 rounded-full">
                <Text className="text-xs text-white font-semibold">COMING SOON</Text>
            </View>
            <Text className="text-gray-500 px-10 text-center">
                This is where you'll manage your local novels, including their
                downloads, reading progress, and more.
            </Text>
        </CustomView>
    );
}
