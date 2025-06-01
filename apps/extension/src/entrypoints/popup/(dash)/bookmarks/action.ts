import { localReadings } from "@constants/storage";
import { BookmarkLabel } from "../../../../ctypes";

export interface BookmarkData {
    id: string;
    novel: string;
    chapter: number;
    chapterTitle: string;
    excerpt: string;
    dateAdded: string;
    label: BookmarkLabel;
}

export const reCalcBookmarks = async (): Promise<BookmarkData[]> => {

    const readings = await localReadings.getValue();
    const bookmarks = readings.flatMap(reading => reading.readChapters.map(ch => ch.bookmark && {
        ...ch.bookmark,
        novel: reading.novelName,
        chapterTitle: ch.chapterName!,
        chapter: ch.chapterNumber,
    }));

    return bookmarks.filter( b => b !== undefined )
};
