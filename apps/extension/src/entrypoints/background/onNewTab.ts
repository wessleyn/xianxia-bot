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

    if (tab.url) {
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
                novel.novelName.includes(extractedNovelInfo) :
                false
        );

        if (novelIndex == -1) {
            const newNovel: LocalReading = {
                novelId: undefined,
                novelName: extractedNovelInfo,
                readingSourceId: undefined,
                readingSourceUrl: sources[sourceIndex].url,
                currentChapter: 0,
                previousChapter: 0,
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
                const newChapter = extractChapterInfo(url.href)!.chapterNumber
                const updatedReadings = [...readings];

                if (reading.lastReadingAt) {
                    // we read this before
                    updatedReadings[novelIndex] = {
                        ...reading,
                        lastReadingAt: currentDateISO,
                        previousChapter: reading.currentChapter,
                        currentChapter: newChapter!,
                    };
                } else {
                    updatedReadings[novelIndex] = {
                        ...reading,
                        previousChapter: 0,
                        currentChapter: newChapter!,
                        startedReadingOn: currentDateISO,
                        lastReadingAt: currentDateISO
                    };
                }

                await localReadings.setValue(updatedReadings);
                settings.autoSync && await sync('readings')
                break
            default:
                return
        }


    }
}
