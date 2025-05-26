import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { DEFAULT_SETTINGS, localSettings } from "../constants/storage";
import { ExtensionSettings, ReadingTheme } from "../ctypes";

export const useSettingsStore = () => {
    const [settings, setSettings] = useState<ExtensionSettings>(DEFAULT_SETTINGS);
    const { theme: UITheme, setTheme: setUITheme } = useTheme();

    useEffect(() => {
        const loadSettings = async () => {
            const storedSettings = await localSettings.getValue();
            if (storedSettings) {
                setSettings(storedSettings);
            }
        };

        const unwatch = localSettings.watch((newSettings) => {
            if (newSettings) {
                setSettings(newSettings);
            }
        });

        loadSettings();

        return () => {
            unwatch();
        };
    }, []);

    const setTheme = (theme: ReadingTheme) => {
        const newSettings = { ...settings, theme };
        setSettings(newSettings);
        localSettings.setValue(newSettings);
        setUITheme(theme);
    };

    const resetSettings = () => {
        setSettings(DEFAULT_SETTINGS);
        localSettings.setValue(DEFAULT_SETTINGS);
        localStorage.clear();
    };

        const toggleAutoSync = () => {
            const autoSync = !settings.autoSync;
            const newSettings = { ...settings, autoSync };
            setSettings(newSettings);
            localSettings.setValue(newSettings);
        };

        const toggleReadingProgress = () => {
            const readingProgress = !settings.readingProgress;
            const newSettings = { ...settings, readingProgress };
            setSettings(newSettings);
            localSettings.setValue(newSettings);
        };

    return {
        theme: UITheme || DEFAULT_SETTINGS.theme,
        setTheme,
        resetSettings,
        toggleAutoSync,
        toggleReadingProgress,
        autoSync: settings.autoSync,
        readingProgress: settings.readingProgress
    };
};