import CustomView from "@//components/custom/CustomView";
import { Text } from "react-native";

export default function Local() {
    return (
        <CustomView className="items-center justify-center">
            <Text className="font-bold mb-5 text-3xl">Local Novels</Text>
            <Text className="text-gray-500 px-10 text-center">
                This is where you'll manage your local novels, including their
                downloads, reading progress, and more.
            </Text>
        </CustomView>
    );
}
