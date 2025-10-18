import CustomView from "@//components/custom/CustomView";
import { Text, View, useColorScheme } from "react-native";
import { createTheme } from "../../../constants/themes";

export default function Fanart() {
  const isDark = useColorScheme() === "dark";
  const { textColor, mutedColor, badgeBg, badgeText } = createTheme(isDark);

  return (
    <CustomView style={{ alignItems: "center", justifyContent: "center" }}>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}>
        <Text style={{ color: textColor, fontWeight: "700", fontSize: 28, marginRight: 8 }}>Fanart</Text>
        <View style={{ backgroundColor: badgeBg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}>
          <Text style={{ color: badgeText, fontSize: 10, fontWeight: "700" }}>COMING SOON</Text>
        </View>
      </View>
      <Text style={{ color: mutedColor, paddingHorizontal: 40, textAlign: "center" }}>
        This is where you'll find fan creations and artwork for your favorite
        novels. This data is fetched from fandom sites and is not hosted by us.
      </Text>
    </CustomView>
  );
}
