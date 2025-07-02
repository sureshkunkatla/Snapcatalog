import FileViewer from 'react-native-file-viewer';
import {Alert, Platform} from 'react-native';
import RNFetchBlob from 'react-native-blob-util';

export const openPDF = async (filePath: string) => {
  try {
    // On Android, ensure the file exists before opening
    if (Platform.OS === 'android') {
      const exists = await RNFetchBlob.fs.exists(filePath);
      if (!exists) {
        Alert.alert(
          'File not found',
          'The generated PDF could not be located.',
        );
        return;
      }
    }

    await FileViewer.open(filePath, {
      displayName: 'ImagesGrid.pdf',
      type: 'application/pdf', // VERY important
      showOpenWithDialog: true,
    });
  } catch (error) {
    console.error('Error opening file:', error);
    Alert.alert('Unable to open PDF', 'There was a problem opening the file.');
  }
};
