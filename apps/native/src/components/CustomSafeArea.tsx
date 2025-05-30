import React, { ReactNode } from "react"
import { SafeAreaView, SafeAreaViewProps } from "react-native-safe-area-context"

const CustomSafeArea = ({children, ...props}: {children: ReactNode} & SafeAreaViewProps) => {
  return (
      <SafeAreaView  {...props} className={"bg-white shadow " + props.className}>
      {children}
    </SafeAreaView>
  )
}

export default CustomSafeArea