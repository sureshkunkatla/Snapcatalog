import RNBlobUtil from 'react-native-blob-util';
import { formatDateTime } from './formatDateTime';

export const getPdfFileInfo = async (filePath: string) => {
  try {
    const stat = await RNBlobUtil.fs.stat(filePath);
    return {
      fileName: stat.filename,
      createdAt: formatDateTime(stat.lastModified),
      path: stat.path,        
      size: stat.size,
    };
  } catch (err) {
    console.error('Error getting file info:', err);
    return null;
  }
};
