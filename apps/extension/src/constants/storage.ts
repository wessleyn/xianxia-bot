import { storage } from '#imports';
import { PopView } from '../ctypes';

export const VIEW_STORAGE_KEY = 'local:currentView'
export const localTabView = storage.defineItem<PopView>(VIEW_STORAGE_KEY, {
    fallback: 'dashboard',
})