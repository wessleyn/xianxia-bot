import { SYNCED_SETTINGS } from '@constants/inAppSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '@utils/supabase';

/**
 * Push local settings to the server
 * @param userId The user's ID
 * @returns Promise that resolves when the settings have been pushed
 */
export const pushSettings = async (userId: string): Promise<void> => {
    try {
        const localSettings: Record<string, any> = {};

        // Read settings from AsyncStorage
        for (const setting of Object.values(SYNCED_SETTINGS)) {
            const value = await AsyncStorage.getItem(setting);
            if (value !== null) {
                console.log(`Setting ${setting} = ${value}`);
                console.log('Type of value:', typeof value);
                localSettings[setting] = typeof value !== 'string' ? JSON.parse(value) : value
            }
        }

        console.log('Local settings to push:', localSettings);

        const dbSettings = {
            theme: localSettings[SYNCED_SETTINGS.theme] || 'system',
            language: localSettings[SYNCED_SETTINGS.language] || 'en',
            autoSync: localSettings[SYNCED_SETTINGS.autoSync] || false,
            autoUpdates: localSettings[SYNCED_SETTINGS.autoUpdates] || true
        };

        console.log('Mapped DB settings:', dbSettings);

        const { error } = await supabase
            .from('UserSettings')
            .upsert({
                userId,
                ...dbSettings,
                updatedAt: new Date().toISOString(),
            })
            .eq('userId', userId);

        if (error) throw error;
    } catch (error) {
        console.error('Error pushing settings to server:', error);
        throw error;
    }
};
