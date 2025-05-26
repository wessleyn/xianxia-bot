import { browser } from 'wxt/browser';

export default async function onInstalled(details: Browser.runtime.InstalledDetails) {
    // Skip during development
    // if (details.temporary) return;

    switch (details.reason) {
        case "install":
            {
                await browser.tabs.create({
                    url: browser.runtime.getURL('/onboarding.html'),
                });
            }
            break;
        case "update":
            {
                await browser.tabs.create({
                    url: browser.runtime.getURL('/upboarding.html'),
                });
            }
            break;
    }
}