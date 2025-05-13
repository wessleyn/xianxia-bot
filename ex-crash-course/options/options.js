console.log('Hello from options!');

document.querySelector("#btn").
    addEventListener('click', () => {
        chrome.runtime.sendMessage({ text: "Options" });
    });

chrome.runtime.onMessage.addListener((msg) => {
    document.body.innerHTML += `<div>${msg.text}</div>`;
    console.log('received')
});