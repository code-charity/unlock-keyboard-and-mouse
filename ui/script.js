/*--------------------------------------------------------------
>>> USER INTERFACE:
----------------------------------------------------------------
# Skeleton
# Initialization
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# SKELETON
--------------------------------------------------------------*/

var current_domain,
	skeleton = {
		component: 'base',

		header: {
			component: 'header',

			section_1: {
				component: 'section',
				variant: 'align-start',

				back: {
					component: 'button',
					attr: {
						'hidden': 'true'
					},
					on: {
						click: 'layers.back'
					},

					svg: {
						component: 'svg',
						attr: {
							'viewBox': '0 0 24 24',
							'fill': 'none',
							'stroke-width': '1.5',
							'stroke': 'currentColor'
						},

						path: {
							component: 'path',
							attr: {
								'd': 'M14 18l-6-6 6-6'
							}
						}
					}
				},
				title: {
					component: 'span',
					variant: 'title'
				}
			},
			section_2: {
				component: 'section',
				variant: 'align-end',

				menu: {
	                component: 'button',
	                on: {
	                    click: {
	                        component: 'modal',
	                        variant: 'vertical',

	                        label: {
	                        	component: 'span',
	                        	text: 'theme'
	                        },
	                        theme: {
	                        	component: 'tabs',
	                        	items: [
	                        		'light',
	                        		'dark',
	                        		'black'
	                        	]
	                        },
	                        divider: {
	                        	component: 'divider'
	                        },
	                        language: {
								component: 'select',
								on: {
									change: function (name, value) {
										var self = this;

										satus.ajax('_locales/' + this.querySelector('select').value + '/messages.json', function (response) {
											response = JSON.parse(response);

											for (var key in response) {
												satus.locale.strings[key] = response[key].message;
											}

											self.base.skeleton.header.section_1.title.rendered.textContent = satus.locale.get('languages');

											self.base.skeleton.layers.rendered.update();
										});
									}
								},
								options: [{
									value: 'en',
									text: 'English'
								}, {
									value: 'ru',
									text: 'Русский'
								}, {
									value: 'de',
									text: 'Deutsch'
								}],

								svg: {
									component: 'svg',
									attr: {
										'viewBox': '0 0 24 24',
										'fill': 'currentColor'
									},

									path: {
										component: 'path',
										attr: {
											'd': 'M12.9 15l-2.6-2.4c1.8-2 3-4.2 3.8-6.6H17V4h-7V2H8v2H1v2h11.2c-.7 2-1.8 3.8-3.2 5.3-1-1-1.7-2.1-2.3-3.3h-2c.7 1.6 1.7 3.2 3 4.6l-5.1 5L4 19l5-5 3.1 3.1.8-2zm5.6-5h-2L12 22h2l1.1-3H20l1.1 3h2l-4.5-12zm-2.6 7l1.6-4.3 1.6 4.3H16z'
										}
									}
								},
								label: {
									component: 'span',
									text: 'language'
								}
							},
							export: {
								component: 'button',
	                            on: {
	                                click: function () {
	                                    if (location.href.indexOf('/options.html?action=export') !== -1) {
	                                        exportData();
	                                    } else {
	                                        chrome.tabs.create({
	                                            url: 'ui/options.html?action=export'
	                                        });
	                                    }
	                                }
	                            },

								svg: {
									component: 'svg',
									attr: {
										'viewBox': '0 0 24 24',
										'fill': 'none',
										'stroke': 'currentColor',
										'stroke-linecap': 'round',
										'stroke-linejoin': 'round',
										'stroke-width': '2'
									},

									path: {
										component: 'path',
										attr: {
											'd': 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12'
										}
									}
								},
								label: {
									component: 'span',
									text: 'export'
								}
							},
							import: {
								component: 'button',
	                            on: {
	                                click: function () {
	                                    if (location.href.indexOf('/options.html?action=import') !== -1) {
	                                        importData();
	                                    } else {
	                                        chrome.tabs.create({
	                                            url: 'ui/options.html?action=import'
	                                        });
	                                    }
	                                }
	                            },

								svg: {
									component: 'svg',
									attr: {
										'viewBox': '0 0 24 24',
										'fill': 'none',
										'stroke': 'currentColor',
										'stroke-linecap': 'round',
										'stroke-linejoin': 'round',
										'stroke-width': '2'
									},

									path: {
										component: 'path',
										attr: {
											'd': 'M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3'
										}
									}
								},
								label: {
									component: 'span',
									text: 'import'
								}
							}
	                    }
	                },

	                svg: {
	                    component: 'svg',
	                    attr: {
	                        'viewBox': '0 0 24 24',
	                        'fill': 'currentColor'
	                    },

	                    circle_1: {
	                        component: 'circle',
	                        attr: {
	                            'cx': '12',
	                            'cy': '5.25',
	                            'r': '1'
	                        }
	                    },
	                    circle_2: {
	                        component: 'circle',
	                        attr: {
	                            'cx': '12',
	                            'cy': '12',
	                            'r': '1'
	                        }
	                    },
	                    circle_3: {
	                        component: 'circle',
	                        attr: {
	                            'cx': '12',
	                            'cy': '18.75',
	                            'r': '1'
	                        }
	                    }
	                }
	            }
			}
		},
		layers: {
			component: 'layers',
			on: {
				open: function () {
					var skeleton = this.path[this.path.length - 1],
						parent = skeleton.parent,
						section = this.base.skeleton.header.section_1,
						is_home = this.path.length <= 1,
						title = 'HID Control Prevention';

					if (parent) {
						if (parent.label) {
							title = parent.label.text;
						} else if (parent.text) {
							title = parent.text;
						}
					}

					section.back.rendered.hidden = is_home;
					section.title.rendered.innerText = satus.locale.get(title);
				}
			},

			toolbar: {},
			section: {
				component: 'section',
				class: 'satus-section--card',

				filters: {
					component: 'button',
					on: {
						click: {
							tabs: {
								component: 'tabs',
								storage: false,
								on: {
									beforerender: function (skeleton) {
										var item = (current_domain || '...');

										skeleton.items = ['global', item];

										if (satus.storage.get('websites/' + current_domain + '/filters/global') === false) {
											skeleton.value = item;
										}
									},
									change: function () {
										var layer = this.parentNode;

										if (this.storageValue === 'global') {
											satus.empty(layer, [this]);

											satus.render(this.skeleton.parent.section, layer);
											satus.render(this.skeleton.parent.shortcuts, layer);
											satus.render(this.skeleton.parent.create, layer);
										} else {
											satus.empty(layer, [this]);

											satus.render({
												component: 'section',
												variant: 'card',
												on: {
													render: function () {
														var data = satus.storage.get('websites/' + current_domain + '/items') || {};

														for (var key in data) {
															var storage = 'websites/' + current_domain + '/items/' + key;

				                                            satus.render({
				                                                component: 'section',
				                                                variant: 'row',

				                                                shortcut: {
				                                                    component: 'shortcut',
				                                                    storage: storage
				                                                },
				                                                remove: {
				                                                    component: 'button',
				                                                    variant: 'remove',
				                                                    storage: storage,
				                                                    on: {
				                                                    	click: function() {
					                                                        satus.storage.set(this.storage, undefined);

					                                                        this.parentNode.remove();
					                                                    }
				                                                    },

				                                                    icon: {
				                                                    	component: 'svg',
				                                                    	attr: {
				                                                    		'viewBox': '0 0 24 24',
				                                                    		'width': '24',
				                                                    		'height': '24',
				                                                    		'fill': 'none',
				                                                    		'stroke': 'currentColor',
				                                                    		'stroke-width': '1.75',
				                                                    		'stroke-linecap': 'round',
				                                                    		'stroke-linejoin': 'round'
				                                                    	},

				                                                    	line_1: {
				                                                    		component: 'line',
				                                                    		attr: {
				                                                    			'x1': '18',
				                                                    			'y1': '6',
				                                                    			'x2': '6',
				                                                    			'y2': '18'
				                                                    		}
				                                                    	},
				                                                    	line_2: {
				                                                    		component: 'line',
				                                                    		attr: {
				                                                    			'x1': '6',
				                                                    			'y1': '6',
				                                                    			'x2': '18',
				                                                    			'y2': '18'
				                                                    		}
				                                                    	}
				                                                    }
				                                                }
				                                            }, this);
					                                    }
													}
												}
											}, layer);

											satus.render({
												component: 'div',
												variant: 'create',

												shortcut: {
													component: 'shortcut',
													variant: 'create',
													text: 'addNewFilter',
													storage: false,
													on: {
														change: function() {
															satus.storage.set('websites/' + current_domain + '/items/' + new Date().getTime(), this.storageValue);
															
															var section = this.parentNode.parentNode.children[1];

															satus.empty(section);

															section.dispatchEvent(new CustomEvent('render'));
														}
													}
												}
											}, layer);
										}
									}
								}
							},
							section: {
								component: 'section',
								variant: 'card',
								on: {
									beforerender: function (skeleton) {
										
									}
								},

								clipboard: {
	                                component: 'button',
	                                text: 'clipboard',
	                                on: {
	                                	click: {
	                                		section: {
			                                    component: 'section',
			                                    variant: 'card',

			                                    cut: {
			                                        component: 'switch',
			                                        text: 'cut',
			                                        value: true,
			                                        storage: 'global/cut'
			                                    },
			                                    copy: {
			                                        component: 'switch',
			                                        text: 'copy',
			                                        value: true,
			                                        storage: 'global/copy'
			                                    },
			                                    paste: {
			                                        component: 'switch',
			                                        text: 'paste',
			                                        value: true,
			                                        storage: 'global/paste'
			                                    }
			                                }
	                                	}
	                                }
	                            },
	                            select: {
	                                component: 'switch',
	                                text: 'select',
	                                value: true,
	                                storage: 'global/select'
	                            },
	                            drag_and_drop: {
	                                component: 'switch',
	                                text: 'dragAndDrop',
	                                storage: 'global/drag_and_drop'
	                            }
							},
							shortcuts: {
								component: 'section',
								variant: 'card',
								style: {
									marginBottom: '88px'
								},
								on: {
									render: function () {
										var data = satus.storage.get('global') || {},
	                                        list = {
	                                            search: {
	                                                component: 'shortcut',
	                                                value: {
	                                                    ctrl: true,
	                                                    keys: {
	                                                        70: {
	                                                            key: 'f'
	                                                        }
	                                                    }
	                                                },
	                                                storage: 'global/search'
	                                            }
	                                        };

	                                    for (var key in data) {
	                                        if (['cut', 'copy', 'paste', 'select', 'drag_and_drop'].indexOf(key) === -1) {
	                                            list[key] = {
	                                                component: 'section',
	                                                variant: 'row',

	                                                shortcut: {
	                                                    component: 'shortcut',
	                                                    storage: 'global/' + key
	                                                },
	                                                remove: {
	                                                    component: 'button',
	                                                    variant: 'remove',
	                                                    storage: 'global/' + key,
	                                                    on: {
	                                                    	click: function() {
		                                                        satus.storage.set(this.storage, undefined);

		                                                        this.parentNode.remove();
		                                                    }
	                                                    },

	                                                    icon: {
	                                                    	component: 'svg',
	                                                    	attr: {
	                                                    		'viewBox': '0 0 24 24',
	                                                    		'width': '24',
	                                                    		'height': '24',
	                                                    		'fill': 'none',
	                                                    		'stroke': 'currentColor',
	                                                    		'stroke-width': '1.75',
	                                                    		'stroke-linecap': 'round',
	                                                    		'stroke-linejoin': 'round'
	                                                    	},

	                                                    	line_1: {
	                                                    		component: 'line',
	                                                    		attr: {
	                                                    			'x1': '18',
	                                                    			'y1': '6',
	                                                    			'x2': '6',
	                                                    			'y2': '18'
	                                                    		}
	                                                    	},
	                                                    	line_2: {
	                                                    		component: 'line',
	                                                    		attr: {
	                                                    			'x1': '6',
	                                                    			'y1': '6',
	                                                    			'x2': '18',
	                                                    			'y2': '18'
	                                                    		}
	                                                    	}
	                                                    }
	                                                }
	                                            };
	                                        }
	                                    }

	                                    satus.render(list, this);
									}
								}
							},
							create: {
								component: 'div',
								variant: 'create',

								shortcut: {
									component: 'shortcut',
									variant: 'create',
									text: 'addNewFilter',
									storage: false,
									on: {
										change: function() {
											satus.storage.set('global/' + new Date().getTime(), this.storageValue);

											var section = this.skeleton.parent.parent.shortcuts;

											satus.empty(section.rendered);

											section.rendered.dispatchEvent(new CustomEvent('render'));
										}
									}
								}
							}
						}
					},

					icon: {
						component: 'svg',
						attr: {
							'viewBox': '0 0 24 24',
							'fill': 'none',
							'stroke': 'var(--satus-primary)',
							'stroke-linecap': 'round',
							'stroke-linejoin': 'round',
							'stroke-width': '1.75'
						},

						circle_1: {
							component: 'circle',
							attr: {
								'cx': '12',
								'cy': '12',
								'r': '10'
							}
						},
						circle_2: {
							component: 'circle',
							attr: {
								'cx': '12',
								'cy': '12',
								'r': '6'
							}
						},
						circle_3: {
							component: 'circle',
							attr: {
								'cx': '12',
								'cy': '12',
								'r': '2'
							}
						}
					},
					label: {
						component: 'span',
						text: 'filters'
					}
				},
				websites: {
					component: 'button',
					on: {
						click: {
							component: 'section',
							variant: 'card',
							on: {
								render: function () {
									var data = satus.storage.get('websites') || {};

									for (var key in data) {
										satus.render({
											component: 'button',
											on: {
												click: {
													component: 'section',
													variant: 'card',
													properties: {
														hostname: key
													},
													on: {
														render: function () {
															var data = satus.storage.get('websites/' + this.hostname + '/items') || {};

															for (var key in data) {
																var storage = 'websites/' + this.hostname + '/items/' + key;

					                                            satus.render({
					                                                component: 'section',
					                                                variant: 'row',

					                                                shortcut: {
					                                                    component: 'shortcut',
					                                                    storage: storage
					                                                },
					                                                remove: {
					                                                    component: 'button',
					                                                    variant: 'remove',
					                                                    storage: storage,
					                                                    on: {
					                                                    	click: function() {
						                                                        satus.storage.set(this.storage, undefined);

						                                                        this.parentNode.remove();
						                                                    }
					                                                    },

					                                                    icon: {
					                                                    	component: 'svg',
					                                                    	attr: {
					                                                    		'viewBox': '0 0 24 24',
					                                                    		'width': '24',
					                                                    		'height': '24',
					                                                    		'fill': 'none',
					                                                    		'stroke': 'currentColor',
					                                                    		'stroke-width': '1.75',
					                                                    		'stroke-linecap': 'round',
					                                                    		'stroke-linejoin': 'round'
					                                                    	},

					                                                    	line_1: {
					                                                    		component: 'line',
					                                                    		attr: {
					                                                    			'x1': '18',
					                                                    			'y1': '6',
					                                                    			'x2': '6',
					                                                    			'y2': '18'
					                                                    		}
					                                                    	},
					                                                    	line_2: {
					                                                    		component: 'line',
					                                                    		attr: {
					                                                    			'x1': '6',
					                                                    			'y1': '6',
					                                                    			'x2': '18',
					                                                    			'y2': '18'
					                                                    		}
					                                                    	}
					                                                    }
					                                                }
					                                            }, this);
						                                    }
														}
													}
												}
											},

											favicon: {
												component: 'img',
												properties: {
													src: 'chrome://favicon/https://' + key
												}
											},
											label: {
												component: 'span',
												text: key.replace('www.', '')
											}
										}, this);
									}
								}
							}
						}
					},

					icon: {
						component: 'svg',
						attr: {
							'viewBox': '0 0 24 24',
							'fill': 'none',
							'stroke': 'var(--satus-primary)',
							'stroke-linecap': 'round',
							'stroke-linejoin': 'round',
							'stroke-width': '1.75'
						},

						circle: {
							component: 'circle',
							attr: {
								'cx': '12',
								'cy': '12',
								'r': '10'
							}
						},
						path: {
							component: 'path',
							attr: {
								'd': 'M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z'
							}
						}
					},
					label: {
						component: 'span',
						text: 'websites'
					}
				}
			},

			made_with_love: {
				component: 'a',
				class: 'made-with-love',
				attr: {
					target: '_blank',
					href: 'https://chrome.google.com/webstore/detail/improve-youtube-open-sour/bnomihfieiccainjcjblhegjgglakjdd'
				},
				properties: {
					innerHTML: 'Made with <svg viewBox="0 0 24 24"><path d="M13.35 20.13c-.76.69-1.93.69-2.69-.01l-.11-.1C5.3 15.27 1.87 12.16 2 8.28c.06-1.7.93-3.33 2.34-4.29 2.64-1.8 5.9-.96 7.66 1.1 1.76-2.06 5.02-2.91 7.66-1.1 1.41.96 2.28 2.59 2.34 4.29.14 3.88-3.3 6.99-8.55 11.76l-.1.09z"></svg> by <span>ImprovedTube</span>'
				}
			}
		}
	};


/*--------------------------------------------------------------
# FUNCTIONS
--------------------------------------------------------------*/

function exportData() {
	if (location.href.indexOf('action=export') !== -1) {
        var blob;

        try {
        	blob = new Blob([JSON.stringify(satus.storage.data)], {
		        type: 'application/json;charset=utf-8'
		    });
        } catch (error) {
        	return modalError(error);
        }

	    satus.render({
	    	component: 'modal',

	    	label: {
	    		component: 'span',
	    		text: 'areYouSureYouWantToExportTheData'
	    	},
	    	actions: {
	    		component: 'section',
	    		variant: 'actions',

	    		ok: {
					component: 'button',
					text: 'ok',
					on: {
						click: function () {
							try {
								chrome.permissions.request({
				                    permissions: ['downloads']
				                }, function (granted) {
				                    if (granted) {
				                        chrome.downloads.download({
				                            url: URL.createObjectURL(blob),
				                            filename: 'hid-control-prevention.json',
				                            saveAs: true
				                        }, function () {
				                            setTimeout(function () {
				                            	close();
				                            }, 1000);
				                        });
				                    }
				                });
				            } catch (error) {
			                	return modalError(error);
			                }

							this.parentNode.parentNode.parentNode.close();
						}
					}
				},
				cancel: {
					component: 'button',
					text: 'cancel',
					on: {
						click: function () {
							this.parentNode.parentNode.parentNode.close();
						}
					}
				}
	    	}
	    });
    }
}

function importData() {
	if (location.href.indexOf('action=import') !== -1) {
        satus.render({
	    	component: 'modal',

	    	label: {
	    		component: 'span',
	    		text: 'areYouSureYouWantToImportTheData'
	    	},
	    	actions: {
	    		component: 'section',
	    		variant: 'actions',

	    		ok: {
					component: 'button',
					text: 'ok',
					on: {
						click: function () {
							var input = document.createElement('input');

			                input.type = 'file';

			                input.addEventListener('change', function () {
			                    var file_reader = new FileReader();

			                    file_reader.onload = function () {
			                        var data = JSON.parse(this.result);

			                        for (var key in data) {
			                            satus.storage.set(key, data[key]);
			                        }

			                        close();
			                    };

			                    file_reader.readAsText(this.files[0]);
			                });

			                input.click();

							this.parentNode.parentNode.parentNode.close();
						}
					}
				},
				cancel: {
					component: 'button',
					text: 'cancel',
					on: {
						click: function () {
							this.parentNode.parentNode.parentNode.close();
						}
					}
				}
	    	}
	    });
    }
}


/*--------------------------------------------------------------
# INITIALIZATION
--------------------------------------------------------------*/

satus.storage.attributes = {
	'hide-made-with-love': true,
    'theme': true
};

satus.storage.import(function (items) {
	satus.locale.import(items.language, '../_locales/', function () {
		chrome.tabs.query({
			active: true,
			currentWindow: true
		}, function (tabs) {
			chrome.tabs.sendMessage(tabs[0].id, {
				action: 'get-tab-hostname'
			}, function (response) {
				if (!response) {
					skeleton.layers.toolbar = {
						component: 'alert',
						text: 'somethingWentWrongTryReloadingThePage',
						variant: 'error'
					};
				} else {
					current_domain = response;

					skeleton.layers.toolbar = {
						component: 'switch',
						class: 'satus-switch--domain',
						text: response,
						storage: 'websites/' + response + '/enabled',
						value: true
					};
				}

				satus.render(skeleton);
			});
		});
	});
});