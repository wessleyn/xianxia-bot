import { create } from 'zustand'


type CurrentNovel = {
    title: string
    author: string
    coverImage: string
    novelLink: string
    status?: string
    chapters: string
}

interface NovelStore {
    currentNovel: CurrentNovel | null
    lastReadChapterLink: string | null
    setCurrentNovel: (novel: CurrentNovel) => void
    setLastReadChapterLink: (link: string | null) => void
    resetState: () => void
}

export const useNovelStore = create<NovelStore>((set,get) => ({
    currentNovel: null,
    lastReadChapterLink: null,
    setLastReadChapterLink: (link) => set({ lastReadChapterLink: link }),
    setCurrentNovel: (novel) => set({ currentNovel: novel }),
    resetState: () => set({ currentNovel: null }),
}))
