import ImagePicker from 'react-native-image-crop-picker';

export const pickMultipleImages = async (): Promise<string[]> => {
  try {
    const images = await ImagePicker.openPicker({
      multiple: true,
      mediaType: 'photo',
      compressImageQuality: 0.8,
      cropping: false,
      maxFiles: 10
    });

    return images.map(img => img.path);
  } catch (error) {
    console.warn('Image picking failed or cancelled', error);
    return [];
  }
};
