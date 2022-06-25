/*--------------------------------------------------------------
>>> OPTIONS PAGE
----------------------------------------------------------------
# Global variable
# Initialization
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GLOBAL VARIABLE
--------------------------------------------------------------*/

var extension = {
	hostname: ''
};


/*--------------------------------------------------------------
# INITIALIZATION
--------------------------------------------------------------*/

satus.storage.import(function (items) {
	var language = items.language;

	if (!language || language === 'default') {
		language = window.navigator.language;
	}

	if (items.theme === 'dark') {
		document.body.setAttribute('theme', 'dark');
	}

	satus.locale.import(language, function () {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			var tab = tabs[0],
				url = new URL(tab.url);

			extension.hostname = url.hostname;

			if (
				tab.url.startsWith('about:') ||
				tab.url.startsWith('chrome') ||
				tab.url.startsWith('edge') ||
				tab.url.startsWith('https://addons.mozilla.org') ||
				tab.url.startsWith('https://chrome.google.com/webstore') ||
				tab.url.startsWith('https://microsoftedge.microsoft.com/addons') ||
				tab.url.startsWith('moz') ||
				tab.url.startsWith('view-source:') ||
				tab.url.endsWith('.pdf')
			) {
				extension.skeleton.main.layers.toolbar = {
					component: 'alert',
					variant: 'error',
					text: function () {
						return satus.locale.get('thePageHOSTNAMEIsProtectedByBrowser').replace('HOSTNAME', url.protocol + '//' + url.hostname);
					}
				};
			} else {
				extension.skeleton.main.layers.toolbar = {
					component: 'alert',
					variant: 'success',

					switch: {
						component: 'switch',
						text: url.hostname,
						storage: 'websites/' + extension.hostname + '/active',
						value: true
					}
				};
			}

			satus.render(extension.skeleton);

			extension.exportSettings();
			extension.importSettings();
		});
	}, '_locales/');
});

chrome.runtime.sendMessage({
	action: 'options-page-connected'
}, function (response) {
	if (response && response.isTab) {
		document.body.setAttribute('tab', '');
	}
});