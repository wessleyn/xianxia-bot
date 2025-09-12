import CustomView from "@//components/custom/CustomView";
import { Text } from "react-native";

export default function Suggestions() {
    return (
        <CustomView className="items-center justify-center">
            <Text className="font-bold mb-5 text-3xl">Suggestions</Text>
            <Text className="text-gray-500 px-10 text-center">
                This is where you find a list of suggested novels            </Text>
        </CustomView>
    );
}
