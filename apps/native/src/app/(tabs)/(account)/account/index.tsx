import CustomView from "@components/CustomView";
import { Text } from "react-native";

export default function Account() {
  return (
    <CustomView className="items-center justify-center">
      <Text className="font-bold mb-5 text-3xl">Account</Text>
      <Text className="text-gray-500 px-10 text-center">
        This is where you'll manage your account settings and preferences.
      </Text>
    </CustomView>
  );
}
