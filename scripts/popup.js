document.getElementById("replaceBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "replaceTdContent" });
});