import { supportedLanguages } from '@//constants/supportedLanguages';
import { inAppSettings, Theme } from '@constants/inAppSettings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAccountStore } from '@stores/account';
import { pullSettings } from '@utils/pullSettings';
import { pushSettings } from '@utils/pushSettings';
import * as FileSystem from 'expo-file-system';
import { useColorScheme } from 'nativewind';
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, ScrollView, Switch, Text, View } from "react-native";


const SettingsSection = () => {
    const { isLoggedIn, user } = useAccountStore()
    const { colorScheme, setColorScheme } = useColorScheme();
    const [isAutoSync, setIsAutoSync] = useState(false);
    const [theme, setTheme] = useState<Theme>('system');
    const [language, setLanguage] = useState('en');
    const [downloadWifiOnly, setDownloadWifiOnly] = useState(true);
    const [enableNotifications, setEnableNotifications] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(true);
    const [autoCheckUpdates, setAutoCheckUpdates] = useState(true);
    const [autoBackup, setAutoBackup] = useState(false);
    const [downloadPath, setDownloadPath] = useState('');
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    const handlePullSettings = async () => {
        if (!user?.id) return;
console.log("pulling")
        try {
            setIsSyncing(true);
            const serverSettings = await pullSettings(user.id);

            // Update local state with server settings
            if (serverSettings !== null) {
                setTheme(serverSettings.theme as Theme);
                setLanguage(serverSettings.language);
                setIsAutoSync(serverSettings.autoSync);
                setAutoCheckUpdates(serverSettings.autoCheckUpdates);

                // Apply theme
                if (serverSettings.theme === 'system') {
                    setColorScheme('system');
                } else {
                    setColorScheme(serverSettings.theme as 'light' | 'dark');
                }

                Alert.alert(
                    "Settings Synced",
                    "Settings have been pulled from the server successfully."
                );
            } else {
                Alert.alert(
                    "No Settings Found",
                    "No settings found on the server. Please push your local settings first."
                );
                return;
            }
        } catch (error) {
            console.error("Error pulling settings:", error);
            Alert.alert(
                "Sync Failed",
                "Failed to pull settings from the server. Please try again."
            );
        } finally {
            setIsSyncing(false);
        }
    };

    const handlePushSettings = async () => {
        if (!user?.id) return;

        try {
            setIsSyncing(true);
            await pushSettings(user.id);
            Alert.alert(
                "Settings Synced",
                "Settings have been pushed to the server successfully."
            );
        } catch (error) {
            console.error("Error pushing settings:", error);
            Alert.alert(
                "Sync Failed",
                "Failed to push settings to the server. Please try again."
            );
        } finally {
            setIsSyncing(false);
        }
    };

    const toggleSync = async () => {
        setIsAutoSync(prev => !prev);
        await AsyncStorage.setItem('autoSync', JSON.stringify(!isAutoSync));
    };

    const selectTheme = async (selectedTheme: Theme) => {
        setTheme(selectedTheme);
        await AsyncStorage.setItem('theme', selectedTheme);

        // Apply the theme to the app
        if (selectedTheme === 'system') {
            setColorScheme('system');
        } else {
            setColorScheme(selectedTheme);
        }

        setIsThemeMenuOpen(false);
    };

    const selectLanguage = async (langCode: string) => {
        setLanguage(langCode);
        await AsyncStorage.setItem('language', langCode);
        setIsLanguageMenuOpen(false);
    };

    const getSelectedLanguageName = () => {
        const selectedLang = supportedLanguages.find(lang => lang.code === language);
        return selectedLang ? selectedLang.name : 'English';
    };

    const toggleDownloadWifiOnly = async () => {
        setDownloadWifiOnly(prev => !prev);
        await AsyncStorage.setItem('downloadWifiOnly', JSON.stringify(!downloadWifiOnly));
    };

    const toggleNotifications = async () => {
        setEnableNotifications(prev => !prev);
        await AsyncStorage.setItem('enableNotifications', JSON.stringify(!enableNotifications));
    };

    const toggleSuggestions = async () => {
        setShowSuggestions(prev => !prev);
        await AsyncStorage.setItem('showSuggestions', JSON.stringify(!showSuggestions));
    };

    const toggleAutoCheckUpdates = async () => {
        setAutoCheckUpdates(prev => !prev);
        await AsyncStorage.setItem('autoCheckUpdates', JSON.stringify(!autoCheckUpdates));
    };

    const toggleAutoBackup = async () => {
        setAutoBackup(prev => !prev);
        await AsyncStorage.setItem('autoBackup', JSON.stringify(!autoBackup));
    };

    // TODO: Implement folder picker
    const selectDownloadFolder = async () => {
        try {
            Alert.alert(
                "Select Download Location",
                "This should open a folder picker ",
                [
                    {
                        text: "Use Default",
                        onPress: async () => {
                            const defaultPath = FileSystem.documentDirectory + 'Downloads';
                            setDownloadPath(defaultPath);
                            await AsyncStorage.setItem('downloadPath', defaultPath);
                        }
                    },
                    {
                        text: "Cancel",
                        style: "cancel"
                    }
                ]
            );
        } catch (error) {
            console.error("Error selecting download folder:", error);
        }
    };



    // TODO: Implement data backup logic
    const createBackup = () => {
        Alert.alert(
            "Create Backup",
            "Creating backup...",
            [
                {
                    text: "OK",
                    onPress: () => {
                        setTimeout(() => {
                            Alert.alert(
                                "Backup Created",
                                "Your data has been successfully backed up."
                            );
                        }, 1000);
                    }
                }
            ]
        );
    };

    useEffect(() => {
        const loadSettings = async (setting: string) => {
            const value = await AsyncStorage.getItem(setting);
            if (value !== null) {
                switch (setting) {
                    case "autoSync":
                        setIsAutoSync(JSON.parse(value));
                        break;
                    case "theme":
                        setTheme(value as Theme);
                        if (value === 'system') {
                            setColorScheme('system');
                        } else {
                            setColorScheme(value as 'light' | 'dark');
                        }
                        break;
                    case "language":
                        setLanguage(value);
                        break;
                    case "downloadWifiOnly":
                        setDownloadWifiOnly(JSON.parse(value));
                        break;
                    case "enableNotifications":
                        setEnableNotifications(JSON.parse(value));
                        break;
                    case "showSuggestions":
                        setShowSuggestions(JSON.parse(value));
                        break;
                    case "autoCheckUpdates":
                        setAutoCheckUpdates(JSON.parse(value));
                        break;
                    case "autoBackup":
                        setAutoBackup(JSON.parse(value));
                        break;
                    case "downloadPath":
                        setDownloadPath(value);
                        break;
                }
            } else {
                if (setting === 'autoSync') setIsAutoSync(false);
                if (setting === 'theme') setTheme('system');
                if (setting === 'language') setLanguage('en');
                if (setting === 'downloadWifiOnly') setDownloadWifiOnly(true);
                if (setting === 'enableNotifications') setEnableNotifications(true);
                if (setting === 'showSuggestions') setShowSuggestions(true);
                if (setting === 'autoCheckUpdates') setAutoCheckUpdates(true);
                if (setting === 'autoBackup') setAutoBackup(false);
                if (setting === 'downloadPath') setDownloadPath(FileSystem.documentDirectory + 'Downloads');
            }
        };

        inAppSettings.forEach(loadSettings);
    }, []);

    return (
        <ScrollView
            className="w-full px-5 mt-6  h-full"
            showsVerticalScrollIndicator={false}
        >
            <View className='flex-row justify-between'>
                <Text className='text-2xl font-bold text-gray-500 mb-4'>Settings</Text>
                {
                    isLoggedIn && (
                        <View className='flex-row h-10 space-x-2'>
                            {/* Prefer the server changes */}
                            <Pressable
                                onPress={handlePullSettings}
                                disabled={isSyncing}
                                className={`px-4 py-2 rounded-md flex-row items-center justify-center ${isSyncing ? 'bg-gray-300' : 'bg-blue-500 active:bg-blue-600'}`}
                            >
                                {isSyncing ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text className="text-white font-medium">Pull</Text>
                                )}
                            </Pressable>
                            {/* Prefer local changes */}
                            <Pressable
                                onPress={handlePushSettings}
                                disabled={isSyncing}
                                className={`px-4 py-2 rounded-md flex-row items-center justify-center ${isSyncing ? 'bg-gray-300' : 'bg-indigo-500 active:bg-indigo-600'}`}
                            >
                                {isSyncing ? (
                                    <ActivityIndicator size="small" color="#fff" />
                                ) : (
                                    <Text className="text-white font-medium">Push</Text>
                                )}
                            </Pressable>
                        </View>
                    )
                }
            </View>

            {/* Section Header: General */}
            <View className="mb-2">
                <Text className="text-lg font-semibold text-gray-600">General</Text>
            </View>

            {/* Auto Sync Toggle */}
            <View className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'>
                <Text className="text-lg">
                    Auto Sync
                </Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isAutoSync ? '#4287f5' : '#f4f3f4'}
                    value={isAutoSync}
                    onValueChange={toggleSync}
                />
            </View>

            {/* Theme Selector */}
            <Pressable
                className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'
                onPress={() => setIsThemeMenuOpen(!isThemeMenuOpen)}
            >
                <Text className="text-lg">Theme</Text>
                <Text className="text-gray-500">{theme.charAt(0).toUpperCase() + theme.slice(1)}</Text>
            </Pressable>

            {isThemeMenuOpen && (
                <View className="bg-gray-100 rounded-md p-2 mb-2">
                    {['light', 'dark', 'system'].map((themeOption) => (
                        <Pressable
                            key={themeOption}
                            className={`py-3 px-2 rounded-md mb-1 ${theme === themeOption ? 'bg-blue-100' : ''}`}
                            onPress={() => selectTheme(themeOption as Theme)}
                        >
                            <Text className={`${theme === themeOption ? 'text-blue-600 font-medium' : ''}`}>
                                {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            )}

            {/* Language Selector */}
            <Pressable
                className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'
                onPress={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
                <Text className="text-lg">Language</Text>
                <Text className="text-gray-500">{getSelectedLanguageName()}</Text>
            </Pressable>

            {isLanguageMenuOpen && (
                <View className="bg-gray-100 rounded-md p-2 mb-2">
                    {supportedLanguages.map((languageOption) => (
                        <Pressable
                            key={languageOption.code}
                            className={`py-3 px-2 rounded-md mb-1 ${language === languageOption.code ? 'bg-blue-100' : ''}`}
                            onPress={() => selectLanguage(languageOption.code)}
                        >
                            <Text className={`${language === languageOption.code ? 'text-blue-600 font-medium' : ''}`}>
                                {languageOption.name}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            )}

            {/* Section Header: Download Settings */}
            <View className="mt-6 mb-2">
                <Text className="text-lg font-semibold text-gray-600">Download Settings</Text>
            </View>

            {/* Download over WiFi only */}
            <View className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'>
                <Text className="text-lg">Download over WiFi only</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={downloadWifiOnly ? '#4287f5' : '#f4f3f4'}
                    value={downloadWifiOnly}
                    onValueChange={toggleDownloadWifiOnly}
                />
            </View>

            {/* Download Folder */}
            <Pressable
                className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'
                onPress={selectDownloadFolder}
            >
                <Text className="text-lg">Download Folder</Text>
                <Text className="text-gray-500">Change</Text>
            </Pressable>

            {/* Section Header: Notifications & Suggestions */}
            <View className="mt-6 mb-2">
                <Text className="text-lg font-semibold text-gray-600">Notifications & Suggestions</Text>
            </View>

            {/* Enable Notifications */}
            <View className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'>
                <Text className="text-lg">Enable Notifications</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={enableNotifications ? '#4287f5' : '#f4f3f4'}
                    value={enableNotifications}
                    onValueChange={toggleNotifications}
                />
            </View>

            {/* Show Suggestions */}
            <View className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'>
                <Text className="text-lg">Show Suggestions</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={showSuggestions ? '#4287f5' : '#f4f3f4'}
                    value={showSuggestions}
                    onValueChange={toggleSuggestions}
                />
            </View>

            {/* Section Header: Updates & Backup */}
            <View className="mt-6 mb-2">
                <Text className="text-lg font-semibold text-gray-600">Updates & Backup</Text>
            </View>

            {/* Auto Check Updates */}
            <View className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'>
                <Text className="text-lg">Auto Check Updates</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={autoCheckUpdates ? '#4287f5' : '#f4f3f4'}
                    value={autoCheckUpdates}
                    onValueChange={toggleAutoCheckUpdates}
                />
            </View>


            {/* Auto Backup */}
            <View className='w-full flex-row justify-between items-center py-3 border-b border-gray-200'>
                <Text className="text-lg">Auto Backup</Text>
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={autoBackup ? '#4287f5' : '#f4f3f4'}
                    value={autoBackup}
                    onValueChange={toggleAutoBackup}
                />
            </View>

            {/* Create Backup */}
            <Pressable
                className='w-full flex-row justify-between items-center py-3 border-b border-gray-200 mb-6'
                onPress={createBackup}
            >
                <Text className="text-lg">Create Backup</Text>
                <Text className="text-blue-500">Backup Now</Text>
            </Pressable>
        </ScrollView>
    )
}

export default SettingsSection