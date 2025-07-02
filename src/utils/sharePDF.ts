import Share from 'react-native-share';
import { Platform } from 'react-native';

export const sharePDF = async (filePath: string) => {
  try {
    const shareOptions = {
      title: 'Share PDF',
      url: Platform.OS === 'android' ? `file://${filePath}` : filePath,
      type: 'application/pdf',
    };

    await Share.open(shareOptions);
  } catch (error) {
    console.error('Error sharing PDF:', error);
  }
};
