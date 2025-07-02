import React from 'react';
import styled from 'styled-components/native';
import {ViewStyle} from 'react-native';
import {colors} from '../utils/colors';
import CustomText from './CustomText';
import {wp, hp, ms} from '../utils/size';
import {Pressable} from 'react-native';
import LeftArrowIcon from 'react-native-vector-icons/FontAwesome6';

interface CustomHeaderProps {
  title: string;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  containerStyle?: ViewStyle;
  showDivider?: boolean;
}

const CustomHeader = ({
  title,
  onBackPress,
  rightComponent,
  containerStyle,
  showDivider = true,
}: CustomHeaderProps) => {
  return (
    <>
      <HeaderContainer style={containerStyle}>
        {onBackPress ? (
          <Pressable onPress={onBackPress}>
            <LeftArrowIcon name="arrow-left" size={ms(20)} color={colors.text.lighter} />
          </Pressable>
        ) : (
          <Placeholder />
        )}

        <TitleContainer>
          <CustomText
            text={title}
            fontSize={18}
            fontWeight={700}
            color={colors.text.lighter}
          />
        </TitleContainer>

        {rightComponent ? rightComponent : <Placeholder />}
      </HeaderContainer>

      {showDivider && <Divider />}
    </>
  );
};

export default CustomHeader;

const HeaderContainer = styled.View`
  padding: ${hp('1%')}px ${wp('5%')}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.background.main};
`;

const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
`;

const Placeholder = styled.View`
  width: ${ms(24)}px;
`;

const Divider = styled.View`
  height: 1px;
  margin: 0 ${wp('5%')}px;
`;
