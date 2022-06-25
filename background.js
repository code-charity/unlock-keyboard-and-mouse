/*--------------------------------------------------------------
>>> BACKGROUND
----------------------------------------------------------------
# Message listener
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# MESSAGE LISTENER
--------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	if (message === 'tab-connected') {
		sendResponse(new URL(sender.url).hostname);
	} else if (message === 'options-page-connected') {
		sendResponse({
			isTab: sender.hasOwnProperty('tab')
		});
	}
});