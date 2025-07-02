import styled from 'styled-components/native';
import {hp, ms, vs, wp} from '../utils/size';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import {colors} from '../utils/colors';
import {getShadowStyle} from '../utils/shadow';
import {imageItem} from '../redux/imageSlice';
import Icon from 'react-native-vector-icons/Feather';
import CheckBox from '@react-native-community/checkbox';

interface CustomCardProps {
  item: imageItem;
  onClickAdd: () => void;
  toggleSelection: () => void;
  selectedIds: string[];
  selectionMode: boolean;
  onLongPress: () => void
}

const CustomCard = ({
  item,
  onClickAdd,
  toggleSelection,
  selectedIds,
  selectionMode,
  onLongPress
}: CustomCardProps) => {
  return (
    <ActionContainer onLongPress={onLongPress}>
      <Card>
        <StyledImage source={{uri: item.uri}} />
        <BottomContainer>
          {item?.name?.length > 0 ? (
            <CustomText text={item.name} fontSize={12} />
          ) : (
            <CustomButton text="Add Details" onPress={onClickAdd} />
          )}
        </BottomContainer>
        {item?.name?.length > 0 && !selectionMode && (
          <IconContainer onPress={onClickAdd}>
            <Icon name="edit" size={ms(15)} color={colors.text.lighter} />
          </IconContainer>
        )}
        {selectionMode && (
            <CheckBox
              value={selectedIds.includes(item.id)}
              onValueChange={toggleSelection}
              style={{position: 'absolute', top: wp('2%'), right: wp('2%')}}
            />
        )}
      </Card>
    </ActionContainer>
  );
};

export default CustomCard;

const ActionContainer = styled.Pressable``;

const IconContainer = styled.Pressable`
  height: ${wp('8%')}px;
  width: ${wp('8%')}px;
  border-radius: ${wp('8%')}px;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  background-color: ${colors.transparent.high};
  position: absolute;
  top: ${wp('2%')};
  right: ${wp('2%')};
`;

const Card = styled.View.attrs(getShadowStyle)`
  width: ${wp('40%')}px;
  margin: ${hp('1.25%')}px ${wp('1.25%')}px;
  background-color: ${colors.background.lighter};
  border-radius: ${wp('2%')}px;
  overflow: hidden;
  position: relative;
`;

const BottomContainer = styled.View.attrs(() => ({
  style: {
    minHeight: vs(40),
  },
}))`
  padding: ${hp('1%')}px;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled.Image`
  width: 100%;
  height: ${vs(150)}px;
  object-fit: cover;
`;
