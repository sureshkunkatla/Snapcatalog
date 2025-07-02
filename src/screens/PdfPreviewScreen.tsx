import CustomHeader from '../components/CustomHeader';
import CustomPdfViewer from '../components/CustomPdfViewer';
import {useNavigation, useRoute} from '@react-navigation/native';
import ShareLib from 'react-native-share';
import {Alert} from 'react-native';
import ForwardIcon from 'react-native-vector-icons/Entypo';
import styled from 'styled-components/native';
import {ms} from '../utils/size';
import {colors} from '../utils/colors';

const PdfPreviewScreen = () => {
  const route = useRoute();
  const {filePath} = route.params as {filePath: string};
  const navigation = useNavigation();

  const onShare = async () => {
    try {
      await ShareLib.open({
        url: `file://${filePath}`,
        type: 'application/pdf',
        failOnCancel: false,
      });
    } catch (error) {
      console.error('Share Error', error);
      Alert.alert('Error', 'Unable to share file');
    }
  };

  return (
    <>
      <CustomHeader
        title={'Preview PDF'}
        onBackPress={() => navigation.pop()}
        rightComponent={
          <PressableContainer onPress={onShare}>
            <ForwardIcon
              name="forward"
              size={ms(20)}
              color={colors.text.lighter}
            />
          </PressableContainer>
        }
      />

      <CustomPdfViewer uri={filePath} />
    </>
  );
};

export default PdfPreviewScreen;

const PressableContainer = styled.Pressable``;
