import { detectPage } from "@utils/detectPage";
import { localSettings, localSources, localTabView } from "../../constants/storage";
import sync from "../../utils/sync";

export const onNewTab = async (tabId: number, changeInfo: globalThis.Browser.tabs.TabChangeInfo, tab: globalThis.Browser.tabs.Tab) => {
    const settings = await localSettings.getValue();
    const sources = await localSources.getValue()

    if (changeInfo.status === 'complete' && tab.url) {
        const url = new URL(tab.url)
        const newInfo = detectPage(url.href)

        let currentView = await localTabView.getValue()
        currentView !== newInfo.type && localTabView.setValue(newInfo.type)
        currentView = await localTabView.getValue() // guarantees latest view is selected

        const sourceIndex = sources.findIndex(source => source.name.includes(newInfo.name))

        if (sourceIndex !== -1) { // is found
            switch (currentView) {
                case 'novelSite':
                    const updatedSources = [...sources]
                    updatedSources[sourceIndex] = {
                        ...updatedSources[sourceIndex],
                        visits: (updatedSources[sourceIndex].visits || 0) + 1,
                        lastVisited: new Date().toISOString()
                    }
                    await localSources.setValue(updatedSources)

                    settings.autoSync && await sync('sources')
                    break;
                default:
                    break;
            }

        } else {
            switch (currentView) {
                case 'novelSite':
                    const newSource = {
                        name: newInfo.name,
                        url: url.origin,
                        visits: 1,
                        added: new Date().toISOString(),
                        lastVisited: new Date().toISOString()
                    }
                    await localSources.setValue([...sources, newSource])
                    settings.autoSync && await sync('sources')

                    break;
                default:
                    break;
            }
        }
    }
}
