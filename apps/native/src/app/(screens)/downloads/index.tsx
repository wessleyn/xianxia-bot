import CustomView from "@//components/custom/CustomView";
import { Text, View, useColorScheme } from "react-native";
import { createTheme } from "../../../constants/themes";

export default function Downloads() {
    const isDark = useColorScheme() === 'dark';
    const { textColor, mutedColor, badgeBg, badgeText } = createTheme(isDark);
    return (
        <CustomView style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: textColor, fontWeight: '700', marginBottom: 12, fontSize: 24 }}>Downloads</Text>
            <View style={{ backgroundColor: badgeBg, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 999, marginBottom: 12 }}>
                <Text style={{ color: badgeText, fontWeight: '700', fontSize: 12 }}>COMING SOON</Text>
            </View>
            <Text style={{ color: mutedColor, paddingHorizontal: 40, textAlign: 'center' }}>
                This is where you'll manage your downloading novels, past, current and pending.
            </Text>
        </CustomView>
    );
}
