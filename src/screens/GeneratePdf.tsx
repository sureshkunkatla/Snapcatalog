import CustomButton from '../components/CustomButton';
import {generatePDF} from '../utils/generatePDF';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {Alert} from 'react-native';
import CustomHeader from '../components/CustomHeader';
import {useState} from 'react';
import CustomModal from '../components/CustomModal';
import {openPDF} from '../utils/openPDF';
import {sharePDF} from '../utils/sharePDF';
import styled from 'styled-components/native';
import {hp, ms, wp} from '../utils/size';
import CustomText from '../components/CustomText';
import {colors} from '../utils/colors';
import {updateField} from '../redux/orgDetailsSlice';
import {useNavigation} from '@react-navigation/native';
import {getPdfFileInfo} from '../utils/getPdfInfo';
import PdfIcon from 'react-native-vector-icons/FontAwesome';
import DownloadIcon from 'react-native-vector-icons/Feather';
import ForwardIcon from 'react-native-vector-icons/Entypo';
import RNFS from 'react-native-fs';
import RotatingGear from '../components/RotatingGear';

const GeneratePdf = () => {
  const images = useSelector((state: RootState) => state.images.images);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const orgDetails = useSelector((state: RootState) => state.orgDetails);
  console.log('orgDetails', orgDetails);
  const dispatch = useDispatch<AppDispatch>();

  const navigation = useNavigation();

  const handleGeneratePDF = async () => {
    try {
      setIsLoading(true);
      const path = await generatePDF(images, orgDetails);
      if (path) {
        dispatch(updateField({field: 'filePath', value: path}));
        const info = await getPdfFileInfo(path);
        dispatch(updateField({field: 'fileName', value: info?.fileName}));
        dispatch(updateField({field: 'createdDate', value: info?.createdAt}));
        console.log(info);
        setModalVisible(true);
      } else {
        Alert.alert('Error', 'File not generated.');
      }
    } catch (err) {
      console.error('PDF generation error:', err);
      Alert.alert('Error', 'Failed to generate PDF');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSharePDF = async () => {
    if (orgDetails.filePath) {
      await sharePDF(orgDetails.filePath);
      setModalVisible(false);
    }
  };

  const handleOpenPDF = () => {
    if (modalVisible) {
      setModalVisible(false);
    }
    navigation.navigate('Pdf View', {filePath: orgDetails.filePath});
  };

  const onDownload = async () => {
    try {
      const destPath = `${
        RNFS.DownloadDirectoryPath
      }/MySharedPDF_${Date.now()}.pdf`;

      await RNFS.copyFile(orgDetails.filePath, destPath);
      Alert.alert('Downloaded', `PDF saved to Downloads folder:\n${destPath}`);
    } catch (error) {
      console.error('Download error', error);
      Alert.alert('Error', 'Failed to save PDF');
    }
  };

  return (
    <>
      <CustomHeader title={'Generate PDF'} />
      <ContentContainer>
        <CustomText text={'Organization Name'} fontSize={14} />
        <TextInput
          onChangeText={text =>
            dispatch(updateField({field: 'orgName', value: text}))
          }
          value={orgDetails.orgName}
        />
        <CustomText text={'Address'} fontSize={14} />
        <TextInput
          onChangeText={text =>
            dispatch(updateField({field: 'address', value: text}))
          }
          value={orgDetails.address}
        />
        <CustomText text={'Contact Person'} fontSize={14} />
        <TextInput
          onChangeText={text =>
            dispatch(updateField({field: 'contactName', value: text}))
          }
          value={orgDetails.contactName}
        />
        <CustomText text={'Contact Number'} fontSize={14} />
        <TextInput
          onChangeText={text =>
            dispatch(updateField({field: 'contactNumber', value: text}))
          }
          value={orgDetails.contactNumber}
        />

        <CustomButton text="Generate PDF" onPress={handleGeneratePDF} disabled={
          orgDetails.orgName.length === 0 || orgDetails.address.length === 0 || orgDetails.contactName.length === 0 || orgDetails.contactNumber.length === 0
        }/>
        {orgDetails.filePath.length > 0 && (
          <PdfContainer onPress={handleOpenPDF}>
            <PdfIconContainer>
              <PdfIcon name="file-pdf-o" size={ms(40)} color={'#DF5854'} />
            </PdfIconContainer>
            <PdfNameDateContainer>
              <CustomText text={orgDetails.fileName} fontSize={14} />
              <CustomText text={orgDetails.createdDate} fontSize={12} />
            </PdfNameDateContainer>
            <PdfShareDownloadContainer>
              <PressableContainer onPress={onDownload}>
                <DownloadIcon name="download" size={ms(20)} color={'#DF5854'} />
              </PressableContainer>
              <PressableContainer onPress={handleSharePDF}>
                <ForwardIcon name="forward" size={ms(20)} color={'#DF5854'} />
              </PressableContainer>
            </PdfShareDownloadContainer>
          </PdfContainer>
        )}
      </ContentContainer>
      {isLoading && <RotatingGear />}
      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        modalTitle="PDF Generated">
        <CustomButton text="Share PDF" onPress={handleSharePDF} />
        <CustomButton text="Open PDF" onPress={handleOpenPDF} />
      </CustomModal>
    </>
  );
};

export default GeneratePdf;

const PressableContainer = styled.Pressable``;

const PdfContainer = styled.Pressable`
  padding: ${wp('3%')}px;
  border-width: 1px;
  border-radius: ${wp('2%')}px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const PdfIconContainer = styled.View``;
const PdfNameDateContainer = styled.View`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
`;
const PdfShareDownloadContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding-left: 10px;
  padding-right: 10px;
`;

const ContentContainer = styled.View`
  flex: 1;
  padding: ${wp('5%')}px;
`;

const TextInput = styled.TextInput`
  width: 100%;
  border: 1px solid ${colors.background.main};
  border-radius: ${ms(4)}px;
  margin-bottom: ${hp('2%')};
`;
