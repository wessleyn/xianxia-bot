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
import Toast from 'react-native-toast-message';
import 'react-native-url-polyfill/auto';

const RootLayout = () => {
  const { setSession } = useAccountStore();
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const { setColorScheme } = useColorScheme();

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Verdana': require('./../../assets/fonts/Verdana/Verdana.ttf'),
        'Verdana-Bold': require('./../../assets/fonts/Verdana/Verdana-Bold.ttf'),
        'Verdana-Italic': require('./../../assets/fonts/Verdana/Verdana-Italic.ttf'),
        'Verdana-BoldItalic': require('./../../assets/fonts/Verdana/Verdana-BoldItalic.ttf'),
      });
      setFontsLoaded(true);
    }

     async function checkColorTheme() {
       const theme = await AsyncStorage.getItem('theme')
       console.log('Loaded theme from storage:', theme);
      if (theme) {
        setColorScheme(theme as 'light' | 'dark' | 'system')
      }
    }

    checkColorTheme();
    loadFonts();
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      setSession(session);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider databaseName='xianxu.db'>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='(tabs)' />
          <Stack.Screen name='(screens)' />

        </Stack>
        <Toast />
      </SQLiteProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
