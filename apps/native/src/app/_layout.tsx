import { supabase } from '@utils/supabase';
import { useAccountStore } from '@stores/account';
import '@styles/global.css';
import { Slot } from "expo-router";
import { useEffect } from 'react';
import 'react-native-url-polyfill/auto';

const AppLayout = () => {
  const { setSession } = useAccountStore();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed:', event);
      setSession(session);
    });

    // Check current session on load
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <Slot />
  )
}

export default AppLayout
