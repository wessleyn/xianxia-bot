import { storage } from '#imports';
import { ExtensionSettings, LocalSource, PopView } from '../ctypes';

/**
 * Just stores the current view the users sees when he click the popup
 */
export const VIEW_STORAGE_KEY = 'local:currentView'
export const localTabView = storage.defineItem<PopView>(VIEW_STORAGE_KEY, {
    fallback: 'dashboard',
})

/**
 * Stores all the extension settings 
 */
export const SETTINGS_STORAGE_KEY = 'local:settings'
export const DEFAULT_SETTINGS: ExtensionSettings = {
    autoSync: false,
    readingProgress: true,
    theme: 'system'
};
export const localSettings = storage.defineItem<ExtensionSettings>(SETTINGS_STORAGE_KEY, {
    fallback: DEFAULT_SETTINGS,
})

/**
 * Stores all the novels sources info 
 */
export const NOVEL_SOURCES_STORAGE_KEY = 'local:sources'
export const localSources = storage.defineItem<LocalSource[]>(NOVEL_SOURCES_STORAGE_KEY, {
    fallback: []
})