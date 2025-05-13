console.log("Hello from the background script!")

let count = 0;

chrome.runtime.onMessage.addListener((msg) => {
    console.log(msg.text, ++count)
    // chrome.runtime.sendMessage({ text: "Background" });

})