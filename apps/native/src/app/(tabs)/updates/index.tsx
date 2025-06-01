import CustomView from "@components/CustomView";
import { Text } from "react-native";

export default function Updates() {
  return (
    <CustomView className=" items-center justify-center">
      <Text className="font-bold mb-5 text-3xl">Updates</Text>
      <Text className="text-gray-500 px-10 text-center  ">
        This is where you'll see the latest updates of your reading list.
      </Text>
    </CustomView>
  );
}
