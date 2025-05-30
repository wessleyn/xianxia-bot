import { StatusBar } from "expo-status-bar";
import { Button, Text, View } from "react-native";

export default function Native() {
  return (
    <View className="flex-1 bg-red-200 items-center justify-center">
      <Text className="font-bold mb-5 text-red-700 text-3xl">Native</Text>
      <Button
        onPress={() => {
          console.log("Pressed!");
          alert("Pressed!");
        }}
        title="Boop"
      />
      <StatusBar style="auto" />
    </View>
  );
}
