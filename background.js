/*--------------------------------------------------------------
>>> BACKGROUND
--------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'get-tab-hostname') {
        sendResponse({
            hostname: new URL(sender.tab.url).hostname,
            id: sender.tab.id
        });
    }
});