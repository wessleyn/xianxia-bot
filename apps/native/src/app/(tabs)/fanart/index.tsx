import CustomView from "@components/CustomView";
import { Text } from "react-native";

export default function Fanart() {
  return (
    <CustomView className="items-center justify-center">
      <Text className="font-bold mb-5 text-3xl">Fanart</Text>
      <Text className="text-gray-500 px-10 text-center">
        This is where you'll find fan creations and artwork for your favorite
        novels.
      </Text>
    </CustomView>
  );
}
