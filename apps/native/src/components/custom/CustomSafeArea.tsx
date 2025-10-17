import React from "react"
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context"

const CustomSafeArea = ({children, ...props}: SafeAreaViewProps) => {
  return (
      <SafeAreaView  {...props} className={"bg-white dark:bg-black " + props.className}>
      {children}
    </SafeAreaView>
  )
}

export default CustomSafeArea