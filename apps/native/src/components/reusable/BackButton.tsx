import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { GestureResponderEvent, Pressable, useColorScheme } from "react-native";
import { createTheme } from '../../constants/themes';

type Props = { size?: number; onPress?: (e: GestureResponderEvent) => void };

const BackButton = ({ size = 30, onPress }: Props) => {
    const router = useRouter();
    const scheme = useColorScheme();
    const { iconColor } = createTheme(scheme === 'dark');

    return (
        <Pressable
            onPress={(e) => {
                if (onPress) onPress(e);
                else router.back();
            }}
            hitSlop={8}
            accessibilityLabel="Back"
        >
            <MaterialIcons name="arrow-back" size={size} color={iconColor} />
        </Pressable>
    );
};

export default BackButton;