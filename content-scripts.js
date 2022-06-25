/*---------------------------------------------------------------
>>> extension.hid control prevention
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
		data: {},
		website: {}
	},
	hid: {
		alt: false,
		ctrl: false,
		shift: false,
		keys: {},
		wheel: 0,
		click: false,
		context: false
	}
};


/*--------------------------------------------------------------
# STORAGE
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GET
--------------------------------------------------------------*/

extension.storage.get = function (key) {
	var array = key.split('/'),
		target = extension.storage.data;

	for (var i = 0, l = array.length; i < l; i++) {
		var j = array[i];

		if (target[j] !== undefined) {
			target = target[j];

			if (i + 1 === l) {
				return target;
			}
		} else {
			return undefined;
		}
	}
};


/*--------------------------------------------------------------
# IMPORT
--------------------------------------------------------------*/

extension.storage.import = function (callback) {
	chrome.storage.local.get(function (items) {
		for (var key in items) {
			extension.storage.data[key] = items[key];
		}

		callback(items);
	});
};


/*---------------------------------------------------------------
1.0 FUNCTION
---------------------------------------------------------------*/

function isset(variable) {
	if (typeof variable === 'undefined' || variable === null) {
		return false;
	}

	return true;
}

function prevent(event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		for (var key in extension.storage.website.data) {
			var item = extension.storage.website[key],
				same_keys = true;

			if (item && typeof item === 'object') {
				if (extension.hid.keys && item.keys) {
					for (var code in extension.hid.keys) {
						if (!item.keys[code]) {
							same_keys = false;
						}
					}

					for (var code in item.keys) {
						if (!extension.hid.keys[code]) {
							same_keys = false;
						}
					}
				}

				if (
					same_keys === true &&
					(item.shift === extension.hid.shift || isset(item.shift) === false) &&
					(item.ctrl === extension.hid.ctrl || isset(item.ctrl) === false) &&
					(item.alt === extension.hid.alt || isset(item.alt) === false) &&
					(item.click === extension.hid.click || isset(item.click) === false) &&
					(item.context === extension.hid.context || isset(item.context) === false) &&
					(item.wheel === extension.hid.wheel || isset(item.wheel) === false)
				) {
					event.stopPropagation();
				}
			}
		}
	}
}

function hid_keyboard(event) {
	if (event.code === 'AltLeft' || event.code === 'AltRight') {
		extension.hid.alt = true;
	} else if (event.code === 'ControlLeft' || event.code === 'ControlRight') {
		extension.hid.ctrl = true;
	} else if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
		extension.hid.shift = true;
	} else {
		extension.hid.keys[event.keyCode] = true;
	}

	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		console.log(extension.storage.website.search === true,
			extension.hid.keys[70],
			extension.hid.shift === false,
			extension.hid.ctrl === true,
			extension.hid.alt === false);
		if (
			extension.storage.website.search === true &&
			extension.hid.keys[70] &&
			extension.hid.shift === false &&
			extension.hid.ctrl === true &&
			extension.hid.alt === false
		) {
			console.log('aaa');
			event.stopPropagation();
		}
	}
}


/*--------------------------------------------------------------
# INITIALIZATION
--------------------------------------------------------------*/

chrome.runtime.sendMessage('tab-connected', function (response) {
	extension.hostname = response;

	extension.storage.import(function () {
		if (extension.storage.get('websites/' + extension.hostname + '/separated') === true) {
			extension.storage.website = extension.storage.get('websites/' + extension.hostname);
		} else {
			extension.storage.website = extension.storage.get('global');
			extension.storage.website.active = extension.storage.get('websites/' + extension.hostname + '/active');
		}
	});
});

chrome.storage.onChanged.addListener(function () {
	extension.storage.import(function () {
		if (extension.storage.get('websites/' + extension.hostname + '/separated') === true) {
			extension.storage.website = extension.storage.get('websites/' + extension.hostname);
		} else {
			extension.storage.website = extension.storage.get('global');
			extension.storage.website.active = extension.storage.get('websites/' + extension.hostname + '/active');
		}
	});
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

	extension.hid = {
		alt: false,
		ctrl: false,
		shift: false,
		keys: {},
		wheel: 0,
		click: false,
		context: false
	};
}, true);


/*---------------------------------------------------------------
3.0 MOUSE
---------------------------------------------------------------*/

window.addEventListener('click', function (event) {
	extension.hid.click = true;
	extension.hid.context = false;
	extension.hid.wheel = false;

	prevent(event);

	extension.hid = {
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
	extension.hid.click = false;
	extension.hid.context = true;
	extension.hid.wheel = false;

	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.contextmenu === true) {
			event.stopPropagation();
		}
	}

	prevent(event);
}, true);

window.addEventListener('wheel', function (event) {
	extension.hid.click = false;
	extension.hid.context = false;
	extension.hid.wheel = event.deltaY < 0 ? -1 : 1;

	prevent(event);
}, true);

window.addEventListener('mousedown', function (event) {
	extension.hid.wheel = false;

	if (event.button === 0) {
		extension.hid.click = true;
		extension.hid.context = false;
	} else if (event.button === 2) {
		extension.hid.click = false;
		extension.hid.context = true;
	}

	prevent(event);
}, true);

window.addEventListener('mouseup', function (event) {
	extension.hid.wheel = false;

	if (event.button === 0) {
		extension.hid.click = true;
		extension.hid.context = false;
	} else if (event.button === 2) {
		extension.hid.click = false;
		extension.hid.context = true;
	}

	prevent(event);

	if (event.button === 2) {
		extension.hid = {
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
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.cut === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('copy', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.copy === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('paste', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.paste === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('select', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.select === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('drag', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.drag_and_drop === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('dragend', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.drag_and_drop === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('dragenter', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.drag_and_drop === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('dragstart', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.drag_and_drop === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('dragleave', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.drag_and_drop === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('dragover', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.drag_and_drop === true) {
			event.stopPropagation();
		}
	}
}, true);

window.addEventListener('drop', function (event) {
	if (isset(extension.storage.website.active) === false || extension.storage.website.active === true) {
		if (extension.storage.website.drag_and_drop === true) {
			event.stopPropagation();
		}
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