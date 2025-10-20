import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface SettingsStoreType {
    theme: 'light' | 'dark' | 'system';
    language: string;
    autoSync: boolean;
    downloadWifiOnly: boolean;
    enableNotifications: boolean;
    showSuggestions: boolean;
    autoCheckUpdates: boolean;
    autoBackup: boolean;
    updateFrom: 'Readings' | 'Favourites' | 'Library';
    downloadPath: string;

    setTheme: (value: 'light' | 'dark' | 'system') => void;
    setLanguage: (value: string) => void;
    setAutoSync: (value: boolean) => void;
    setDownloadWifiOnly: (value: boolean) => void;
    setEnableNotifications: (value: boolean) => void;
    setShowSuggestions: (value: boolean) => void;
    setAutoCheckUpdates: (value: boolean) => void;
    setAutoBackup: (value: boolean) => void;
    setUpdateFrom: (value: 'Readings' | 'Favourites' | 'Library') => void;
    setDownloadPath: (value: string) => void;
}

export const useSettingsStore = create<SettingsStoreType>()(
    persist(
        (set) => ({
            theme: 'system',
            language: 'en',
            autoSync: false,
            downloadWifiOnly: true,
            enableNotifications: true,
            showSuggestions: true,
            autoCheckUpdates: true,
            autoBackup: false,
            updateFrom: 'Readings',
            downloadPath: '',
            setTheme: (theme) => set({ theme }),
            setLanguage: (language) => set({ language }),
            setAutoSync: (autoSync) => set({ autoSync }),
            setDownloadWifiOnly: (downloadWifiOnly) => set({ downloadWifiOnly }),
            setEnableNotifications: (enableNotifications) => set({ enableNotifications }),
            setShowSuggestions: (showSuggestions) => set({ showSuggestions }),
            setAutoCheckUpdates: (autoCheckUpdates) => set({ autoCheckUpdates }),
            setAutoBackup: (autoBackup) => set({ autoBackup }),
            setUpdateFrom: (updateFrom) => set({ updateFrom }),
            setDownloadPath: (downloadPath) => set({ downloadPath }),
        }),
        {
            name: 'app-settings',
            storage: createJSONStorage(() => AsyncStorage)
        }
    )
);
