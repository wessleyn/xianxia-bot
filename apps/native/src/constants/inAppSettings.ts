export const inAppSettings = [
    "autoSync",
    "theme",
    "language",
    "downloadWifiOnly",
    "enableNotifications",
    "showSuggestions",
    "autoCheckUpdates",
    "autoBackup",
    "downloadPath",
];
 
// Settings that should be synced with the server
export const SYNCED_SETTINGS = {
    theme: 'theme',
    language: 'language',
    autoSync: 'autoSync',
    autoUpdates: 'autoCheckUpdates'
};

export type Theme = 'light' | 'dark' | 'system';
 