import { View, ViewProps, useColorScheme } from 'react-native';
import { createTheme } from '../../constants/themes';

const CustomView = ({ children, ...props }: ViewProps) => {
  const colorScheme = useColorScheme();
  const { secondaryBgColor } = createTheme(colorScheme === 'dark');

  // merge theme background with any provided style prop
  const mergedStyle = [{ backgroundColor: secondaryBgColor }, ...(Array.isArray(props.style) ? props.style : [props.style])];

  return (
    <View {...props} style={mergedStyle} className={`flex-1 ${props.className ?? ''}`}>
      {children}
    </View>
  )
}

export default CustomView