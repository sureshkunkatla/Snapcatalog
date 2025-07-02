import styled from 'styled-components/native';
import { ms } from '../utils/size';
import { colors } from '../utils/colors';
import { getPoppinsFont } from '../utils/getPoppinsFont';

interface CustomTextProps {
  fontSize?: number;
  fontWeight?: number;
  color?: string;
  isItalic?: boolean;
  text: number | string;
  textCenter?: boolean
}

const CustomText = ({color= colors.text.main, isItalic=false, fontSize=16, text, fontWeight=400, textCenter}: CustomTextProps) => {
  return (
    <TextContainer color={color} isItalic={isItalic} fontSize={fontSize} fontWeight={fontWeight} textCenter={textCenter}>
      {text}
    </TextContainer>
  );
};

export default CustomText;

const TextContainer = styled.Text<{
  fontSize: number;
  color: string;
  isItalic: boolean;
  fontWeight: number;
  textCenter?: boolean
}>`
  font-family: '${({fontWeight,isItalic}) => getPoppinsFont(fontWeight, isItalic)}';
  font-size: ${({fontSize}) => ms(fontSize)}px;
  color: ${({color}) => color};
`;
