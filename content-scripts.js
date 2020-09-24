/*---------------------------------------------------------------
>>> HID control prevention
-----------------------------------------------------------------
1.0 Function
2.0 Keyboard
3.0 Mouse
4.0 Touch
---------------------------------------------------------------*/

/*---------------------------------------------------------------
1.0 FUNCTION
---------------------------------------------------------------*/

var SETTINGS = {
    enabled: true
},
HID = {
    key: false,
    shiftKey: false,
    ctrlKey: false,
    altKey: false,
    click: false,
    context: false,
    wheel: false
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
            var data = JSON.parse(SETTINGS.data[key]);

            if (
                (data.key === HID.key || isset(data.key) === false) &&
                (data.shiftKey === HID.shiftKey || isset(data.shiftKey) === false) &&
                (data.ctrlKey === HID.ctrlKey || isset(data.ctrlKey) === false) &&
                (data.altKey === HID.altKey || isset(data.altKey) === false) &&
                data.click === HID.click &&
                data.context === HID.context &&
                data.wheel === HID.wheel
            ) {
                console.log('STOP');
                event.stopPropagation();
            }
        }
    }
}

function hid_keyboard(event) {
    HID = {
        key: event.key,
        shiftKey: event.shiftKey,
        ctrlKey: event.ctrlKey,
        altKey: event.altKey,
        click: false,
        context: false,
        wheel: false
    };
    
    if (HID.key === 'Shift') {
        HID.shiftKey = true;
    }
    
    if (HID.key === 'Control') {
        HID.ctrlKey = true;
    }
    
    if (HID.key === 'Alt') {
        HID.altKey = true;
    }
}

function update() {
    chrome.storage.local.get(function(items) {
        var host = location.ancestorOrigins && location.ancestorOrigins[0] && location.ancestorOrigins[0].split('/')[2] || location.host;

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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (window.self === window.top && request === 'requestTabUrl') {
        sendResponse(location.host);
    }
});


/*---------------------------------------------------------------
2.0 KEYBOARD
---------------------------------------------------------------*/

window.addEventListener('keydown', function(event) {
    hid_keyboard(event);
    prevent(event);
}, true);

window.addEventListener('keypress', function(event) {
    hid_keyboard(event);
    prevent(event);
}, true);

window.addEventListener('keyup', function(event) {
    hid_keyboard(event);
    prevent(event);
}, true);


/*---------------------------------------------------------------
3.0 MOUSE
---------------------------------------------------------------*/

window.addEventListener('click', function(event) {
    HID.click = true;
    HID.context = false;
    HID.wheel = false;
    
    prevent(event);
    
    HID = {
        key: false,
        shiftKey: false,
        ctrlKey: false,
        altKey: false,
        click: false,
        context: false,
        wheel: false
    };
}, true);

window.addEventListener('contextmenu', function(event) {
    HID.click = false;
    HID.context = true;
    HID.wheel = false;
    
    prevent(event);
}, true);

window.addEventListener('wheel', function(event) {
    HID.click = false;
    HID.context = false;
    HID.wheel = true;
    
    prevent(event);
}, true);

window.addEventListener('mousedown', function(event) {
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

window.addEventListener('mouseup', function(event) {
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
            key: false,
            shiftKey: false,
            ctrlKey: false,
            altKey: false,
            click: false,
            context: false,
            wheel: false
        };
    }
}, true);

window.addEventListener('cut', function(event) {
    if (SETTINGS.data.cut !== false) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('copy', function(event) {
    if (SETTINGS.data.copy !== false) {
        console.log('COPY', event);
        event.stopPropagation();
    }
}, true);

window.addEventListener('paste', function(event) {
    if (SETTINGS.data.paste !== false) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('select', function(event) {
    if (SETTINGS.data.select !== false) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('drag', function(event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragend', function(event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragenter', function(event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragstart', function(event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragleave', function(event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('dragover', function(event) {
    if (SETTINGS.data.drag_and_drop === true) {
        event.stopPropagation();
    }
}, true);

window.addEventListener('drop', function(event) {
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
