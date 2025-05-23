import { detectPage } from "@utils/detectPage";
import { localTabView } from "../../constants/storage";

export const onNewTab = async (tabId: number, changeInfo: globalThis.Browser.tabs.TabChangeInfo, tab: globalThis.Browser.tabs.Tab) => {

    if (changeInfo.status === 'complete' && tab.url) {
        const url = new URL(tab.url);
        const info = detectPage(url.href);

        const currentView = await localTabView.getValue();
        console.log('Current view:', currentView);
        console.log('Detected page type:', info.type);
        if (currentView !== info.type) {
            localTabView.setValue(info.type);
            console.log('Updated view to:', info.type);
        } else {
            console.log('No update needed, current view is already:', currentView);
        }
    }
}