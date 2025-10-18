import CustomView from "@//components/custom/CustomView";
import { Text, View, useColorScheme } from "react-native";
import { createTheme } from "../../../constants/themes";

export default function Suggestions() {
    const isDark = useColorScheme() === 'dark';
    const { textColor, mutedColor, badgeBg, badgeText } = createTheme(isDark);
    return (
        <CustomView style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                <Text style={{ color: textColor, fontWeight: '700', fontSize: 28 }}>Suggestions</Text>
                <View style={{ backgroundColor: badgeBg, marginLeft: 8, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999 }}>
                    <Text style={{ color: badgeText, fontSize: 10, fontWeight: '600' }}>COMING SOON</Text>
                </View>
            </View>
            <Text style={{ color: mutedColor, paddingHorizontal: 40, textAlign: 'center' }}>
                This is where you find a list of suggested novels.
            </Text>
        </CustomView>
    );
}
