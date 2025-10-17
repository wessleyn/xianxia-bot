import { View, ViewProps } from 'react-native'

const CustomView = ({children, ...props}: ViewProps) => {
  return (
      <View {...props} className={'flex-1 bg-white dark:bg-black text-slate-800' + props.className}>
          {children}
    </View>
  )
}

export default CustomView