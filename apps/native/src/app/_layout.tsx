import { useAccountStore } from '@stores/account';
import '@styles/global.css';
import { supabase } from '@utils/supabase';
import { Slot } from "expo-router";
import { SQLiteProvider } from 'expo-sqlite';
import { useEffect } from 'react';
import 'react-native-url-polyfill/auto';

const AppLayout = () => {
  const { setSession } = useAccountStore();

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

  return (
    <SQLiteProvider databaseName='xianxu.db'>
      <Slot />
    </SQLiteProvider>
  )
}

export default AppLayout
