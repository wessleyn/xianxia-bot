import { Source } from '@constants/types';
import { SQLiteDatabase } from 'expo-sqlite';
import { create } from 'zustand';

interface SourceStore {
    db: SQLiteDatabase | null;
    enabledSources: Source[];
    allSources: Source[];
    initDB: (dbInstance: any) => void;
    fetchEnabledSources: () => Promise<void>;
    fetchAllSources: () => Promise<void>;
    toggleSource: (id: string, isEnabled: boolean) => Promise<void>;
}

export const useSourceStore = create<SourceStore>((set, get) => ({
    db: null,
    enabledSources: [],
    allSources: [],

    initDB: (dbInstance) => set({ db: dbInstance }),

    fetchEnabledSources: async () => {
        try {
            const db = get().db;
            if (!db) return;
            const sources = await db.getAllAsync<Source>('SELECT * FROM sources WHERE enabled = 1;');
            set({ enabledSources: sources });
        } catch (err) {
            console.error('[SourceStore] fetchEnabledSources failed:', err);
        }
    },

    fetchAllSources: async () => {
        try {
            const db = get().db;
            if (!db) return;
            const sources = await db.getAllAsync<Source>('SELECT * FROM sources;');
            set({ allSources: sources });
        } catch (err) {
            console.error('[SourceStore] fetchAllSources failed:', err);
        }
    },

    toggleSource: async (id, isEnabled) => {
        const newState = isEnabled ? 1 : 0;
        try {
            const db = get().db;
            if (!db) return;
            await db.execAsync(`UPDATE sources SET enabled = ${newState} WHERE id = '${id}';`);
            await get().fetchEnabledSources();
            await get().fetchAllSources();
        } catch (err) {
            console.error('[SourceStore] toggleSource failed:', err);
        }
    },
}));
