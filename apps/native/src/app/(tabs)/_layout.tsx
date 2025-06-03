import HeaderBar from '@components/HeaderBar';
import tabs from '@constants/tabs';
import { Tabs } from 'expo-router';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#6366f1',
        header: () => {
          // Don't show header for account tab
          return route.name.includes('account') ? null : <HeaderBar />
        },
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 10,
          height: 70
        }
      })}
    >
      <Tabs.Screen
        name={'index'}
        options={{
        href: null, // Prevents the index tab from being displayed in the tab bar
        }}
      />
      {tabs.map(({ name, icon: Icon, title }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: title,
            tabBarIcon: ({ color, size }) => <Icon color={color} size={size} />,
          }}
        />
      ))}
    </Tabs>
  );
}
