import { useColorScheme } from "react-native";
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context";
import { createTheme } from "../../constants/themes";

const CustomSafeArea = ({ children, ...props }: SafeAreaViewProps) => {
  const colorScheme = useColorScheme()
  const { secondaryBgColor } = createTheme(colorScheme === 'dark')

  return (
    <SafeAreaView
      {...props}
      style={{
        backgroundColor: secondaryBgColor
      }}
    >
      {children}
    </SafeAreaView>
  )
}

export default CustomSafeArea