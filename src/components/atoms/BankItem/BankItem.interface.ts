import {ColorValue, ImageSourcePropType} from 'react-native';

interface IDashboardItem {
  colors: string[];
  title: string;
  buyValue?: string;
  sellValue?: string;
  image: ImageSourcePropType;
  textColor?: ColorValue;

}

export default IDashboardItem;
