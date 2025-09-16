import { ActivityIndicator, View } from "react-native"

const CustomLoading = ({ position }: { position: 'center' | 'top'}) => {
    return (
        <View className={`flex justify-center item-center bg-white 
        ${position == 'center' ? 'h-full' : ''}`}>
            <ActivityIndicator size="large" color="#3b82f6" />
        </View>
    )
}

export default CustomLoading