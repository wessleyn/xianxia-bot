import { createTheme } from '@constants/themes';
import { BlurView } from 'expo-blur';
import { Modal, ModalProps, StyleSheet, TouchableWithoutFeedback, View, useColorScheme } from "react-native";

const CustomModal = ({ ...Props }: Props) => {
    const colorScheme = useColorScheme();
    const theme = createTheme(colorScheme === 'dark');

    return (
        <Modal {...Props} transparent>
            <View style={StyleSheet.absoluteFill}>
                {
                    Props.blur &&
                    <BlurView
                        intensity={60}
                        tint={colorScheme === 'dark' ? 'dark' : 'light'}
                        style={StyleSheet.absoluteFill}
                    />
                }
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
                        style={{
                            backgroundColor: theme.primaryBgColor
                        }}
                        className={`bg-gray-100 relative ${Props.position === 'full' ? 'h-full w-full' :
                            Props.position === 'center' ? 'w-full h-[60%] mx-auto rounded-t-3xl' :
                                'w-full rounded-t-3xl'
                            } ${Props.className}`}>
                        {/* Modal bar */}
                        {Props.position !== 'full' && Props.bar && <View className='absolute top-2 left-1/2 flex justify-center items-center'>
                            <View style={{
                                backgroundColor: theme.pillSelectedBg,
                                borderRadius: 8,
                                width: 58,
                                height: 8
                            }} />
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
    bar?: boolean
    blur?: boolean
    position?: 'bottom' | 'center' | 'full'
}

export default CustomModal