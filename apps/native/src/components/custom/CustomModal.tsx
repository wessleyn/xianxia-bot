import { BlurView } from 'expo-blur';
import { Modal, ModalProps, StyleSheet, TouchableWithoutFeedback, View } from "react-native";

const CustomModal = ({ ...Props }: Props) => {
    return (
        <Modal {...Props} transparent>
            <View style={StyleSheet.absoluteFill}>
                <BlurView
                    intensity={60}
                    tint="light"
                    style={StyleSheet.absoluteFill}
                />
                <TouchableWithoutFeedback onPress={Props.onRequestClose}>
                    <View style={StyleSheet.absoluteFill} />
                </TouchableWithoutFeedback>
            </View>

            <View
                className={`flex-1 relative ${Props.position === 'bottom' ? 'mt-auto justify-end' :
                    Props.position === 'full' ? 'justify-start' : 'justify-end bg-transparent'
                    }`}>
                <TouchableWithoutFeedback>
                    <View
                        className={`bg-gray-100 relative ${Props.position === 'full' ? 'h-full w-full' :
                            Props.position === 'center' ? 'w-full h-[60%] mx-auto rounded-t-3xl' :
                                'w-full rounded-t-3xl'
                            } ${Props.className}`}>
                        {/* Modal bar */}
                        {Props.position !== 'full' && <View className='absolute top-2 left-1/2 flex justify-center items-center'>
                            <View className='bg-gray-200 dark:bg-gray-300 rounded-lg w-[3.6rem] h-2'></View>
                        </View>}
                        {Props.children}
                    </View>
                </TouchableWithoutFeedback>
            </View>
        </Modal>
    )
}

interface Props extends ModalProps {
    className?: string
    position?: 'bottom' | 'center' | 'full'
}

export default CustomModal