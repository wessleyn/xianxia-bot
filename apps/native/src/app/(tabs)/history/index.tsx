import CustomView from "@components/CustomView";
import { Text } from "react-native";

export default function History() {
  return (
    <CustomView className="items-center justify-center">
      <Text className="font-bold mb-5 text-3xl">History</Text>
      <Text className="text-gray-500 px-10 text-center">
        This is where you'll see your reading history and progress.
      </Text>
    </CustomView>
  );
}
