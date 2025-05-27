// Import our auth listener for cookie monitoring
import { browser } from 'wxt/browser';

export default defineBackground({
  main() {
    console.log('Background script initialized');

    // TAB EVENTS
    // Listen for tab activation events
    browser.tabs.onActivated.addListener((activeInfo) => {
      console.log('Tab activated:', activeInfo.tabId);
    });

    // Listen for tab update events
    browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
      console.log('Tab updated:', tabId, changeInfo, tab.url);
    });

    // Listen for tab removal events
    browser.tabs.onRemoved.addListener((tabId, removeInfo) => {
      console.log('Tab removed:', tabId, removeInfo);
    });

    // STORAGE EVENTS
    // Listen for storage changes
    browser.storage.onChanged.addListener((changes, areaName) => {
      console.log('Storage changed:', areaName, changes);
    });

    // COOKIE EVENTS
    // Listen for cookie changes
    browser.cookies?.onChanged?.addListener?.((changeInfo) => {
      console.log('Cookie changed:', changeInfo.cookie, 'removed:', changeInfo.removed);
    });

    // NAVIGATION EVENTS
    browser.webNavigation?.onBeforeNavigate?.addListener?.((details) => {
      console.log('Before navigate:', details.url, 'tab:', details.tabId);
    });

    browser.webNavigation?.onCompleted?.addListener?.((details) => {
      console.log('Navigation complete:', details.url, 'tab:', details.tabId);
    });

    // BOOKMARKS EVENTS
    browser.bookmarks?.onCreated?.addListener?.((id, bookmark) => {
      console.log('Bookmark created:', id, bookmark);
    });

    browser.bookmarks?.onRemoved?.addListener?.((id, removeInfo) => {
      console.log('Bookmark removed:', id, removeInfo);
    });

    browser.bookmarks?.onChanged?.addListener?.((id, changeInfo) => {
      console.log('Bookmark changed:', id, changeInfo);
    });

    // DOWNLOADS EVENTS
    browser.downloads?.onCreated?.addListener?.((downloadItem) => {
      console.log('Download created:', downloadItem);
    });

    browser.downloads?.onChanged?.addListener?.((downloadDelta) => {
      console.log('Download changed:', downloadDelta);
    });

    // EXTENSION EVENTS
    browser.runtime?.onInstalled?.addListener?.((details) => {
      console.log('Extension installed or updated:', details.reason);
    });

    browser.runtime?.onStartup?.addListener?.(() => {
      console.log('Extension started up (browser launched)');
    });

    browser.runtime?.onMessage?.addListener?.((message, sender, sendResponse) => {
      console.log('Message received:', message, 'from:', sender);
      // Always return true if you're going to use sendResponse asynchronously
      return true;
    });

    // CONTEXT MENU EVENTS
    browser.contextMenus?.onClicked?.addListener?.((info, tab) => {
      console.log('Context menu clicked:', info, 'tab:', tab);
    });

    // COMMAND EVENTS (keyboard shortcuts)
    browser.commands?.onCommand?.addListener?.((command) => {
      console.log('Command triggered:', command);
    });

    // BROWSER ACTION EVENTS
    browser.action?.onClicked?.addListener?.((tab) => {
      console.log('Extension icon clicked in tab:', tab);
    });

    // WINDOW EVENTS
    browser.windows?.onCreated?.addListener?.((window) => {
      console.log('Window created:', window);
    });

    browser.windows?.onRemoved?.addListener?.((windowId) => {
      console.log('Window removed:', windowId);
    });

    browser.windows?.onFocusChanged?.addListener?.((windowId) => {
      console.log('Window focus changed:', windowId);
    });

    // IDLE STATE EVENTS
    browser.idle?.onStateChanged?.addListener?.((newState) => {
      console.log('System idle state changed:', newState);
    });

    // ALARM EVENTS
    browser.alarms?.onAlarm?.addListener?.((alarm) => {
      console.log('Alarm triggered:', alarm.name);
    });

    // NOTIFICATION EVENTS
    browser.notifications?.onClicked?.addListener?.((notificationId) => {
      console.log('Notification clicked:', notificationId);
    });

    browser.notifications?.onClosed?.addListener?.((notificationId, byUser) => {
      console.log('Notification closed:', notificationId, 'by user:', byUser);
    });

    // SESSION EVENTS
    browser.sessions?.onChanged?.addListener?.(() => {
      console.log('Session changed');
    });

    // PERMISSIONS EVENTS
    browser.permissions?.onAdded?.addListener?.((permissions) => {
      console.log('Permissions added:', permissions);
    });

    browser.permissions?.onRemoved?.addListener?.((permissions) => {
      console.log('Permissions removed:', permissions);
    });

    // HISTORY EVENTS
    browser.history?.onVisited?.addListener?.((historyItem) => {
      console.log('URL visited:', historyItem);
    });

    browser.history?.onVisitRemoved?.addListener?.((removed) => {
      console.log('History visits removed:', removed);
    });

    console.log('All background event listeners registered successfully');
  }
});
