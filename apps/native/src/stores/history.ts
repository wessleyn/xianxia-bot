import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

export interface ReadNovel {
    id: string;
    novelLink: string;
    title: string;
    author: string;
    coverImage?: string;
    chapters: string[]

    isLiked: boolean;
    isInLibrary: boolean;

    lastReadAt?: string;
    lastReadChLink?: string;
    lastReadChTitle?: string;
    progress: number; // 0-100

}

interface HistoryStore {
    readNovels: ReadNovel[];
    setReadNovels: (novels: ReadNovel[]) => void;
    upsertNovel: (novel: Partial<ReadNovel> & { novelLink: string }) => void;
    loadFromStorage: () => Promise<void>;
}

export const useHistoryStore = create<HistoryStore>((set, get) => ({
    readNovels: [],

    setReadNovels: (novels) => set({ readNovels: novels }),

    upsertNovel: (novel) => {
        const current = get().readNovels;
        const index = current.findIndex(n => n.novelLink === novel.novelLink);

        let updated: ReadNovel[];
        if (index >= 0) {
            // merge existing + new fields
            updated = [...current];
            updated[index] = {
                ...updated[index],
                ...novel,
            };
        } else {
            updated = [
                ...current,
                {
                    // TODO: novelink is sufficient as id!!
                    id: novel.novelLink,
                    lastReadChLink: novel.lastReadChLink ?? "",
                    isInLibrary: novel.isInLibrary ?? false,
                    isLiked: novel.isLiked ?? false,
                    lastReadChTitle: novel.lastReadChTitle ?? "Unknown Title",
                    progress: novel.progress ?? 0,
                    title: novel.title ?? "Unknown Title",
                    author: novel.author ?? "Unknown Author",
                    coverImage: novel.coverImage,
                    chapters: novel.chapters ?? [],
                    lastReadAt: novel.lastReadAt,
                    ...novel,
                },
            ];
        }

        updated.sort(
            (a, b) => {
                const dateA = a.lastReadAt ? new Date(a.lastReadAt).getTime() : 0;
                const dateB = b.lastReadAt ? new Date(b.lastReadAt).getTime() : 0;
                return dateB - dateA;
            }
        );

        set({ readNovels: updated });
        AsyncStorage.setItem('readingHistory', JSON.stringify(updated));
    },

    loadFromStorage: async () => {
        const data = await AsyncStorage.getItem('readingHistory');
        const parsed: ReadNovel[] = data ? JSON.parse(data) : [];

        parsed.sort(
            (a, b) => {
                const dateA = a.lastReadAt ? new Date(a.lastReadAt).getTime() : 0;
                const dateB = b.lastReadAt ? new Date(b.lastReadAt).getTime() : 0;
                return dateB - dateA;
            }
        );

        set({ readNovels: parsed });
    },
}));
