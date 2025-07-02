import styled from 'styled-components/native';
import { vs, wp} from '../utils/size';
import CustomText from './CustomText';
import {colors} from '../utils/colors';

interface CustomButtonProps {
  text: string;
  borderRadius?: number;
  onPress: () => void;
  textColor?: string;
  disabled?: boolean;
  marginTop?: string;
  marginBottom?: string;
}

const CustomButton = ({
  text,
  borderRadius = 4,
  onPress,
  textColor = colors.text.lighter,
  disabled = false
}: CustomButtonProps) => {
  return (
    <ButtonContainer borderRadius={borderRadius} onPress={onPress} disabled={disabled}>
      <CustomText text={text} color={textColor} fontSize={14}></CustomText>
    </ButtonContainer>
  );
};

export default CustomButton;

const ButtonContainer = styled.Pressable<{borderRadius: number}>`
  background-color: ${colors.button.main};
  border-radius: ${({borderRadius}) => vs(borderRadius)}px;
  padding: ${wp('1%')}px ${wp('4%')}px;
  width: '100%';
  justify-content: center;
  align-items: center;
  opacity: ${({disabled}) => disabled ? 0.5 : 1};
  margin-bottom: ${wp('3%')};
`;
