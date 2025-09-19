import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

const BackButton = ({ size = 30 }) => {
    const router = useRouter()
    return (
        <Pressable onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={size} color="#4b5563" />
        </Pressable>)
}

export default BackButton