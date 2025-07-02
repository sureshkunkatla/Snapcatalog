import React from 'react';
import {
  Modal,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import styled from 'styled-components/native';
import CustomHeader from './CustomHeader';
import {colors} from '../utils/colors';
import {getShadowStyle} from '../utils/shadow';
import CloseIcon from 'react-native-vector-icons/AntDesign';
import { ms } from '../utils/size';

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  dismissOnBackdropPress?: boolean;
  transparent?: boolean;
  modalTitle: string;
}

const CustomModal = ({
  visible,
  onClose,
  children,
  dismissOnBackdropPress = true,
  transparent = true,
  modalTitle,
}: CustomModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent={transparent}
      animationType="fade"
      onRequestClose={onClose}
      statusBarTranslucent>
      <TouchableWithoutFeedback
        onPress={dismissOnBackdropPress ? onClose : undefined}>
        <Backdrop>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <InnerModalContent>
              <CustomHeader title={modalTitle} />
              <ContentContainer>{children}</ContentContainer>
              <CloseIconContainer onPress={onClose}>
                <CloseIcon name="close" size={ms(15)} color={colors.text.dark}/>
              </CloseIconContainer>
            </InnerModalContent>
          </TouchableWithoutFeedback>
        </Backdrop>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CustomModal;

const CloseIconContainer = styled.Pressable`
  background-color: rgba(255,255,255,0.5);
  height: 20px;
  width: 20px;
  position: absolute;
  top: -10px;
  right: -10px;
  border-radius: ${ms(20)}px;
  justify-content: center;
  align-items: center;

`

const InnerModalContent = styled.View.attrs(getShadowStyle)`
  background-color: white;
  border-radius: ${ms(12)}px;
  width: 80%;
  max-height: 80%;
`;

const Backdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

const ContentContainer = styled.View`
  width: 100%;
  padding: ${ms(20)}px;
`;
