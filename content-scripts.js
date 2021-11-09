/*---------------------------------------------------------------
>>> HID control prevention
-----------------------------------------------------------------
# Global variable
# Storage
    # Get
    # Set
    # Import
# Initialization

1.0 Function
2.0 Keyboard
3.0 Mouse
4.0 Touch
---------------------------------------------------------------*/

/*--------------------------------------------------------------
# GLOBAL VARIABLE
--------------------------------------------------------------*/

var extension = {
        hostname: location.hostname,
        storage: {
            data: {}
        }
    };


/*--------------------------------------------------------------
# STORAGE
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GET
--------------------------------------------------------------*/

extension.storage.get = function (name) {
    return this.data[name];
};


/*--------------------------------------------------------------
# SET
--------------------------------------------------------------*/

extension.storage.set = function (name, value) {
    var object = {};

    object[name] = value;

    chrome.storage.local.set(object);
};


/*--------------------------------------------------------------
# IMPORT
--------------------------------------------------------------*/

extension.storage.import = function (callback) {
    chrome.storage.local.get(function (items) {
        for (var key in items) {
            extension.storage.data[key] = items[key];
        }

        callback();
    });
};


/*--------------------------------------------------------------
# INITIALIZATION
--------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.action === 'get-tab-hostname') {
        if (window === window.top) {
            sendResponse(extension.hostname);
        }
    }
});

chrome.runtime.sendMessage({
    action: 'get-tab-hostname'
}, function (response) {
    extension.hostname = response.hostname;

    extension.storage.import(function () {});
});


/*---------------------------------------------------------------
1.0 FUNCTION
---------------------------------------------------------------*/

var SETTINGS = {
        enabled: true
    },
    HID = {
        alt: false,
        ctrl: false,
        shift: false,
        keys: {},
        wheel: 0,
        click: false,
        context: false
    };

function isset(variable) {
    if (typeof variable === 'undefined' || variable === null) {
        return false;
    }

    return true;
}

function prevent(event) {
    if (isset(SETTINGS.enabled) === false || SETTINGS.enabled === true) {
        for (var key in SETTINGS.data) {
            var item = SETTINGS.data[key],
                same_keys = true;

            if (item && typeof item === 'object') {
                if (HID.keys && item.keys) {
                    for (var code in HID.keys) {
                        if (!item.keys[code]) {
                            same_keys = false;
                        }
                    }

                    for (var code in item.keys) {
                        if (!HID.keys[code]) {
                            same_keys = false;
                        }
                    }
                }

                if (
                    same_keys === true &&
                    (item.shift === HID.shift || isset(item.shift) === false) &&
                    (item.ctrl === HID.ctrl || isset(item.ctrl) === false) &&
                    (item.alt === HID.alt || isset(item.alt) === false) &&
                    (item.click === HID.click || isset(item.click) === false) &&
                    (item.context === HID.context || isset(item.context) === false) &&
                    (item.wheel === HID.wheel || isset(item.wheel) === false)
                ) {
                    event.stopPropagation();
                }
            }
        }
    }
}

function hid_keyboard(event) {
    HID = {
        alt: false,
        ctrl: false,
        shift: false,
        keys: {},
        wheel: 0,
        click: false,
        context: false
    };

    if (event.code === 'AltLeft' || event.code === 'AltRight') {
        HID.alt = true;
    } else if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
        HID.ctrl = true;
    } else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
        HID.shift = true;
    } else {
        HID.keys[event.keyCode] = true;
    }
}

function update() {
    chrome.storage.local.get(function (items) {
        var host = extension.hostname || location.hostname;

        SETTINGS.data = items.global || {};

        if (items.websites && items.websites[host]) {
            SETTINGS.enabled = items.websites[host].enabled;

            if (items.websites[host].items) {
                SETTINGS.data = Object.assign(SETTINGS.data, items.websites[host].items);
            }
        }
    });
}

update();

chrome.storage.onChanged.addListener(update);

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (window.self === window.top && request === 'requestTabUrl') {
        sendResponse(location.hostname);
    }
});


/*---------------------------------------------------------------
2.0 KEYBOARD
---------------------------------------------------------------*/

window.addEventListener('keydown', function (event) {
    hid_keyboard(event);
    prevent(event);
}, true);

window.addEventListener('keypress', function (event) {
    hid_keyboard(event);
    prevent(event);
}, true);

window.addEventListener('keyup', function (event) {
    hid_keyboard(event);
    prevent(event);
}, true);


/*---------------------------------------------------------------
3.0 MOUSE
---------------------------------------------------------------*/

window.addEventListener('click', function (event) {
    HID.click = true;
    HID.context = false;
    HID.wheel = false;

    prevent(event);

    HID = {
        alt: false,
        ctrl: false,
        shift: false,
        keys: {},
        wheel: 0,
        click: false,
        context: false
    };
}, true);

window.addEventListener('contextmenu', function (event) {
    HID.click = false;
    HID.context = true;
    HID.wheel = false;

    prevent(event);
}, true);

window.addEventListener('wheel', function (event) {
    HID.click = false;
    HID.context = false;
    HID.wheel = event.deltaY < 0 ? -1 : 1;

    prevent(event);
}, true);

window.addEventListener('mousedown', function (event) {
    HID.wheel = false;

    if (event.button === 0) {
        HID.click = true;
        HID.context = false;
    } else if (event.button === 2) {
        HID.click = false;
        HID.context = true;
    }

    prevent(event);
}, true);

window.addEventListener('mouseup', function (event) {
    HID.wheel = false;

    if (event.button === 0) {
        HID.click = true;
        HID.context = false;
    } else if (event.button === 2) {
        HID.click = false;
        HID.context = true;
    }

    prevent(event);

    if (event.button === 2) {
        HID = {
            alt: false,
            ctrl: false,
            shift: false,
            keys: {},
            wheel: 0,
            click: false,
            context: false
        };
    }
}, true);

window.addEventListener('cut', function (event) {
    if (SETTINGS.data.cut !== false) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('copy', function (event) {
    if (SETTINGS.data.copy !== false) {
        console.log('COPY', event);
        event.stopPropagation();
    }
}, true);

window.addEventListener('paste', function (event) {
    if (SETTINGS.data.paste !== false) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('select', function (event) {
    if (SETTINGS.data.select !== false) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('drag', function (event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragend', function (event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragenter', function (event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragstart', function (event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragleave', function (event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragover', function (event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('drop', function (event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

/*window.addEventListener('dbclick', prevent, true);
window.addEventListener('mousemove', prevent, true);*/


/*---------------------------------------------------------------
4.0 TOUCH
---------------------------------------------------------------*/

/*window.addEventListener('touchend', prevent, true);
window.addEventListener('touchmove', prevent, true);
window.addEventListener('touchstart', prevent, true);*/