import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAccountStore } from '@stores/account';
import '@styles/global.css';
import { supabase } from '@utils/supabase';
import * as Font from 'expo-font';
import { Stack } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import 'react-native-url-polyfill/auto';

const RootLayout = () => {
  const { setSession } = useAccountStore();
  const [appLoaded, setAppLoaded] = useState(false);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Verdana': require('./../../assets/fonts/Verdana/Verdana.ttf'),
        'Verdana-Bold': require('./../../assets/fonts/Verdana/Verdana-Bold.ttf'),
        'Verdana-Italic': require('./../../assets/fonts/Verdana/Verdana-Italic.ttf'),
        'Verdana-BoldItalic': require('./../../assets/fonts/Verdana/Verdana-BoldItalic.ttf'),
      });
    }

    async function checkColorTheme() {
      const theme = await AsyncStorage.getItem('theme')
      if (theme) {
        setColorScheme(theme as 'light' | 'dark' | 'system')
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      checkColorTheme();
      loadFonts();
      setSession(session);
      setAppLoaded(true);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!appLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
        </SafeAreaProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
