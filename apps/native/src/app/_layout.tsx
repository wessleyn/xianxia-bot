import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAccountStore } from '@stores/account';
import '@styles/global.css';
import { supabase } from '@utils/supabase';
import * as Font from 'expo-font';
import { Stack } from "expo-router";
import * as SplashScreen from 'expo-splash-screen';
import { SQLiteProvider } from 'expo-sqlite';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import 'react-native-url-polyfill/auto';

import { StatusBar } from 'expo-status-bar';
import { useColorScheme as useTheme } from 'react-native';
import { createTheme } from '../constants/themes';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { setSession } = useAccountStore();
  const [appLoaded, setAppLoaded] = useState(false);
  const { setColorScheme } = useColorScheme();
  const theme = useTheme();

  useEffect(() => {
    async function loadApp() {
      await Font.loadAsync({
        'Verdana': require('./../../assets/fonts/Verdana/Verdana.ttf'),
        'Verdana-Bold': require('./../../assets/fonts/Verdana/Verdana-Bold.ttf'),
        'Verdana-Italic': require('./../../assets/fonts/Verdana/Verdana-Italic.ttf'),
        'Verdana-BoldItalic': require('./../../assets/fonts/Verdana/Verdana-BoldItalic.ttf'),
      });

      const theme = await AsyncStorage.getItem('theme')
      if (theme) {
        setColorScheme(theme as 'light' | 'dark' | 'system')
      }
    }

    loadApp().then(() => setAppLoaded(true));

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => { 
    if (appLoaded) {
      SplashScreen.hideAsync();
    }
  },[appLoaded])

  if (!appLoaded) {
    return null;
  }

  const isDark = theme === 'dark';
  const { secondaryBgColor } = createTheme(isDark);

  return (
    <GestureHandlerRootView>
      <SQLiteProvider databaseName='xianxu.db'>
        <SafeAreaProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='(tabs)' />
            <Stack.Screen name='(screens)' />

          </Stack>
          <Toast />
          <StatusBar
            backgroundColor={secondaryBgColor}
            style={isDark ? 'light' : 'dark'} />
        </SafeAreaProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  )
}
