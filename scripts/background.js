async function getCurrentTab() {
    let queryOptions = { active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request.action === "replaceTdContent") {
        const currentTab = await getCurrentTab();
        chrome.scripting.executeScript({
            target: { tabId: currentTab.id },
            files: ['scripts/content.js'],
        });
    }
});