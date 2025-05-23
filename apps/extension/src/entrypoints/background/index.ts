import { onNewTab } from "./onNewTab";

export default defineBackground({
  main() {
    browser.tabs.onUpdated.addListener(onNewTab)
  }

});
