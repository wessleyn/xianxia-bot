import { localReadings, localSettings, localSources, localTabView } from "@constants/storage";
import { LocalReading } from "@ctypes/index";
import { extractChapterInfo, extractNovelInfo } from "@repo/scrapper";
import { detectPage } from "@utils/detectPage";
import sync from "@utils/sync";

export const onNewTab = async (tabId: number, changeInfo: globalThis.Browser.tabs.TabChangeInfo, tab: globalThis.Browser.tabs.Tab) => {
    const currentDate = new Date()
    const currentDateISO = currentDate.toISOString() // Convert to ISO string for storage
    const settings = await localSettings.getValue();
    let sources = await localSources.getValue()
    let readings = await localReadings.getValue()

    if (tab.status == 'complete' && tab.url) {
        const url = new URL(tab.url)
        const newInfo = detectPage(url.href)

        let currentView = await localTabView.getValue()
        // if this is a new view, change the local storage
        currentView !== newInfo.type && await localTabView.setValue(newInfo.type)
        // either way, fetch the latest view
        currentView = await localTabView.getValue()

        if (currentView === 'dashboard') return

        let sourceIndex = sources.findIndex(source => source.name.includes(newInfo.pattern!.homepage))
        if (sourceIndex == -1) {
            await localSources.setValue([...sources, {
                name: newInfo.pattern!.homepage,
                url: `https://${newInfo.pattern!.homepage}`,
                visits: 1,
                added: currentDateISO,
                lastVisited: currentDateISO
            }])
            sourceIndex = sources.length
            sources = await localSources.getValue()
        }

        if (currentView == 'novelSite') {
            const updatedSources = await localSources.getValue()
            updatedSources[sourceIndex] = {
                ...updatedSources[sourceIndex],
                visits: (updatedSources[sourceIndex].visits || 0) + 1,
                lastVisited: currentDateISO
            }
            await localSources.setValue(updatedSources)
            settings.autoSync && await sync('sources')
            return
        }

        const extractedNovelInfo = extractNovelInfo(url.href);
        let novelIndex = readings.findIndex(novel =>
            novel.novelName && extractedNovelInfo ?
                novel.novelName.includes(extractedNovelInfo.title) :
                false
        );

        if (novelIndex == -1) {
            const newNovel: LocalReading = {
                novelId: undefined,
                coverImage: extractedNovelInfo && newInfo.pattern?.homepage.includes('novelbin') ?
                    `https://novelbin.me/media/novel/${extractedNovelInfo.slug}.jpg` : undefined,
                novelName: extractedNovelInfo.title,
                novelGenres: [],
                novelAuthor: undefined,
                readingSourceId: undefined,
                readingSourceUrl: sources[sourceIndex].url,
                fullUrl: extractedNovelInfo.sourceUrl, // Store the full source URL
                currentChapter: 0,
                previousChapter: 0,
                totalChapters: 0, // FIXME: scrap from content script
                readChapters: [], // Initialize empty chapters array
                startedVisitOn: currentDateISO,
                lastVisitedAt: currentDateISO,
                startedReadingOn: undefined,
                lastReadingAt: undefined
            }
            await localReadings.setValue([...readings, newNovel])
            novelIndex = readings.length
            readings = await localReadings.getValue()
        }

        switch (currentView) {
            case 'novelToc':
                const updatedNovels = [...readings]
                updatedNovels[novelIndex] = {
                    //copy everything on that record
                    ...updatedNovels[novelIndex],
                    // and update where needed
                    lastVisitedAt: currentDateISO
                }
                await localReadings.setValue(updatedNovels)
                settings.autoSync && await sync('history')
                break
            case 'novelCh':
                const reading = readings[novelIndex]
                const chapterInfo = extractChapterInfo(url.href)!
                const newChapterNumber = chapterInfo.chapterNumber!
                const updatedReadings = [...readings];

                const chapterEntry = {
                    slug: chapterInfo.slug,
                    chapterNumber: newChapterNumber,
                    chapterName: chapterInfo.chapterName,
                    lastReadAt: currentDateISO,
                    startedAt: currentDateISO,
                    bookmark: undefined
                };

                // Handle read chapters array
                let updatedChapters = [...(reading.readChapters || [])];

                if (reading.lastReadingAt) {
                    // Find if chapter already exists in reading history
                    const existingChapterIndex = updatedChapters.findIndex(ch =>
                        ch.slug === chapterInfo.slug || ch.chapterNumber === newChapterNumber
                    );

                    if (existingChapterIndex >= 0) {
                        updatedChapters[existingChapterIndex] = {
                            ...updatedChapters[existingChapterIndex],
                            lastReadAt: currentDateISO
                        };
                    } else {
                        updatedChapters.push(chapterEntry);
                    }
                } else {
                    updatedChapters = [chapterEntry];
                }

                updatedReadings[novelIndex] = {
                    ...reading,
                    fullUrl: extractedNovelInfo.sourceUrl,
                    readChapters: updatedChapters,
                    lastReadingAt: currentDateISO,
                    previousChapter: reading.lastReadingAt ? reading.currentChapter : 0,
                    currentChapter: newChapterNumber,
                    // Only add startedReadingOn if this is the first time reading
                    ...(reading.lastReadingAt ? {} : { startedReadingOn: currentDateISO })
                };

                await localReadings.setValue(updatedReadings);
                settings.autoSync && await sync('readings')
                break
            default:
                return
        }
    }
}
