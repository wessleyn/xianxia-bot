import HeaderBar from '@components/HeaderBar';
import initializeDatabase from '@constants/database';
import { bottomNavTabs } from '@constants/tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Tabs } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { createTheme } from '../../constants/themes';

export default function TabLayout() {
  const db = useSQLiteContext();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (!hasLaunched) {
        await initializeDatabase(db);
        await AsyncStorage.setItem('hasLaunched', 'true');
      }
    };

    checkFirstLaunch();
  }, []);

  const isDark = colorScheme === 'dark';
  const { primaryBgColor, textColor, mutedColor, badgeBg } = createTheme(isDark);

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: badgeBg,
        tabBarInactiveTintColor: mutedColor,
        borderTopWidth: 0,
        elevation: 5,
        tabBarStyle: {
          paddingTop: 10,
          paddingBottom: 10,
          height: 70,
          backgroundColor: primaryBgColor,
          borderTopWidth: 0,
        },
        headerStyle: { backgroundColor: primaryBgColor },
        headerTitleStyle: { color: textColor },
        header: () => {
          return route.name.includes('account') ? null : (
            <HeaderBar tabName={route.name} />
          );
        },
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
