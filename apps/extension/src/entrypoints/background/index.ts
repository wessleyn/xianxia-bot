import onInstalled from "./onInstalled";
import { onNewTab } from "./onNewTab";
import onNewUpdate from "./onNewUpdate";

export default defineBackground({
  main() {
    browser.runtime.onInstalled.addListener(onInstalled);
    browser.runtime.onUpdateAvailable.addListener(onNewUpdate)
    
    browser.tabs.onUpdated.addListener(onNewTab)
  }

});
