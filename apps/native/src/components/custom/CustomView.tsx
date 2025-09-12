import { ReactNode } from 'react'
import { View, ViewProps } from 'react-native'

const CustomView = ({children, ...props}: {children: ReactNode} & ViewProps) => {
  return (
      <View {...props} className={'flex-1 bg-white ' + props.className}>
          {children}
    </View>
  )
}

export default CustomView