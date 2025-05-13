console.log("Hello from pop up")

let count = 0

document.querySelector('#btn').addEventListener(
    'click', 
    (e) => {
        chrome.runtime.sendMessage({ text: "Popup" });
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, (tabs) => {
            chrome.tabs.sendMessage(
                tabs[0]?.id,
                { text: "Popup" }
            );
        });
    }
)

chrome.runtime.onMessage.addListener((msg) => {
    document.body.innerHTML += `<div>${msg.text} -- ${count}</div>`;
    console.log('received')
});