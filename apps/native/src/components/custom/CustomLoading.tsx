import { ActivityIndicator, View } from "react-native"

const CustomLoading = ({ position, className }: { position: 'center' | 'top', className?: string }) => {
    return (
        <View className={`flex justify-center item-center  
        ${position == 'center' ? 'h-full' : ''} ${className}`}>
            <ActivityIndicator size="large" color="#3b82f6" />
        </View>
    )
}

export default CustomLoading