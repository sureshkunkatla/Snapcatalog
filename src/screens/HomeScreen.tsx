import {FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../redux/store';
import {useState} from 'react';
import {pickMultipleImages} from '../helpers/pickMultipleImages';
import {
  addImages,
  deleteImages,
  editName,
  imageItem,
} from '../redux/imageSlice';
import {nanoid} from '@reduxjs/toolkit';
import CustomButton from '../components/CustomButton';
import styled from 'styled-components/native';
import {wp, hp, vs, ms} from '../utils/size';
import {colors} from '../utils/colors';
import CustomModal from '../components/CustomModal';
import CustomText from '../components/CustomText';
import CustomHeader from '../components/CustomHeader';
import CustomCard from '../components/CustomCard';
import PlusIcon from 'react-native-vector-icons/AntDesign';
import TrashIcon from 'react-native-vector-icons/FontAwesome6';

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImgItem, setCurrentImgItem] = useState<imageItem | undefined>();
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const dispath = useDispatch<AppDispatch>();
  const tempImages: imageItem[] = useSelector(
    (state: RootState) => state.images.images,
  );

  console.log(selectedIds);

  const handlePickImages = async () => {
    const uris = await pickMultipleImages();
    const newItems = uris.map(uri => ({id: nanoid(), uri, name: ''}));
    dispath(addImages(newItems));
  };

  const updateName = (id: string, name: string) => {
    dispath(editName({id, name}));
    setIsModalOpen(false);
  };

  const onClickAdd = (item: imageItem) => {
    setIsModalOpen(true);
    setCurrentImgItem(item);
  };

  const toggleSelection = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id)
        ? prev.filter(existingId => existingId !== id)
        : [...prev, id],
    );
  };

  const onLongPressItem = () => {
    setSelectionMode(!selectionMode);
    if (!selectionMode) {
      setSelectedIds([]);
    }
  };

  const handleDeleteImages = () => {
    dispath(deleteImages(selectedIds));
    setSelectedIds([]);
    setSelectionMode(false);
  };

  return (
    <>
      <CustomHeader title={'Products List'} />
      <MainContainer>
        <Container>
          <StyledFlatList
            data={tempImages}
            extraData={tempImages}
            keyExtractor={(item: imageItem) => item.id}
            numColumns={2}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            renderItem={({item}: {item: imageItem}) => (
              <CustomCard
                item={item}
                onClickAdd={() => onClickAdd(item)}
                toggleSelection={() => toggleSelection(item.id)}
                selectedIds={selectedIds}
                selectionMode={selectionMode}
                onLongPress={() => onLongPressItem()}
              />
            )}
          />
        </Container>
        <FloatingContainer
          onPress={selectionMode ? handleDeleteImages : handlePickImages}>
          {selectionMode ? (
            <TrashIcon name="trash" size={ms(20)} color={colors.text.lighter} />
          ) : (
            <PlusIcon name="plus" size={ms(20)} color={colors.text.lighter} />
          )}
        </FloatingContainer>

        <CustomModal
          visible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          modalTitle={'Enter Details'}>
          <CustomText text={'Name'} fontSize={14} />
          <TextInput
            onChangeText={text =>
              setCurrentImgItem(prev => {
                if (!prev) return prev;
                return {
                  ...prev,
                  name: text,
                };
              })
            }
            value={currentImgItem?.name}
          />
          <CustomButton
            text="Update"
            onPress={() => updateName(currentImgItem?.id, currentImgItem?.name)}
            disabled={!currentImgItem?.id || !currentImgItem?.name}
          />
        </CustomModal>
      </MainContainer>
    </>
  );
};

export default HomeScreen;

const FloatingContainer = styled.Pressable`
  height: ${hp('6%')}px;
  width: ${hp('6%')}px;
  border-radius: ${hp('6%')}px;
  justify-content: center;
  align-items: center;
  align-self: flex-start;
  background-color: ${colors.button.main};
  position: absolute;
  bottom: ${wp('5%')};
  right: ${wp('5%')};
`;

const TextInput = styled.TextInput`
  width: 100%;
  border: 1px solid ${colors.background.main};
  border-radius: ${ms(4)}px;
  margin-bottom: ${hp('2%')};
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${colors.background.lighter || '#ffffff'};
  padding: ${wp('5%')}px;
`;

const Container = styled.View`
  flex: 1;
`;

const StyledFlatList = styled(FlatList as new () => FlatList<imageItem[]>)`
  flex: 1;
`;
