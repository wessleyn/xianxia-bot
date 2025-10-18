import CustomView from "@//components/custom/CustomView";
import { Text, View, useColorScheme } from "react-native";
import { createTheme } from "../../../constants/themes";

export default function Local() {
    const isDark = useColorScheme() === 'dark';
    const { textColor, mutedColor, badgeBg, badgeText } = createTheme(isDark);
    return (
        <CustomView style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: textColor, fontWeight: '700', marginBottom: 8, fontSize: 24 }}>Local Novels</Text>
            <View style={{ marginBottom: 12, paddingHorizontal: 12, paddingVertical: 4, backgroundColor: badgeBg, borderRadius: 999 }}>
                <Text style={{ color: badgeText, fontSize: 12, fontWeight: '600' }}>COMING SOON</Text>
            </View>
            <Text style={{ color: mutedColor, paddingHorizontal: 40, textAlign: 'center' }}>
                This is where you'll manage your local novels, including their
                downloads, reading progress, and more.
            </Text>
        </CustomView>
    );
}
