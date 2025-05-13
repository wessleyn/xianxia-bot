import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Native() {
  return (
    <View style={styles.container}>
        <Text style={styles.header}>Native</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontWeight: "bold",
    marginBottom: 20,
    fontSize: 36,
  },
});
