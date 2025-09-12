import { SYNCED_SETTINGS } from '@constants/inAppSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@utils/supabase';

/**
 * Pull settings from the server
 * @param userId The user's ID
 * @returns Promise that resolves with the settings pulled
 */
export const pullSettings = async (userId: string): Promise<{
    theme: string;
    language: string;
    autoSync: boolean;
    autoCheckUpdates: boolean;
} | null> => {
    try {
        // Get settings from server
        const { data, error } = await supabase
            .from('UserSettings')
            .select('*')
            .eq('userId', userId)
            .maybeSingle();

        if (error) throw error;

        if (data) {
            // Map database settings to local settings
            await AsyncStorage.setItem(SYNCED_SETTINGS.theme, data.theme || 'system');
            await AsyncStorage.setItem(SYNCED_SETTINGS.language, data.language || 'en');
            await AsyncStorage.setItem(SYNCED_SETTINGS.autoSync, JSON.stringify(data.autoSync || false));
            await AsyncStorage.setItem(SYNCED_SETTINGS.autoUpdates, JSON.stringify(data.autoUpdates || true));

            // Return mapped settings for immediate use in the component
            return {
                theme: data.theme,
                language: data.language || 'en',
                autoSync: data.autoSync || false,
                autoCheckUpdates: data.autoUpdates || true
            };
        }
        return null;
    } catch (error) {
        console.error('Error pulling settings from server:', error);
        throw error;
    }
};
