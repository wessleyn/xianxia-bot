import React, { ReactNode, createContext, useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import { TabInfo, ViewType, determineViewType, useCurrentTabInfo } from '../utils/pageDetection';
// Define the context shape
interface ViewContextType {
  tabInfo: TabInfo | null;
  viewType: ViewType;
  refreshTabInfo: () => void;
}

// Create the context
const ViewContext = createContext<ViewContextType | undefined>(undefined);

// Provider component
export const ViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tabInfo, refreshTabInfo] = useCurrentTabInfo();
  const viewType = determineViewType(tabInfo);

  // Refresh tab info when the popup is opened
  React.useEffect(() => {
    refreshTabInfo();

    // If browser APIs are available, listen for storage changes
    const handleStorageChange = (changes: any) => {
      console.log('Storage changed:', changes);
      if (changes.currentPageInfo || changes.currentView) {
        console.log('Refreshing tab info due to storage change');
        refreshTabInfo();
      }
    };

    try {
      // Check if we're in a browser extension context
      if (typeof browser !== 'undefined' && browser.storage && browser.storage.onChanged) {
        console.log('Adding storage change listener (browser.storage)');
        browser.storage.onChanged.addListener(handleStorageChange);
        return () => {
          console.log('Removing storage change listener (browser.storage)');
          browser.storage.onChanged.removeListener(handleStorageChange);
        };
      } else if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
        // Fallback to chrome API if browser API is not available
        console.log('Adding storage change listener (chrome.storage)');
        chrome.storage.onChanged.addListener(handleStorageChange);
        return () => {
          console.log('Removing storage change listener (chrome.storage)');
          chrome.storage.onChanged.removeListener(handleStorageChange);
        };
      }
    } catch (err) {
      console.error('Error setting up storage listener:', err);
    }

    return undefined;
  }, []);

  return (
    <ViewContext.Provider value={{ tabInfo, viewType, refreshTabInfo }}>
     <Toaster />
      {children}
    </ViewContext.Provider>
  );
};

// Custom hook to use the view context
export const useViewContext = () => {
  const context = useContext(ViewContext);
  if (context === undefined) {
    throw new Error('useViewContext must be used within a ViewProvider');
  }
  return context;
};
