import CustomView from "@//components/custom/CustomView";
import { Text, View } from "react-native";

export default function Downloads() {
    return (
        <CustomView className="items-center justify-center">
            <Text className="font-bold mb-5 text-3xl">Downloads</Text>
            <View className="bg-yellow-500 px-3 py-1 rounded-full mb-4">
                <Text className="text-white font-bold text-xs">COMING SOON</Text>
            </View>
            <Text className="text-gray-500 px-10 text-center">
                This is where you'll manage your downloading novels, past, current and pending.
                novels.
            </Text>
        </CustomView>
    );
}
