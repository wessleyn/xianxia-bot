import CustomView from "@//components/custom/CustomView";
import { Text } from "react-native";

export default function Chapter() {
    return (
        <CustomView className="items-center justify-center">
            <Text className="font-bold mb-5 text-3xl">Novel Chapter </Text>
            <Text className="text-gray-500 px-10 text-center">
                This is where you'll view and interact with your current selected novel chapter, including its
                 content, comments, rating and more.
            </Text>
        </CustomView>
    );
}
