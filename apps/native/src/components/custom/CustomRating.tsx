import FontAwesome from '@expo/vector-icons/FontAwesome';
import { View } from "react-native";

/**
 * @param param0 
 * @returns five star rating component
 */
const CustomRating = ({ val, outOf }: { val: number, outOf: number }) => {
    const newVal = outOf === 10 ? Math.round(val) / 2 : val;
    const newOutOf = outOf === 10 ? 5 : outOf;

    return (
        <View className="flex-row gap-2 flex-wrap">
            {
                Array.from({ length: newOutOf }, (_, index) => (
                    <FontAwesome
                        key={index}
                        name={`${index + 1 <= newVal ? 'star' : 'star-o'}`}
                        size={24}
                        color={`${index + 1 <= newVal ? 'gold' : '#4b5563'}`}
                    />
                ))
            }
        </View>)
}

export default CustomRating