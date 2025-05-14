chrome.runtime.onInstalled.addListener(() => {
    chrome.action.setBadgeText({
        text: "OFF",
    });
});

const t0 = performance.now();
setInterval(() => {
    const t1 = performance.now();
    console.log(`Alive for ${Math.round((t1 - t0) / 1e3)}s`);
}, 1e3);