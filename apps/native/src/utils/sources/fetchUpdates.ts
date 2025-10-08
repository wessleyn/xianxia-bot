import { UpdateType } from "@constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReadNovel } from "@stores/history";
import { findNovelSource } from "./findNovelSource";

export type updateFrom = 'all' | 'library' | 'liked';

export default async function fetchUpdates(updateFrom?: updateFrom): Promise<UpdateInfo[]> {
    console.log("Fetching update settings from AsyncStorage...");
    let setting = JSON.parse(await AsyncStorage.getItem('updateFrom') ?? '"Readings"') as UpdateType
    console.log("Update setting:", setting);

    console.log("Fetching reading history from AsyncStorage...");
    const history = JSON.parse(await AsyncStorage.getItem('readingHistory') ?? '[]') as ReadNovel[]
    console.log("History length:", history.length);

    let filteredNovels: ReadNovel[]

    if (updateFrom) {
        switch (updateFrom) {
            case 'all':
                setting = setting
                break
            case 'library':
                setting = 'Library'
                break
            case 'liked':
                setting = 'Favourites'
            default:
                setting = setting
                break
        }
    }

    switch (setting) {
        case "Readings":
            filteredNovels = history.filter(
                n => n.isInLibrary || n.isLiked || n.lastReadAt !== undefined
            )
            console.log("Filtered novels (Readings):", filteredNovels.length);
            break;
        case "Favourites":
            filteredNovels = history.filter(n => n.isLiked)
            console.log("Filtered novels (Favourites):", filteredNovels.length);
            break;
        case "Library":
            filteredNovels = history.filter(n => n.isInLibrary)
            console.log("Filtered novels (Library):", filteredNovels.length);
            break;
        default:
            filteredNovels = []
            console.log("Filtered novels (Default):", filteredNovels.length);
            break;
    }

    const queryResults = await Promise.all(filteredNovels.map(
        async (n) => {
            console.log(`Fetching source for novel: ${n.title} (${n.novelLink})`);
            const source = findNovelSource(n.novelLink)
            const instance = new source()
            console.log(`Fetching latest chapters for: ${n.title}`);
            const latestChapters = await instance.getNovelChapters(n.novelLink)
            console.log(`Latest chapters fetched: ${latestChapters.length} for ${n.title}`);
            const count = latestChapters.length - n.chapters.length
            console.log(`New chapters count for ${n.title}: ${count}`);

            const latest = latestChapters[latestChapters.length - 1]
            console.log(`Latest chapter for ${n.title}:`, latest);

            let updateDate;
            if (count > 0) {
                console.log(`Fetching update date for new chapters of ${n.title}...`);
                updateDate = await instance.getLatestCh(n.novelLink)
                console.log(`Update date for ${n.title}:`, updateDate);
            } else {
                console.log(`No new chapters for ${n.title}, skipping update date fetch.`);
            }

            return {
                ...n,
                updateDate,
                updates: {
                    count,
                    latestChapter: {
                        title: latest.title,
                        link: latest.link,
                    }
                }
            }
        }))
    
    const updatedNovels = queryResults.filter(n => n.updates.count > 0 && n.updateDate !== undefined)

    console.log("Mapping query results to final output...");
    return await Promise.all(updatedNovels.map(async (n) => {
        console.log(`Preparing update info for: ${n.title}`);
        return {
            name: n.title,
            novelLink: n.novelLink,
            coverImage: n.coverImage!,
            author: n.author!,
            newChCount: n.updates.count,
            latestUpdateDate: n.updateDate!,
            newChLink: n.updates.latestChapter.link,
            newChTitle: n.updates.latestChapter.title,
        }
    }))
}

export interface UpdateInfo {
    name: string;
    novelLink: string;
    coverImage: string;
    author:string
    newChCount: number;
    latestUpdateDate: Date;
    newChLink: string;
    newChTitle: string;
}