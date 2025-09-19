import HeaderBar from '@components/HeaderBar';
import initializeDatabase from '@constants/database';
import { bottomNavTabs } from '@constants/tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';

export default function TabLayout() {

  const db = useSQLiteContext()

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (!hasLaunched) {
        console.log('First launch detected, setting up defaults.');
        await initializeDatabase(db);
        await AsyncStorage.setItem('hasLaunched', 'true');
      }
    };

    checkFirstLaunch();
  }, [])

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#6366f1',
        header: () => {
          // Don't show header for account tab
          return route.name.includes('account') ? null : <HeaderBar tabName={route.name} />
        },
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 10,
          height: 70
        }
      })}
    >
      {bottomNavTabs.map(({ name, icon: Icon, title }) => (
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
