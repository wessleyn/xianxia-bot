import CustomView from "@//components/custom/CustomView";
import { Text, View } from "react-native";

export default function Fanart() {
  return (
    <CustomView className="items-center justify-center">
      <View className="flex-row items-center mb-5">
        <Text className="font-bold text-3xl mr-2">Fanart</Text>
        <View className="bg-yellow-500 px-2 py-1 rounded-full">
          <Text className="text-xs font-bold text-white">COMING SOON</Text>
        </View>
      </View>
      <Text className="text-gray-500 px-10 text-center">
        This is where you'll find fan creations and artwork for your favorite
        novels. This data is fetched from fandom sites and is not hosted by us.
      </Text>
    </CustomView>
  );
}
