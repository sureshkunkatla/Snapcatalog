import {Platform, ViewStyle} from 'react-native';

export const getShadowStyle = (): Partial<ViewStyle> =>
  Platform.OS === 'android'
    ? {elevation: 4}
    : {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 4,
      };
