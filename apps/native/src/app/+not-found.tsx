import { Link } from 'expo-router';
import { Text, TouchableOpacity, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createTheme } from '../constants/themes';

export default function NotFoundScreen() {
    const isDark = useColorScheme() === 'dark';
    const { secondaryBgColor, textColor, mutedColor, activityColor } = createTheme(isDark);

    return (
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: secondaryBgColor }}>
            <Text style={{ color: mutedColor, marginBottom: 16, fontSize: 18 }}>Are you lost?</Text>
            <Link href="/" asChild >
                <TouchableOpacity
                    style={{ padding: 12, borderRadius: 8, backgroundColor: activityColor }}
                >
                    <Text style={{ color: '#fff', fontSize: 16 }}>Continue Exploring</Text>
                </TouchableOpacity>
            </Link>
        </SafeAreaView>
    );
}

