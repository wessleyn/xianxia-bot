import { useEffect, useState } from 'react';

// Type definitions for web extension state
export enum ViewType {
  NORMAL = 'normal',
  CHAPTER = 'chapter',
  TOC = 'toc',
  NOVEL = 'novel'
}

// Type for current tab metadata
export interface TabInfo {
  url: string;
  title: string;
  isNovelSite: boolean;
  isNovelChapter: boolean;
  isNovelToc: boolean;
}

// Utility to detect the current page type
export const detectPageType = (url: string): TabInfo => {
  // This is mock logic for demonstration purposes
  // In a real extension, you would have more sophisticated detection

  // Simplified pattern matching
  const isNovelSite = /novel|fiction|book|read|webnovel/.test(url);
  const isNovelChapter = isNovelSite && /chapter|ch\.|\/(?:c|ch)\/\d+/.test(url);
  const isNovelToc = isNovelSite && /toc|table-of-contents|chapters|content|list/.test(url) && !isNovelChapter;

  return {
    url,
    title: `Page Title from ${url}`,
    isNovelSite,
    isNovelChapter,
    isNovelToc
  };
};

// Custom hook to get page type from browser tabs API
export const useCurrentTabInfo = (): [TabInfo | null, () => void] => {
  const [tabInfo, setTabInfo] = useState<TabInfo | null>(null);

  const refreshTabInfo = () => {

    // Get page info from browser storage that was set by the background script
    // This will work when the extension is actually installed in the browser
    try {
      // Try to use the browser API (Firefox-style Promise-based)
      if (typeof browser !== 'undefined' && browser.storage && browser.storage.local) {
        console.log('Using browser.storage.local API');
        browser.storage.local.get(['currentView', 'currentPageInfo']).then(result => {
          console.log('Retrieved from storage:', result);
          if (result.currentPageInfo) {
            setTabInfo({
              url: result.currentPageInfo.url,
              title: result.currentPageInfo.title,
              isNovelSite: result.currentPageInfo.isNovelSite,
              isNovelChapter: result.currentPageInfo.isNovelChapter,
              isNovelToc: result.currentPageInfo.isNovelToc
            });
          }
        }).catch(error => {
          console.error("Error accessing browser storage:", error);
        });
      }
      // Try to use the chrome API (Chrome-style callback-based)
      else if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
        console.log('Using chrome.storage.local API');
        chrome.storage.local.get(['currentView', 'currentPageInfo'], (result) => {
          console.log('Retrieved from storage:', result);
          if (result.currentPageInfo) {
            setTabInfo({
              url: result.currentPageInfo.url,
              title: result.currentPageInfo.title,
              isNovelSite: result.currentPageInfo.isNovelSite,
              isNovelChapter: result.currentPageInfo.isNovelChapter,
              isNovelToc: result.currentPageInfo.isNovelToc
            });
          } else {
console.log('No currentPageInfo found in storage');      }
        });
      }
      // If no extension API is available, use fallback data
      else {
        console.log('No browser extension API detected, using fallback data');
        fallbackToMockData();
      }
    } catch (error) {
      console.error("Error accessing storage:", error);
      fallbackToMockData();
    }
  };

  // Helper function for fallback mock data
  const fallbackToMockData = () => {
    const mockUrls = [
      'https://www.example.com', // not a novel site
      'https://www.webnovel.com/novel/against-the-gods', // novel site
      'https://www.webnovel.com/novel/against-the-gods/chapter-123', // chapter page
      'https://www.webnovel.com/novel/against-the-gods/table-of-contents', // ToC page
    ];

    // Randomly select a URL for demonstration
    const randomUrl = mockUrls[Math.floor(Math.random() * mockUrls.length)];
    setTabInfo(detectPageType(randomUrl));
  };

  useEffect(() => {
    refreshTabInfo();

    // For demo purposes only - allows toggling between views
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '1') {
        localStorage.setItem('xianxu_debug_view', 'normal');
        refreshTabInfo();
      } else if (e.ctrlKey && e.key === '2') {
        localStorage.setItem('xianxu_debug_view', 'chapter');
        refreshTabInfo();
      } else if (e.ctrlKey && e.key === '3') {
        localStorage.setItem('xianxu_debug_view', 'toc');
        refreshTabInfo();
      } else if (e.ctrlKey && e.key === '4') {
        localStorage.setItem('xianxu_debug_view', 'novel');
        refreshTabInfo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return [tabInfo, refreshTabInfo];
};

// Function to determine which view to show based on tab info
export const determineViewType = (tabInfo: TabInfo | null): ViewType => {
  if (!tabInfo) return ViewType.NORMAL;

  if (tabInfo.isNovelChapter) return ViewType.CHAPTER;
  if (tabInfo.isNovelToc) return ViewType.TOC;
  if (tabInfo.isNovelSite) return ViewType.NOVEL;
  return ViewType.NORMAL;
};
