// Page detection utilities
const detectPageType = (url: string) => {
  // Simplified pattern matching for novel sites and content types
  const isNovelSite = /novel|fiction|book|read|webnovel|wuxiaworld|royalroad|scribblehub/.test(url);
  const isNovelChapter = isNovelSite && /chapter|ch\.|\/(?:c|ch)\/\d+/.test(url);
  const isNovelToc = isNovelSite && /toc|table-of-contents|chapters|content|list/.test(url) && !isNovelChapter;

  return {
    url,
    isNovelSite,
    isNovelChapter,
    isNovelToc
  };
};

export default defineBackground({
  main() {
    // Executed when background is loaded, CANNOT BE ASYNC

    // Initialize storage with default values
    browser.storage.local.set({
      currentView: 'normal',
      currentPageInfo: {
        url: '',
        isNovelSite: false,
        isNovelChapter: false,
        isNovelToc: false
      }
    }).catch(error => console.error("Error initializing storage:", error));

    // Listen for tab activation
    console.log('Setting up tab activation listener');
    browser.tabs.onActivated.addListener(activeInfo => {
      console.log('Tab activated:', activeInfo.tabId);
      try {
        // Try to use Promise API first (Firefox style)
        const getTab = browser.tabs.get(activeInfo.tabId);
        if (getTab instanceof Promise) {
          console.log('Using Promise-based tabs.get API');
          getTab.then(tab => {
            console.log('Tab switched to URL:', tab.url);
            updatePageInfo(tab);
          }).catch(error => console.error("Error getting tab:", error));
        } else {
          // Fallback to callback API (Chrome style)
          console.log('Using callback-based tabs.get API');
          browser.tabs.get(activeInfo.tabId, tab => {
            console.log('Tab switched to URL:', tab.url);
            updatePageInfo(tab);
          });
        }
      } catch (error) {
        console.error("Error in onActivated listener:", error);
      }
    });    // Helper function to update storage with page info
    function updatePageInfo(tab: any) {
      if (tab.url) {
        // Detect the page type
        const pageInfo = detectPageType(tab.url);

        // Determine view type based on page info
        let viewType = 'normal';
        if (pageInfo.isNovelChapter) viewType = 'chapter';
        else if (pageInfo.isNovelToc) viewType = 'toc';

        console.log(`Updating storage for tab ${tab.id}:`, {
          url: tab.url,
          viewType,
          pageInfo
        });

        // Store the information for the popup to use
        browser.storage.local.set({
          currentView: viewType,
          currentPageInfo: {
            url: tab.url,
            title: tab.title || 'Unknown',
            isNovelSite: pageInfo.isNovelSite,
            isNovelChapter: pageInfo.isNovelChapter,
            isNovelToc: pageInfo.isNovelToc
          }
        })
          .then(() => console.log('Successfully updated storage with page info'))
          .catch(error => console.error("Error storing page info:", error));
      } else {
        console.warn("Attempted to update page info for tab without URL");
      }
    }

    // Listen for tab updates (e.g., when the user navigates to a new URL in the same tab)
    console.log('Setting up tab update listener');
    browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      console.log(`Tab ${tabId} updated:`, changeInfo);

      // Only process if the page load is complete and we have a URL
      if (changeInfo.status === 'complete' && tab.url) {
        console.log('Tab load complete with URL:', tab.url);
        try {
          updatePageInfo(tab);
        } catch (error) {
          console.error("Error in onUpdated listener:", error);
        }
      }
    });
  },
});
