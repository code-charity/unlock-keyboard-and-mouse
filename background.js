/*--------------------------------------------------------------
>>> BACKGROUND
----------------------------------------------------------------
# Update listener
# Message listener
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# UPDATE LISTENER
--------------------------------------------------------------*/

chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.local.get(function (items) {
        if (items.global) {
            var global_items = {},
                founded = false;

            for (var key in items.global) {
                var item = items.global[key];

                if (typeof item === 'string') {
                    try {
                        item = JSON.parse(item);

                        if (item) {
                            var value = {
                                alt: item.altKey,
                                ctrl: item.ctrlKey,
                                shift: item.shiftKey
                            };

                            if (item.hasOwnProperty('key') && item.hasOwnProperty('keyCode')) {
                                value.keys = {};

                                value.keys[item.keyCode] = {
                                    key: item.key
                                };
                            }

                            if (item.click) {
                                value.click = item.click;
                            }

                            if (item.context) {
                                value.context = item.context;
                            }

                            if (item.wheel) {
                                value.wheel = item.wheel < 0 ? -1 : 1;
                            }

                            global_items[key] = value;

                            founded = true;
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
            }

            if (founded === true) {
                if (items.global.cut) {
                    global_items.cut = true;
                }

                if (items.global.copy) {
                    global_items.copy = true;
                }

                if (items.global.paste) {
                    global_items.paste = true;
                }

                if (items.global.select) {
                    global_items.select = true;
                }

                if (items.global.drag_and_drop) {
                    global_items.drag_and_drop = true;
                }

                items.global = global_items;
            }
        }

        if (items.websites) {
            for (var hostname in items.websites) {
                var website = items.websites[hostname],
                    website_items = {},
                    founded = false;

                for (var key in website.items) {
                    var item = website.items[key];

                    if (typeof item === 'string') {
                        try {
                            item = JSON.parse(item);

                            if (item) {
                                var value = {
                                    alt: item.altKey,
                                    ctrl: item.ctrlKey,
                                    shift: item.shiftKey
                                };

                                if (item.hasOwnProperty('key') && item.hasOwnProperty('keyCode')) {
                                    value.keys = {};

                                    value.keys[item.keyCode] = {
                                        key: item.key
                                    };
                                }

                                if (item.click) {
                                    value.click = item.click;
                                }

                                if (item.context) {
                                    value.context = item.context;
                                }

                                if (item.wheel) {
                                    value.wheel = item.wheel < 0 ? -1 : 1;
                                }

                                website_items[key] = value;

                                founded = true;
                            }
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }

                if (founded === true) {
                    website.items = website_items;
                }
            }
        }

        chrome.storage.local.set(items);
    });
});


/*--------------------------------------------------------------
# MESSAGE LISTENER
--------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'get-tab-hostname') {
        sendResponse({
            hostname: new URL(sender.tab.url).hostname,
            id: sender.tab.id
        });
    }
});