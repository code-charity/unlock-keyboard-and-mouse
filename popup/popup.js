/*---------------------------------------------------------------
>>> HID control prevention
-----------------------------------------------------------------
1.0 Object
2.0 Function
3.0 Tabs
---------------------------------------------------------------*/

/*---------------------------------------------------------------
1.0 OBJECT
---------------------------------------------------------------*/
var Menu = {
    header: {
        type: 'header',

        section_start: {
            type: 'section',
            class: 'satus-section--align-start',

            go_back: {
                type: 'button',
                class: 'satus-button--back',
                before: '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M14 18l-6-6 6-6"/></svg>',
                onclick: function() {
                    document.querySelector('.satus-main').back();
                }
            },
            title: {
                type: 'text',
                class: 'satus-text--title'
            }
        },
        section_end: {
            type: 'section',
            class: 'satus-section--align-end',

            button_vert: {
                type: 'button',
                icon: '<svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><circle cx="12" cy="5.25" r="0.45"/><circle cx="12" cy="12" r="0.45"/><circle cx="12" cy="18.75" r="0.45"/></svg>',
                onClickRender: {
                    type: 'dialog',
                    class: 'satus-dialog--vertical-menu',

                    rate_us: {
                        type: 'folder',
                        before: '<svg fill="none" stroke="var(--satus-theme-primary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3"/></svg>',
                        label: 'rateUs',
                        onclick: function() {
                            window.open('https://github.com/victor-savinov/hid-control-prevention');
                        }
                    },
                    github: {
                        type: 'folder',
                        before: '<svg fill="none" stroke="var(--satus-theme-primary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>',
                        label: 'GitHub',
                        onclick: function() {
                            window.open('https://github.com/victor-savinov/hid-control-prevention');
                        }
                    }
                }
            }
        }
    },
    main: {
        type: 'main',
        appearanceKey: 'home',
        on: {
            change: function(container) {
                var self = (this === window ? document.querySelector('.satus-main') : this),
                    item = self.history[self.history.length - 1],
                    id = item.appearanceKey;

                if (!Satus.isset(container)) {
                    container = document.querySelector('.satus-main__container');
                }

                document.querySelector('.satus-text--title').innerText = Satus.locale.getMessage(this.history[this.history.length - 1].label) || 'HID control prevention';

                document.body.dataset.appearance = id;
                container.dataset.appearance = id;
            }
        },

        tooltip: {
            type: 'section',
            class: 'satus-section--tooltip',

            enable: {
                type: 'switch',
                value: true
            }
        },

        section: {
            type: 'section',

            filters: {
                type: 'folder',
                label: 'filters',
                before: '<svg fill="none" stroke="var(--satus-theme-primary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
                appearanceKey: 'global'
            },
            websites: {
                type: 'folder',
                label: 'websites',
                before: '<svg fill="none" stroke="var(--satus-theme-primary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>',
                appearanceKey: 'websites',

                section: {
                    type: 'section',

                    onrender: function() {
                        var data = satus.storage.get('websites') || {},
                            list = {};

                        for (var key in data) {
                            list[key] = {
                                type: 'folder',
                                label: key,

                                section: {
                                    type: 'section',
                                    class: 'satus-section--shortcuts',
                                    storage_key: 'websites/' + key + '/items/',
                                    onrender: function() {
                                        var data = satus.storage.get(this.storage_key) || {},
                                            list = {},
                                            length = 0;

                                        for (var key in data) {
                                            list[key] = {
                                                type: 'section',
                                                class: 'satus-section--row',

                                                shortcut: {
                                                    type: 'shortcut',
                                                    storage_key: this.storage_key + key
                                                },
                                                remove: {
                                                    type: 'button',
                                                    class: 'satus-button--remove',
                                                    before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
                                                    storage_key: this.storage_key + key,
                                                    onclick: function() {
                                                        satus.storage.set(this.storage_key, undefined);

                                                        this.parentNode.style.height = 0;

                                                        setTimeout(function() {
                                                            this.parentNode.remove();
                                                        }, .2);
                                                    }
                                                }
                                            };

                                            length++;
                                        }

                                        if (length > 0) {
                                            satus.render(list, this);
                                        } else {
                                            satus.render({
                                                type: 'text',
                                                label: 'empty',
                                                style: {
                                                    margin: '0 16px'
                                                }
                                            }, this);
                                        }
                                    }
                                },
                                footer: {
                                    type: 'div',
                                    class: 'satus-div--create',

                                    button: {
                                        type: 'shortcut',
                                        class: 'satus-shortcut--create',
                                        label: 'Add new item',
                                        onclick: function() {
                                            this.skelet.storage_key = 'websites/' + HOSTNAME + '/items/' + new Date().getTime();
                                        }
                                    }
                                }
                            };
                        }

                        if (Object.keys(list).length > 0) {
                            satus.render(list, this);
                        } else {
                            satus.render({
                                type: 'text',
                                label: 'empty',
                                style: {
                                    margin: '0 16px'
                                }
                            }, this);
                        }
                    }
                }
            },
            settings: {
                type: 'folder',
                before: '<svg fill="none" stroke="var(--satus-theme-primary)" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>',
                label: 'settings',
                parent: '.satus-main__container',

                section: {
                    type: 'section',

                    language: {
                        label: 'language',
                        type: 'select',
                        before: '<svg fill="var(--satus-theme-primary)" stroke="none" viewBox="0 0 24 24"><path d="M12.9 15l-2.6-2.4c1.8-2 3-4.2 3.8-6.6H17V4h-7V2H8v2H1v2h11.2c-.7 2-1.8 3.8-3.2 5.3-1-1-1.7-2.1-2.3-3.3h-2c.7 1.6 1.7 3.2 3 4.6l-5.1 5L4 19l5-5 3.1 3.1.8-2zm5.6-5h-2L12 22h2l1.1-3H20l1.1 3h2l-4.5-12zm-2.6 7l1.6-4.3 1.6 4.3H16z" /></svg>',
                        onchange: function(name, value) {
                            Satus.memory.set('locale', {});

                            Satus.locale(function() {
                                document.querySelector('.satus-main__container').innerHTML = '';

                                document.querySelector('.satus-header__title').innerText = Satus.locale.getMessage('languages');
                                document.querySelector('#search').placeholder = Satus.locale.getMessage('search');

                                Satus.render(document.querySelector('.satus-main__container'), Menu.main.section.settings.section.languages);
                            });
                        },
                        options: [{
                            value: "en",
                            label: "English"
                        }, {
                            value: "ru",
                            label: "Русский"
                        }]
                    },
                    backup_and_reset: {
                        type: 'folder',
                        label: 'backupAndReset',
                        before: '<svg fill="var(--satus-theme-primary)" stroke="none" viewBox="0 0 24 24"><path d="M13.3 3A9 9 0 0 0 4 12H2.2c-.5 0-.7.5-.3.8l2.7 2.8c.2.2.6.2.8 0L8 12.8c.4-.3.1-.8-.3-.8H6a7 7 0 1 1 2.7 5.5 1 1 0 0 0-1.3.1 1 1 0 0 0 0 1.5A9 9 0 0 0 22 11.7C22 7 18 3.1 13.4 3zm-.6 5c-.4 0-.7.3-.7.8v3.6c0 .4.2.7.5.9l3.1 1.8c.4.2.8.1 1-.2.2-.4.1-.8-.2-1l-3-1.8V8.7c0-.4-.2-.7-.7-.7z" /></svg>',

                        section: {
                            type: 'section',
                            import_settings: {
                                type: 'button',
                                label: 'importSettings',

                                onclick: function() {
                                    try {
                                        var input = document.createElement('input');

                                        input.type = 'file';

                                        input.addEventListener('change', function() {
                                            var file_reader = new FileReader();

                                            file_reader.onload = function() {
                                                var data = JSON.parse(this.result);

                                                for (var i in data) {
                                                    Satus.storage.set(i, data[i]);
                                                }

                                                Satus.render({
                                                    type: 'dialog',
                                                    class: 'satus-dialog--confirm',

                                                    message: {
                                                        type: 'text',
                                                        label: 'successfullyImportedSettings'
                                                    },
                                                    section: {
                                                        type: 'section',
                                                        class: 'controls',
                                                        style: {
                                                            'justify-content': 'flex-end',
                                                            'display': 'flex'
                                                        },

                                                        cancel: {
                                                            type: 'button',
                                                            label: 'cancel',
                                                            onclick: function() {
                                                                var scrim = document.querySelectorAll('.satus-dialog__scrim');

                                                                scrim[scrim.length - 1].click();
                                                            }
                                                        },
                                                        ok: {
                                                            type: 'button',
                                                            label: 'OK',
                                                            onclick: function() {
                                                                var scrim = document.querySelectorAll('.satus-dialog__scrim');

                                                                scrim[scrim.length - 1].click();
                                                            }
                                                        }
                                                    }
                                                });
                                            };

                                            file_reader.readAsText(this.files[0]);
                                        });

                                        input.click();
                                    } catch (err) {
                                        chrome.runtime.sendMessage({
                                            name: 'dialog-error',
                                            value: err
                                        });
                                    }
                                }
                            },
                            export_settings: {
                                type: 'button',
                                label: 'exportSettings',

                                onclick: function() {
                                    chrome.runtime.sendMessage({
                                        name: 'download',
                                        filename: 'night-mode-settings',
                                        value: Satus.storage
                                    });
                                }
                            },
                            reset_all_settings: {
                                type: 'button',
                                label: 'resetAllSettings',

                                onclick: function() {
                                    Satus.render({
                                        type: 'dialog',
                                        class: 'satus-dialog--confirm',

                                        message: {
                                            type: 'text',
                                            label: 'thisWillResetAllSettings'
                                        },
                                        section: {
                                            type: 'section',
                                            class: 'controls',
                                            style: {
                                                'justify-content': 'flex-end',
                                                'display': 'flex'
                                            },

                                            cancel: {
                                                type: 'button',
                                                label: 'cancel',
                                                onclick: function() {
                                                    var scrim = document.querySelectorAll('.satus-dialog__scrim');

                                                    scrim[scrim.length - 1].click();
                                                }
                                            },
                                            accept: {
                                                type: 'button',
                                                label: 'accept',
                                                onclick: function() {
                                                    var scrim = document.querySelectorAll('.satus-dialog__scrim');

                                                    Satus.storage.clear();

                                                    scrim[scrim.length - 1].click();
                                                }
                                            }
                                        }
                                    });
                                }
                            }
                        }
                    },
                    about: {
                        type: 'folder',
                        before: '<svg fill="var(--satus-theme-primary)" stroke="none" viewBox="0 0 24 24"><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" /></svg>',
                        label: 'about',
                        appearanceKey: 'about',

                        section: {
                            type: 'section',

                            onrender: function() {
                                var component = this,
                                    manifest = chrome.runtime.getManifest(),
                                    user = Satus.modules.user(),
                                    object = {
                                        extension_section: {
                                            type: 'section',
                                            label: 'extension',
                                            style: {
                                                'flex-direction': 'column',
                                                'flex': '0'
                                            },

                                            version: {
                                                type: 'text',
                                                label: 'version',
                                                value: manifest.version
                                            },
                                            permissions: {
                                                type: 'text',
                                                label: 'permissions',
                                                value: manifest.permissions.join(', ').replace('https://www.youtube.com/', 'YouTube')
                                            },
                                        },
                                        browser_section: {
                                            type: 'section',
                                            label: 'browser',
                                            style: {
                                                'flex-direction': 'column',
                                                'flex': '0'
                                            },

                                            name: {
                                                type: 'text',
                                                label: 'name',
                                                value: user.browser.name
                                            },
                                            version: {
                                                type: 'text',
                                                label: 'version',
                                                value: user.browser.version
                                            },
                                            platform: {
                                                type: 'text',
                                                label: 'platform',
                                                value: user.browser.platform
                                            },
                                            video_formats: {
                                                type: 'text',
                                                label: 'videoFormats',
                                                value: user.browser.video
                                            },
                                            audio_formats: {
                                                type: 'text',
                                                label: 'audioFormats',
                                                value: user.browser.audio
                                            },
                                            flash: {
                                                type: 'text',
                                                label: 'flash',
                                                value: user.browser.flash ? true : false
                                            }
                                        },
                                        os_section: {
                                            type: 'section',
                                            label: 'os',
                                            style: {
                                                'flex-direction': 'column',
                                                'flex': '0'
                                            },

                                            os_name: {
                                                type: 'text',
                                                label: 'name',
                                                value: user.os.name
                                            },

                                            os_type: {
                                                type: 'text',
                                                label: 'type',
                                                value: user.os.type
                                            }
                                        },
                                        device_section: {
                                            type: 'section',
                                            label: 'device',
                                            style: {
                                                'flex-direction': 'column',
                                                'flex': '0'
                                            },

                                            screen: {
                                                type: 'text',
                                                label: 'screen',
                                                value: user.device.screen
                                            },
                                            cores: {
                                                type: 'text',
                                                label: 'cores',
                                                value: user.device.cores
                                            },
                                            gpu: {
                                                type: 'text',
                                                label: 'gpu',
                                                value: user.device.gpu
                                            },
                                            ram: {
                                                type: 'text',
                                                label: 'ram',
                                                value: user.device.ram
                                            }
                                        }
                                    };

                                setTimeout(function() {
                                    Satus.render(object, component.parentNode);

                                    component.remove();
                                });
                            }
                        }
                    }
                }
            }
        },

        made_with_love: {
            type: 'text',
            class: 'made-with-love',
            innerHTML: 'Made with <svg viewBox="0 0 24 24"><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"></svg> by <span>ImprovedTube</span>',
            onclick: function() {
                window.open('https://chrome.google.com/webstore/detail/improve-youtube-open-sour/bnomihfieiccainjcjblhegjgglakjdd');
            }
        }
    }
};


/*---------------------------------------------------------------
2.0 FUNCTION
---------------------------------------------------------------*/

function init(response) {
    HOSTNAME = response || '';

    satus.storage.import(function() {
        var language = satus.storage.get('language') || 'en';

        satus.locale.import('../_locales/' + language + '/messages.json', function() {
            satus.modules.updateStorageKeys(Menu, function() {
                if (HOSTNAME === '') {
                    Menu.main.tooltip.enable.type = 'text';
                    delete Menu.main.tooltip.enable.onrender;
                    delete Menu.main.tooltip.enable.onclick;
                    Menu.main.tooltip.enable.label = 'notAllowedtoAccessThisPage';
                    Menu.main.tooltip.enable.value = '';
                } else {
                    Menu.main.tooltip.enable.label = HOSTNAME;
                    Menu.main.tooltip.enable.storage_key = 'websites/' + HOSTNAME + '/enabled';
                }

                if (HOSTNAME !== '') {
                    Menu.main.section.filters.tabs = {
                        type: 'tabs',

                        global: {
                            type: 'tab',
                            label: 'global',

                            section_00: {
                                type: 'section',

                                clipboard: {
                                    type: 'folder',
                                    label: 'clipboard',

                                    section: {
                                        type: 'section',

                                        cut: {
                                            type: 'switch',
                                            label: 'cut',
                                            value: true,
                                            storage_key: 'global/cut'
                                        },
                                        copy: {
                                            type: 'switch',
                                            label: 'copy',
                                            value: true,
                                            storage_key: 'global/copy'
                                        },
                                        paste: {
                                            type: 'switch',
                                            label: 'paste',
                                            value: true,
                                            storage_key: 'global/paste'
                                        }
                                    }
                                },
                                select: {
                                    type: 'switch',
                                    label: 'select',
                                    value: true,
                                    storage_key: 'global/select'
                                },
                                drag_and_drop: {
                                    type: 'switch',
                                    label: 'dragAndDrop',
                                    value: true,
                                    storage_key: 'global/drag_and_drop'
                                }
                            },

                            section: {
                                type: 'section',
                                class: 'satus-section--shortcuts global',
                                onrender: function() {
                                    var data = satus.storage.get('global') || {},
                                        list = {
                                            search: {
                                                type: 'shortcut',
                                                value: {
                                                    key: "f",
                                                    keyCode: 70,
                                                    shiftKey: false,
                                                    ctrlKey: true,
                                                    altKey: false,
                                                    click: false,
                                                    context: false,
                                                    wheel: false
                                                },
                                                storage_key: 'global/search'
                                            }
                                        };

                                    for (var key in data) {
                                        if (['cut', 'copy', 'paste', 'select', 'drag_and_drop'].indexOf(key) === -1) {
                                            list[key] = {
                                                type: 'section',
                                                class: 'satus-section--row',

                                                shortcut: {
                                                    type: 'shortcut',
                                                    storage_key: 'global/' + key
                                                },
                                                remove: {
                                                    type: 'button',
                                                    class: 'satus-button--remove',
                                                    before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
                                                    storage_key: 'global/' + key,
                                                    onclick: function() {
                                                        satus.storage.set(this.storage_key, undefined);

                                                        this.parentNode.style.height = 0;

                                                        setTimeout(function() {
                                                            this.parentNode.remove();
                                                        }, 200);
                                                    }
                                                }
                                            };
                                        }
                                    }

                                    satus.render(list, this);
                                }
                            }
                        },
                        current: {
                            type: 'tab',
                            label: 'current',

                            section: {
                                type: 'section',
                                class: 'satus-section--shortcuts',
                                onrender: function() {
                                    var data = satus.storage.get('websites/' + HOSTNAME + '/items') || {},
                                        list = {},
                                        length = 0;

                                    for (var key in data) {
                                        list[key] = {
                                            type: 'section',
                                            class: 'satus-section--row',

                                            shortcut: {
                                                type: 'shortcut',
                                                storage_key: 'websites/' + HOSTNAME + '/items/' + key
                                            },
                                            remove: {
                                                type: 'button',
                                                class: 'satus-button--remove',
                                                before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
                                                storage_key: 'websites/' + HOSTNAME + '/items/' + key,
                                                onclick: function() {
                                                    satus.storage.set(this.storage_key, undefined);

                                                    this.parentNode.style.height = 0;

                                                    setTimeout(function() {
                                                        this.parentNode.remove();
                                                    }, .2);
                                                }
                                            }
                                        };

                                        length++;
                                    }

                                    if (length > 0) {
                                        satus.render(list, this);
                                    } else {
                                        satus.render({
                                            type: 'text',
                                            label: 'empty',
                                            style: {
                                                margin: '0 16px'
                                            }
                                        }, this);
                                    }
                                }
                            }
                        }
                    };
                } else {
                    Menu.main.section.filters.section_label = {
                        type: 'text',
                        class: 'satus-section--label',
                        label: 'global'
                    };

                    Menu.main.section.filters.section_00 = {
                        type: 'section',

                        clipboard: {
                            type: 'folder',
                            label: 'clipboard',

                            section: {
                                type: 'section',

                                cut: {
                                    type: 'switch',
                                    label: 'cut',
                                    value: true,
                                    storage_key: 'global/cut'
                                },
                                copy: {
                                    type: 'switch',
                                    label: 'copy',
                                    value: true,
                                    storage_key: 'global/copy'
                                },
                                paste: {
                                    type: 'switch',
                                    label: 'paste',
                                    value: true,
                                    storage_key: 'global/paste'
                                }
                            }
                        },
                        select: {
                            type: 'switch',
                            label: 'select',
                            value: true,
                            storage_key: 'global/select'
                        },
                        drag_and_drop: {
                            type: 'switch',
                            label: 'dragAndDrop',
                            value: true,
                            storage_key: 'global/drag_and_drop'
                        }
                    };

                    Menu.main.section.filters.section = {
                        type: 'section',
                        class: 'satus-section--shortcuts global',
                        onrender: function() {
                            var data = satus.storage.get('global') || {},
                                list = {
                                    search: {
                                        type: 'shortcut',
                                        value: {
                                            key: "f",
                                            keyCode: 70,
                                            shiftKey: false,
                                            ctrlKey: true,
                                            altKey: false,
                                            click: false,
                                            context: false,
                                            wheel: false
                                        },
                                        storage_key: 'global/search'
                                    }
                                };

                            for (var key in data) {
                                if (['cut', 'copy', 'paste', 'select', 'drag_and_drop'].indexOf(key) === -1) {
                                    list[key] = {
                                        type: 'section',
                                        class: 'satus-section--row',

                                        shortcut: {
                                            type: 'shortcut',
                                            storage_key: 'global/' + key
                                        },
                                        remove: {
                                            type: 'button',
                                            class: 'satus-button--remove',
                                            before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
                                            storage_key: 'global/' + key,
                                            onclick: function() {
                                                satus.storage.set(this.storage_key, undefined);

                                                this.parentNode.style.height = 0;

                                                setTimeout(function() {
                                                    this.parentNode.remove();
                                                }, .2);
                                            }
                                        }
                                    };
                                }
                            }

                            satus.render(list, this);
                        }
                    };
                }

                Menu.main.section.filters.footer = {
                    type: 'div',
                    class: 'satus-div--create',

                    button: {
                        type: 'shortcut',
                        class: 'satus-shortcut--create',
                        label: 'addNewFilter',
                        onclick: function() {
                            if (document.querySelector('.global')) {
                                this.skelet.storage_key = 'global/' + new Date().getTime();
                            } else {
                                this.skelet.storage_key = 'websites/' + HOSTNAME + '/items/' + new Date().getTime();
                            }
                        },
                        onchange: function(object, value) {
                            var item = {
                                type: 'section',
                                class: 'satus-section--row',

                                shortcut: {
                                    type: 'shortcut',
                                    storage_key: object.storage_key
                                },
                                remove: {
                                    type: 'button',
                                    class: 'satus-button--remove',
                                    before: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>',
                                    storage_key: object.storage_key,
                                    onclick: function() {
                                        satus.storage.set(this.storage_key, undefined);

                                        this.parentNode.style.height = 0;

                                        setTimeout(function() {
                                            this.parentNode.remove();
                                        }, 200);
                                    }
                                }
                            };
                            
                            if (document.querySelector('.global')) {
                                satus.render(item, document.querySelector('.global'));
                            } else {
                                if (document.querySelector('.satus-section--shortcuts .satus-text')) {
                                    document.querySelector('.satus-section--shortcuts .satus-text').remove();
                                }
                                
                                satus.render(item, document.querySelector('.satus-section--shortcuts'));
                            }
                        }
                    }
                };

                satus.render(Menu);
            });
        });
    });
}


/*---------------------------------------------------------------
3.0 TABS
---------------------------------------------------------------*/

chrome.tabs.query({
    currentWindow: true,
    active: true
}, function(tabs) {
    if (tabs[0].hasOwnProperty('url')) {
        chrome.tabs.sendMessage(tabs[0].id, 'requestTabUrl', init);
    } else {
        init();
    }
});
