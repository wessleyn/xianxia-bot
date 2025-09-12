import CustomView from "@//components/custom/CustomView";
import { Text } from "react-native";

export default function Sources() {
    return (
        <CustomView className="items-center justify-center">
            <Text className="font-bold mb-5 text-3xl">Novel Source</Text>
            <Text className="text-gray-500 px-10 text-center">
This is where you find the novels on the current source            </Text>
        </CustomView>
    );
}
