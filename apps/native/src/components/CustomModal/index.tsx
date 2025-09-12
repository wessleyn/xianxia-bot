import { Modal, ModalProps, View } from "react-native"
import ModalBar from "./ModalBar"

const CustomModal = ({ ...Props }: Props) => {
    return (
        <Modal
            visible={Props.visible}
            transparent={true || Props.transparent}
            animationType="slide"
        >
            <View
                className={`modal justify-center relative ${Props.className}`}>
                {Props.modalBar && <ModalBar />}
                {Props.children}
            </View>
        </Modal>
    )
}

interface Props extends ModalProps {
    className?: string
    transparent?: boolean
    modalBar?: boolean
}

export default CustomModal