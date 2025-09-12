import CustomView from "@//components/custom/CustomView";
import { Text } from "react-native";

export default function Sources() {
    return (
        <CustomView className="items-center justify-center">
            <Text className="font-bold mb-5 text-3xl">Novel Sources</Text>
            <Text className="text-gray-500 px-10 text-center">
                This is where you'll manage your current selected novel sources, including turning them on or off
            </Text>
        </CustomView>
    );
}
