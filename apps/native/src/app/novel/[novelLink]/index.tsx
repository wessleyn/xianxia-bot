import CustomView from "@//components/custom/CustomView";
import { Text } from "react-native";

export default function NovelDetail() {
    return (
        <CustomView className="items-center justify-center">
            <Text className="font-bold mb-5 text-3xl">Novel Detail</Text>
            <Text className="text-gray-500 px-10 text-center">
                This is where you'll manage your current selected novel, including its
                details, chapters, and more.
            </Text>
        </CustomView>
    );
}
