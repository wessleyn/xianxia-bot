import { supportedLanguages } from '@//constants/supportedLanguages';
import { Theme } from '@constants/inAppSettings';
import { UpdateType } from '@constants/types';
import { useAccountStore } from '@stores/account';
import { useSettingsStore } from '@stores/settings';
import { pullSettings } from '@utils/pullSettings';
import { pushSettings } from '@utils/pushSettings';
import * as FileSystem from 'expo-file-system';
import { useColorScheme } from 'nativewind';
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, Switch, Text, View } from "react-native";

const SettingsSection = () => {
    const { isLoggedIn, user } = useAccountStore();
    const {
        theme, setTheme,
        language, setLanguage,
        autoSync, setAutoSync,
        downloadWifiOnly, setDownloadWifiOnly,
        enableNotifications, setEnableNotifications,
        showSuggestions, setShowSuggestions,
        autoCheckUpdates, setAutoCheckUpdates,
        autoBackup, setAutoBackup,
        updateFrom, setUpdateFrom,
        downloadPath, setDownloadPath
    } = useSettingsStore();

    const { colorScheme, setColorScheme } = useColorScheme();
    const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
    const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
    const [isUpdateFromMenuOpen, setIsUpdateFromMenuOpen] = useState(false);
    const [isSyncing, setIsSyncing] = useState(false);

    const isDark = theme === 'dark' || (theme === 'system' && colorScheme === 'dark');

    const handlePullSettings = async () => {
        if (!user?.id) return;
        try {
            setIsSyncing(true);
            const serverSettings = await pullSettings(user.id);
            if (serverSettings) {
                setTheme(serverSettings.theme as Theme);
                setLanguage(serverSettings.language);
                setAutoSync(serverSettings.autoSync);
                setAutoCheckUpdates(serverSettings.autoCheckUpdates);

                if (serverSettings.theme === 'system') {
                    setColorScheme('system');
                } else {
                    setColorScheme(serverSettings.theme as 'light' | 'dark');
                }

                Alert.alert("Settings Synced", "Settings pulled from server successfully.");
            } else {
                Alert.alert("No Settings Found", "No settings found on the server.");
            }
        } catch (error) {
            console.error(error);
            Alert.alert("Sync Failed", "Failed to pull settings from the server.");
        } finally {
            setIsSyncing(false);
        }
    };

    const handlePushSettings = async () => {
        if (!user?.id) return;
        try {
            setIsSyncing(true);
            await pushSettings(user.id);
            Alert.alert("Settings Synced", "Settings pushed to the server successfully.");
        } catch (error) {
            console.error(error);
            Alert.alert("Sync Failed", "Failed to push settings to the server.");
        } finally {
            setIsSyncing(false);
        }
    };

    const toggleUpdateFrom = (val: UpdateType) => setUpdateFrom(val);

    const selectDownloadFolder = async () => {
        try {
            Alert.alert(
                "Select Download Location",
                "This should open a folder picker",
                [
                    {
                        text: "Use Default",
                        onPress: () => {
                            const defaultPath = FileSystem.documentDirectory + 'Downloads';
                            setDownloadPath(defaultPath);
                        },
                    },
                    { text: "Cancel", style: "cancel" }
                ]
            );
        } catch (error) {
            console.error(error);
        }
    };

    const createBackup = () => {
        Alert.alert(
            "Create Backup",
            "Creating backup...",
            [
                {
                    text: "OK",
                    onPress: () => {
                        setTimeout(() => {
                            Alert.alert("Backup Created", "Your data has been successfully backed up.");
                        }, 1000);
                    }
                }
            ]
        );
    };

    // Switch colors
    const switchTrackFalse = isDark ? '#4b5563' : '#767577';
    const switchTrackTrue = '#81b0ff';
    const thumbFalse = isDark ? '#374151' : '#f4f3f4';
    const thumbTrue = '#4287f5';

    const getSelectedLanguageName = () => {
        const selectedLang = supportedLanguages.find(lang => lang.code === language);
        return selectedLang ? selectedLang.name : 'English';
    };

    return (
        <View className="flex-1 px-4 py-6">
            {/* Header */}
            <View className='flex-row justify-between'>
                <Text className='text-2xl font-bold text-gray-500 dark:text-gray-200 mb-4'>Settings</Text>
                {isLoggedIn && (
                    <View className='flex-row h-10 space-x-2'>
                        <Pressable
                            onPress={handlePullSettings}
                            disabled={isSyncing}
                            className={`px-4 py-2 rounded-md flex-row items-center justify-center ${isSyncing ? 'bg-gray-300 dark:bg-gray-700' : 'bg-blue-500 active:bg-blue-600'}`}
                        >
                            {isSyncing ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-white font-medium">Pull</Text>}
                        </Pressable>
                        <Pressable
                            onPress={handlePushSettings}
                            disabled={isSyncing}
                            className={`px-4 py-2 rounded-md flex-row items-center justify-center ${isSyncing ? 'bg-gray-300 dark:bg-gray-700' : 'bg-indigo-500 active:bg-indigo-600'}`}
                        >
                            {isSyncing ? <ActivityIndicator size="small" color="#fff" /> : <Text className="text-white font-medium">Push</Text>}
                        </Pressable>
                    </View>
                )}
            </View>

            {/* General */}
            <Text className="text-lg font-semibold text-gray-600 dark:text-gray-200 mb-2">General</Text>

            <View className='w-full flex-row justify-between items-center py-3'>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Auto Sync</Text>
                <Switch
                    trackColor={{ false: switchTrackFalse, true: switchTrackTrue }}
                    thumbColor={autoSync ? thumbTrue : thumbFalse}
                    value={autoSync}
                    onValueChange={() => setAutoSync(!autoSync)}
                />
            </View>

            {/* Theme Selector */}
            <Pressable className='w-full flex-row justify-between items-center py-3' onPress={() => setIsThemeMenuOpen(!isThemeMenuOpen)}>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Theme</Text>
                <Text className="text-gray-500 dark:text-gray-300">{theme.charAt(0).toUpperCase() + theme.slice(1)}</Text>
            </Pressable>
            {isThemeMenuOpen && (
                <View className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 mb-2">
                    {['light', 'dark', 'system'].map(option => (
                        <Pressable
                            key={option}
                            className={`py-3 px-2 rounded-md mb-1 ${theme === option ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                            onPress={() => {
                                setTheme(option as Theme);
                                if (option === 'system') setColorScheme('system');
                                else setColorScheme(option as 'light' | 'dark');
                                setIsThemeMenuOpen(false);
                            }}
                        >
                            <Text className={`${theme === option ? 'text-blue-600 dark:text-blue-300 font-medium' : 'text-gray-800 dark:text-gray-200'}`}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            )}

            {/* Language Selector */}
            <Pressable className='w-full flex-row justify-between items-center py-3' onPress={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Language</Text>
                <Text className="text-gray-500 dark:text-gray-300">{getSelectedLanguageName()}</Text>
            </Pressable>
            {isLanguageMenuOpen && (
                <View className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 mb-2">
                    {supportedLanguages.map(lang => (
                        <Pressable
                            key={lang.code}
                            className={`py-3 px-2 rounded-md mb-1 ${language === lang.code ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                            onPress={() => {
                                setLanguage(lang.code);
                                setIsLanguageMenuOpen(false);
                            }}
                        >
                            <Text className={`${language === lang.code ? 'text-blue-600 dark:text-blue-300 font-medium' : 'text-gray-800 dark:text-gray-200'}`}>
                                {lang.name}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            )}

            {/* Download Settings */}
            <Text className="text-lg font-semibold text-gray-600 dark:text-gray-200 mt-6 mb-2">Download Settings</Text>

            <View className='w-full flex-row justify-between items-center py-3'>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Download over WiFi only</Text>
                <Switch
                    trackColor={{ false: switchTrackFalse, true: switchTrackTrue }}
                    thumbColor={downloadWifiOnly ? thumbTrue : thumbFalse}
                    value={downloadWifiOnly}
                    onValueChange={() => setDownloadWifiOnly(!downloadWifiOnly)}
                />
            </View>

            <Pressable className='w-full flex-row justify-between items-center py-3' onPress={selectDownloadFolder}>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Download Folder</Text>
                <Text className="text-gray-500 dark:text-gray-300">Change</Text>
            </Pressable>

            {/* Notifications & Suggestions */}
            <Text className="text-lg font-semibold text-gray-600 dark:text-gray-200 mt-6 mb-2">Notifications & Suggestions</Text>

            <View className='w-full flex-row justify-between items-center py-3'>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Enable Notifications</Text>
                <Switch
                    trackColor={{ false: switchTrackFalse, true: switchTrackTrue }}
                    thumbColor={enableNotifications ? thumbTrue : thumbFalse}
                    value={enableNotifications}
                    onValueChange={() => setEnableNotifications(!enableNotifications)}
                />
            </View>

            <View className='w-full flex-row justify-between items-center py-3'>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Show Suggestions</Text>
                <Switch
                    trackColor={{ false: switchTrackFalse, true: switchTrackTrue }}
                    thumbColor={showSuggestions ? thumbTrue : thumbFalse}
                    value={showSuggestions}
                    onValueChange={() => setShowSuggestions(!showSuggestions)}
                />
            </View>

            {/* Updates & Backup */}
            <Text className="text-lg font-semibold text-gray-600 dark:text-gray-200 mt-6 mb-2">Updates & Backup</Text>

            <View className='w-full flex-row justify-between items-center py-3'>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Auto Check Updates</Text>
                <Switch
                    trackColor={{ false: switchTrackFalse, true: switchTrackTrue }}
                    thumbColor={autoCheckUpdates ? thumbTrue : thumbFalse}
                    value={autoCheckUpdates}
                    onValueChange={() => setAutoCheckUpdates(!autoCheckUpdates)}
                />
            </View>

            <Pressable className='w-full flex-row justify-between items-center py-3' onPress={() => setIsUpdateFromMenuOpen(!isUpdateFromMenuOpen)}>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Update From</Text>
                <Text className="text-gray-500 dark:text-gray-300">{updateFrom}</Text>
            </Pressable>
            {isUpdateFromMenuOpen && (
                <View className="bg-gray-100 dark:bg-gray-800 rounded-md p-2 mb-2">
                    {['Readings', 'Favourites', 'Library'].map(option => (
                        <Pressable key={option} className={`py-3 px-2 rounded-md mb-1 ${updateFrom === option ? 'bg-blue-100 dark:bg-blue-900' : ''}`} onPress={() => { toggleUpdateFrom(option as UpdateType); setIsUpdateFromMenuOpen(false); }}>
                            <Text className={updateFrom === option ? 'text-blue-600 dark:text-blue-300 font-medium' : 'text-gray-600 dark:text-gray-200'}>
                                {option}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            )}

            <View className='w-full flex-row justify-between items-center py-3'>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Auto Backup</Text>
                <Switch
                    trackColor={{ false: switchTrackFalse, true: switchTrackTrue }}
                    thumbColor={autoBackup ? thumbTrue : thumbFalse}
                    value={autoBackup}
                    onValueChange={() => setAutoBackup(!autoBackup)}
                />
            </View>

            <Pressable className='w-full flex-row justify-between items-center py-3 mb-6' onPress={createBackup}>
                <Text className="text-lg text-gray-800 dark:text-gray-100">Create Backup</Text>
                <Text className="text-blue-500 dark:text-blue-300">Backup Now</Text>
            </Pressable>
        </View>
    );
};

export default SettingsSection;
