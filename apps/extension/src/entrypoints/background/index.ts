import onInstalled from "./onInstalled";
import { onNewTab } from "./onNewTab";
import onNewUpdate from "./onNewUpdate";
import setView from "./utils/setView";

export default defineBackground({
  main() {
    browser.runtime.onInstalled.addListener(onInstalled);
    browser.runtime.onUpdateAvailable.addListener(onNewUpdate)
    
    browser.tabs.onUpdated.addListener(onNewTab)
    browser.tabs.onCreated.addListener(async (tab) => {
      if (tab.url) {
        const url = new URL(tab.url);
        const newInfo = detectPage(url.href);
        await setView(newInfo.type);
      }
    });

  }
});
