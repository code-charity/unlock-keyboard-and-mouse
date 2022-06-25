/*--------------------------------------------------------------
>>> SKELETON
----------------------------------------------------------------
# Base
# Header
# Main
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# BASE
--------------------------------------------------------------*/

extension.skeleton = {
	component: 'base'
};


/*--------------------------------------------------------------
# HEADER
--------------------------------------------------------------*/

extension.skeleton.header = {
	component: 'header',

	sectionStart: {
		component: 'section',
		variant: 'align-start',

		back: {
			component: 'button',
			variant: 'icon',
			attr: {
				'hidden': 'true'
			},
			on: {
				click: 'main.layers.back'
			},

			svg: {
				component: 'svg',
				attr: {
					'viewBox': '0 0 24 24',
					'stroke-width': '1.5',
					'stroke': 'currentColor',
					'fill': 'none'
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
	sectionEnd: {
		component: 'section',
		variant: 'align-end',

		menu: {
			component: 'button',
			variant: 'icon',
			on: {
				click: {
					component: 'modal',
					variant: 'vertical-menu',

					label: {
						component: 'span',
						text: 'settingsPer',
						style: {
							height: 'auto',
							margin: '0 0 12px'
						}
					},
					separate: {
						component: 'tabs',
						items: function () {
							return [
								'global',
								extension.hostname.replace('www.', '')
							];
						},
						value: function () {
							return satus.storage.get('websites/' + extension.hostname + '/separated') === true ? 1 : 0;
						},
						on: {
							click: function () {
								if (this.value === 1) {
									satus.storage.set('websites/' + extension.hostname + '/separated', true);
								} else {
									satus.storage.set('websites/' + extension.hostname + '/separated', false);
								}

								satus.empty(extension.skeleton.main.layers.section.rendered);

								satus.render(extension.skeleton.main.layers.rendered.path[0].section, extension.skeleton.main.layers.section.rendered, undefined, true);
							}
						}
					},
					divider: {
						component: 'divider'
					},
					theme: {
						component: 'select',
						before: {
							component: 'svg',
							attr: {
								'viewBox': '0 0 24 24',
								'fill': 'var(--satus-primary)'
							},

							path: {
								component: 'path',
								attr: {
									'd': 'M12.05 22q-.82 0-1.59-.11-.76-.12-1.56-.39.53-.28.94-.7.41-.42.71-.95.35.07.76.11.42.04.79.04 1.33 0 2.6-.42 1.28-.43 2.15-1.23-2.15-.73-3.83-2.11-1.67-1.39-2.73-3.23-1.06-1.83-1.44-3.98-.37-2.15.05-4.38-2.22.8-3.56 2.94Q4 9.72 4 12q-.53 0-1.04.11-.51.12-.96.34-.07-2 .59-3.8.66-1.8 1.88-3.2 1.23-1.4 2.9-2.3 1.68-.9 3.63-1.1.4-.05.56.2.16.25-.01.65-1.05 2.33-.86 4.72.18 2.4 1.32 4.4 1.14 1.98 3.12 3.33t4.52 1.6q.42.05.56.31.14.26-.11.59-1.43 2-3.54 3.08Q14.45 22 12.05 22ZM7 20H4q-1.25 0-2.13-.86Q1 18.27 1 17q0-1.25.88-2.13T4 14q.97 0 1.74.56.76.56 1.06 1.44H7q.82 0 1.41.59T9 18q0 .82-.59 1.41Q7.83 20 7 20Zm3.42-7.67Z'
								}
							}
						},
						text: 'theme',
						on: {
							change: function () {
								if (this.storage.value === 'dark') {
									document.body.setAttribute('theme', 'dark');
								} else {
									document.body.removeAttribute('theme');
								}
							}
						},
						options: [{
								text: 'light',
								value: 'light'
							},
							{
								text: 'dark',
								value: 'dark'
							}
						]
					},
					language: {
						component: 'select',
						before: {
							component: 'svg',
							attr: {
								'viewBox': '0 0 24 24',
								'fill': 'var(--satus-primary)'
							},

							path: {
								component: 'path',
								attr: {
									'd': 'M12.9 15l-2.6-2.4c1.8-2 3-4.2 3.8-6.6H17V4h-7V2H8v2H1v2h11.2c-.7 2-1.8 3.8-3.2 5.3-1-1-1.7-2.1-2.3-3.3h-2c.7 1.6 1.7 3.2 3 4.6l-5.1 5L4 19l5-5 3.1 3.1.8-2zm5.6-5h-2L12 22h2l1.1-3H20l1.1 3h2l-4.5-12zm-2.6 7l1.6-4.3 1.6 4.3H16z'
								}
							}
						},
						text: 'language',
						on: {
							change: function () {
								var language = satus.storage.get('language');

								if (!language || language === 'default') {
									language = window.navigator.language;
								}

								satus.locale.import(language, function () {
									var layers = document.querySelector('.satus-layers');

									extension.skeleton.main.layers.rendered.dispatchEvent(new CustomEvent('open'));

									satus.empty(layers.firstChild);

									satus.render(satus.last(layers.path), layers.firstChild, undefined, true);
								}, '_locales/');
							}
						},
						options: [{
								value: 'en',
								text: 'English'
							},
							{
								value: 'he',
								text: 'עברית'
							}, {
								value: 'ru',
								text: 'Русский'
							}, {
								value: 'de',
								text: 'Deutsch'
							}, {
								value: 'ar',
								text: 'العربية'
							}
						]
					},
					export: {
						component: 'button',
						text: 'export',
						before: {
							component: 'svg',
							attr: {
								'viewBox': '0 0 24 24',
								'fill': 'none',
								'stroke': 'var(--satus-primary)',
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
						on: {
							click: function () {
								if (location.href.indexOf('options-page/index.html?action=export-settings') !== -1) {
									extension.exportSettings();
								} else {
									chrome.tabs.create({
										url: 'options-page/index.html?action=export-settings'
									});
								}
							}
						}
					},
					import: {
						component: 'button',
						text: 'import',
						before: {
							component: 'svg',
							attr: {
								'viewBox': '0 0 24 24',
								'fill': 'none',
								'stroke': 'var(--satus-primary)',
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
						on: {
							click: function () {
								if (location.href.indexOf('options-page/index.html?action=import-settings') !== -1) {
									extension.importSettings();
								} else {
									chrome.tabs.create({
										url: 'options-page/index.html?action=import-settings'
									});
								}
							}
						}
					}
				}
			},

			svg: {
				component: 'svg',
				attr: {
					'viewBox': '0 0 24 24',
					'stroke-width': '2',
					'stroke': 'currentColor',
					'fill': 'none'
				},

				circle1: {
					component: 'circle',
					attr: {
						'cx': '12',
						'cy': '5.25',
						'r': '0.45'
					}
				},
				circle2: {
					component: 'circle',
					attr: {
						'cx': '12',
						'cy': '12',
						'r': '0.45'
					}
				},
				circle3: {
					component: 'circle',
					attr: {
						'cx': '12',
						'cy': '18.75',
						'r': '0.45'
					}
				}
			}
		}
	}
};


/*--------------------------------------------------------------
# MAIN
--------------------------------------------------------------*/

extension.skeleton.main = {
	component: 'main',

	layers: {
		component: 'layers',
		on: {
			open: function () {
				var skeleton = satus.last(this.path),
					section = this.baseProvider.skeleton.header.sectionStart,
					title = satus.manifest().name;

				if (skeleton.parentSkeleton) {
					if (skeleton.parentSkeleton.label) {
						title = skeleton.parentSkeleton.label.text;
					} else if (skeleton.parentSkeleton.text) {
						title = skeleton.parentSkeleton.text;
					}
				}

				section.back.rendered.hidden = this.path.length <= 1;
				section.title.rendered.innerText = satus.locale.get(title);

				var vertical_menu = document.querySelector('.satus-modal--vertical-menu');

				if (vertical_menu) {
					vertical_menu.close();
				}
			}
		},

		toolbar: {},
		section: {
			component: 'section',
			variant: 'card',

			clipboard: {
				component: 'button',
				before: {
					component: 'svg',
					attr: {
						'fill': 'var(--satus-primary)',
						'viewBox': '0 0 24 24'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'M11.025 19.85h-5.3q-.675 0-1.125-.45-.45-.45-.45-1.125V5.7q0-.675.438-1.113.437-.437 1.062-.437h4.675q.125-.6.575-.988.45-.387 1.075-.387t1.075.387q.45.388.575.988H18.3q.675 0 1.113.437.437.438.437 1.113v4.325h-.9v-4.35q0-.225-.2-.425-.2-.2-.425-.2H15.9v.625q0 .65-.45 1.1-.45.45-1.075.45H9.65q-.65 0-1.1-.45-.45-.45-.45-1.1V5.05H5.7q-.25 0-.437.2-.188.2-.188.425V18.3q0 .25.188.438.187.187.437.187h5.325Zm4.45-2.075 5.3-5.3q.125-.15.313-.15.187 0 .337.15.15.15.15.325 0 .175-.15.325L16 18.55q-.225.225-.537.225-.313 0-.538-.225l-2.6-2.625q-.15-.125-.15-.313 0-.187.15-.337.15-.15.325-.15.175 0 .325.15Zm-3.45-12.55q.3 0 .525-.225.225-.225.225-.55 0-.325-.225-.538-.225-.212-.525-.212-.35 0-.562.212-.213.213-.213.538 0 .325.213.55.212.225.562.225Z'
						}
					}
				},
				text: 'clipboard',
				on: {
					click: {
						section: {
							component: 'section',
							variant: 'card',

							cut: {
								component: 'switch',
								before: {
									component: 'svg',
									attr: {
										'fill': 'var(--satus-primary)',
										'viewBox': '0 0 24 24'
									},

									path: {
										component: 'path',
										attr: {
											'd': 'm19.65 21.225-7.6-7.6L9.3 16.35q.225.375.313.8.087.425.087.85 0 1.5-1.075 2.575Q7.55 21.65 6.05 21.65q-1.525 0-2.6-1.075Q2.375 19.5 2.375 18q0-1.5 1.075-2.575 1.075-1.075 2.6-1.075.425 0 .85.088.425.087.8.287L10.425 12 7.7 9.275q-.375.2-.8.287-.425.088-.85.088-1.525 0-2.6-1.075Q2.375 7.5 2.375 6q0-1.5 1.075-2.575Q4.525 2.35 6.025 2.35q1.525 0 2.6 1.075Q9.7 4.5 9.7 6q0 .425-.087.85-.088.425-.313.8L21.275 19.6q.325.35.325.813 0 .462-.325.812-.35.35-.825.35t-.8-.35ZM14.8 10.85l-1.6-1.625 6.45-6.45q.325-.35.8-.35.475 0 .825.35.325.35.325.812 0 .463-.325.813Zm-8.75-2.7q.9 0 1.525-.625Q8.2 6.9 8.2 6q0-.9-.625-1.525Q6.95 3.85 6.05 3.85q-.925 0-1.55.625T3.875 6q0 .9.625 1.525.625.625 1.55.625Zm5.975 4.1q.125 0 .2-.062.075-.063.075-.188 0-.1-.075-.175-.075-.075-.175-.075-.125 0-.187.062-.063.063-.063.188 0 .1.063.175.062.075.162.075Zm-5.975 7.9q.9 0 1.525-.625Q8.2 18.9 8.2 18q0-.9-.625-1.525-.625-.625-1.525-.625-.925 0-1.55.625T3.875 18q0 .9.625 1.525.625.625 1.55.625Z'
										}
									}
								},
								text: 'cut',
								storage: function () {
									var prefix = 'websites/' + extension.hostname;

									if (satus.storage.get(prefix + '/separated') === true) {
										return prefix + '/cut';
									} else {
										return 'global/cut';
									}
								}
							},
							copy: {
								component: 'switch',
								before: {
									component: 'svg',
									attr: {
										'fill': 'var(--satus-primary)',
										'viewBox': '0 0 24 24'
									},

									path: {
										component: 'path',
										attr: {
											'd': 'M9.28 17.8q-.78 0-1.3-.53T7.45 16V4.62q0-.77.53-1.3t1.3-.52h8.35q.75 0 1.28.54.54.54.54 1.29V16q0 .75-.54 1.27-.53.53-1.28.53Zm0-1.5h8.35q.15 0 .23-.09.09-.09.09-.21V4.62q0-.15-.09-.23-.08-.09-.23-.09H9.28q-.15 0-.24.09t-.09.24V16q0 .13.09.21.09.09.24.09Zm-3.53 5q-.75 0-1.27-.53-.53-.52-.53-1.27V7.55q0-.3.21-.52.21-.23.54-.23.3 0 .53.23.22.22.22.52V19.5q0 .13.09.21.08.09.21.09h8.95q.3 0 .53.23.22.22.22.52 0 .33-.23.54-.22.21-.52.21Zm3.2-17v12-12Z'
										}
									}
								},
								text: 'copy',
								storage: function () {
									var prefix = 'websites/' + extension.hostname;

									if (satus.storage.get(prefix + '/separated') === true) {
										return prefix + '/copy';
									} else {
										return 'global/copy';
									}
								}
							},
							paste: {
								component: 'switch',
								before: {
									component: 'svg',
									attr: {
										'fill': 'var(--satus-primary)',
										'viewBox': '0 0 24 24'
									},

									path: {
										component: 'path',
										attr: {
											'd': 'M12 5.125q.375 0 .637-.263.263-.262.263-.662 0-.375-.263-.638Q12.375 3.3 12 3.3t-.637.262q-.263.263-.263.663 0 .375.263.637.262.263.637.263ZM5.3 20.5q-.75 0-1.275-.525Q3.5 19.45 3.5 18.7V5.3q0-.75.525-1.275Q4.55 3.5 5.3 3.5h4.425q.2-.725.837-1.213Q11.2 1.8 12 1.8q.825 0 1.463.487.637.488.837 1.213h4.4q.75 0 1.275.525.525.525.525 1.275v13.4q0 .75-.525 1.275-.525.525-1.275.525Zm0-1.5h13.4q.1 0 .2-.1t.1-.2V5.3q0-.1-.1-.2t-.2-.1h-2.2v.8q0 .75-.525 1.288-.525.537-1.275.537H9.3q-.75 0-1.275-.537Q7.5 6.55 7.5 5.8V5H5.3q-.1 0-.2.1t-.1.2v13.4q0 .1.1.2t.2.1Z'
										}
									}
								},
								text: 'paste',
								storage: function () {
									var prefix = 'websites/' + extension.hostname;

									if (satus.storage.get(prefix + '/separated') === true) {
										return prefix + '/paste';
									} else {
										return 'global/paste';
									}
								}
							}
						}
					}
				}
			},
			contextmenu: {
				component: 'switch',
				before: {
					component: 'svg',
					attr: {
						'fill': 'var(--satus-primary)',
						'viewBox': '0 0 24 24'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'M2.38 20.57V3.07h9.5v4h9.74v13.5Zm1.5-1.5h6.5v-2.5h-6.5Zm0-4h6.5v-2.5h-6.5Zm0-4h6.5v-2.5h-6.5Zm0-4h6.5v-2.5h-6.5Zm8 12h8.24V8.57h-8.25Zm2.17-6.5v-1.5h3.7v1.5Zm0 4v-1.5h3.7v1.5Z'
						}
					}
				},
				text: 'contextMenu',
				storage: function () {
					var prefix = 'websites/' + extension.hostname;

					if (satus.storage.get(prefix + '/separated') === true) {
						return prefix + '/contextmenu';
					} else {
						return 'global/contextmenu';
					}
				}
			},
			select: {
				component: 'switch',
				before: {
					component: 'svg',
					attr: {
						'fill': 'var(--satus-primary)',
						'viewBox': '0 0 24 24'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'M3 5q0-.825.587-1.413Q4.175 3 5 3v2Zm0 8v-2h2v2Zm4 8v-2h2v2ZM3 9V7h2v2Zm8-4V3h2v2Zm8 0V3q.825 0 1.413.587Q21 4.175 21 5ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19h2Zm-2-4v-2h2v2ZM7 5V3h2v2Zm4 16v-2h2v2Zm8-8v-2h2v2Zm0 8v-2h2q0 .825-.587 1.413Q19.825 21 19 21Zm0-12V7h2v2Zm0 8v-2h2v2Zm-4 4v-2h2v2Zm0-16V3h2v2ZM8 17q-.425 0-.713-.288Q7 16.425 7 16V8q0-.425.287-.713Q7.575 7 8 7h8q.425 0 .712.287Q17 7.575 17 8v8q0 .425-.288.712Q16.425 17 16 17Zm1-2h6V9H9Z'
						}
					}
				},
				text: 'select',
				storage: function () {
					var prefix = 'websites/' + extension.hostname;

					if (satus.storage.get(prefix + '/separated') === true) {
						return prefix + '/select';
					} else {
						return 'global/select';
					}
				}
			},
			drag_and_drop: {
				component: 'switch',
				before: {
					component: 'svg',
					attr: {
						'fill': 'var(--satus-primary)',
						'viewBox': '0 0 24 24'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'M17.8 22.8q1.88-.23 3.3-1.63 1.43-1.4 1.7-3.37.03-.28-.16-.46-.19-.19-.46-.19-.2 0-.38.16-.17.16-.2.39-.25 1.52-1.31 2.61-1.06 1.09-2.59 1.29-.23.05-.39.21-.16.17-.16.39 0 .3.19.48.18.17.46.12ZM1.8 6.85q.23 0 .4-.16.18-.17.2-.39.25-1.5 1.33-2.6T6.3 2.4q.23-.05.39-.21.16-.17.16-.39 0-.28-.19-.45-.19-.18-.46-.15-1.95.25-3.34 1.65Q1.48 4.25 1.2 6.2q-.03.28.15.46.17.19.45.19Zm2.5 13.1q-2.32-2.33-2.32-5.46 0-3.14 2.32-5.47l3.58-3.57q.6-.6 1.43-.6.84 0 1.44.6.15.17.25.4t.03.48l2.92-2.93q.6-.63 1.44-.61.83.01 1.43.61.18.17.25.39.08.21.08.41l.4-.4q.6-.47 1.37-.41.78.06 1.33.61.55.57.56 1.27.01.7-.49 1.43.23-.03.45.07t.43.3q.6.6.6 1.44t-.6 1.44l-1 1q.23-.07.46-.01.24.06.44.26.6.6.6 1.45t-.6 1.45l-5.88 5.85q-2.32 2.33-5.46 2.33-3.13 0-5.46-2.33ZM7.38 9.6l2.3-2.33q.17-.17.17-.38 0-.22-.17-.37-.15-.17-.37-.16-.21.01-.38.16l-3.58 3.55q-.95.95-1.41 2.1-.46 1.13-.46 2.32 0 1.18.46 2.32t1.41 2.09q.95.95 2.09 1.41 1.13.46 2.32.46t2.33-.46q1.14-.46 2.09-1.41l5.85-5.88q.17-.17.17-.38 0-.22-.17-.37-.18-.17-.38-.17t-.38.17l-2.92 2.9q-.23.25-.6.25t-.63-.25q-.27-.27-.27-.63 0-.37.27-.62l5-5.02q.18-.18.18-.39 0-.21-.17-.39-.15-.15-.37-.16-.21-.01-.38.16l-4.33 4.33q-.25.28-.61.28t-.64-.28q-.25-.25-.25-.63t.28-.62l5.37-5.37q.15-.18.15-.4 0-.2-.15-.38-.17-.15-.39-.15-.21 0-.39.15l-5.4 5.4q-.25.25-.6.25-.37 0-.62-.25-.28-.27-.28-.64 0-.36.28-.61l3.95-3.97q.17-.18.17-.4 0-.2-.17-.35-.15-.18-.36-.18-.22 0-.39.18l-6.13 6.1q.45 1.12.4 2.3-.07 1.17-.7 2.27-.2.35-.6.39-.42.04-.75-.31-.17-.15-.2-.44-.02-.29.13-.51.4-.78.44-1.63.03-.85-.37-1.65-.17-.38-.13-.76.03-.39.28-.64Z'
						}
					}
				},
				text: 'dragAndDrop',
				storage: function () {
					var prefix = 'websites/' + extension.hostname;

					if (satus.storage.get(prefix + '/separated') === true) {
						return prefix + '/drag_and_drop';
					} else {
						return 'global/drag_and_drop';
					}
				}
			},
			search: {
				component: 'switch',
				before: {
					component: 'svg',
					attr: {
						'fill': 'var(--satus-primary)',
						'viewBox': '0 0 24 24'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'm19.55 20.57-6.3-6.27q-.75.62-1.73.97-.97.35-2 .35-2.57 0-4.34-1.77Q3.4 12.07 3.4 9.5q0-2.55 1.77-4.34 1.78-1.79 4.35-1.79 2.55 0 4.33 1.78 1.77 1.77 1.77 4.35 0 1.07-.35 2.05-.35.97-.95 1.7l6.28 6.28ZM9.52 14.13q1.93 0 3.27-1.34 1.34-1.35 1.34-3.28 0-1.93-1.34-3.27-1.34-1.36-3.26-1.36-1.95 0-3.3 1.35Q4.9 7.58 4.9 9.5q0 1.93 1.34 3.27 1.34 1.36 3.29 1.36Z'
						}
					}
				},
				text: 'search',
				storage: function () {
					var prefix = 'websites/' + extension.hostname;

					if (satus.storage.get(prefix + '/separated') === true) {
						return prefix + '/search';
					} else {
						return 'global/search';
					}
				}
			},
			custom: {
				component: 'button',
				before: {
					component: 'svg',
					attr: {
						'fill': 'var(--satus-primary)',
						'viewBox': '0 0 24 24'
					},

					path: {
						component: 'path',
						attr: {
							'd': 'm18 8.2-.875-1.95-1.925-.875 1.925-.85.875-1.95.875 1.95 1.925.85-1.925.875Zm0 13.225-.875-1.95-1.925-.85 1.925-.875L18 15.8l.875 1.95 1.925.875-1.925.85Zm-9.225-3.85-1.725-3.85L3.2 12l3.85-1.725 1.725-3.85 1.725 3.85L14.35 12l-3.85 1.725Zm0-2.425 1-2.15 2.15-1-2.15-1-1-2.15-1 2.15-2.15 1 2.15 1Zm0-3.15Z'
						}
					}
				},
				text: 'custom',
				on: {
					click: {
						section: {
							component: 'section',
							variant: 'card',
							style: {
								marginBottom: '88px'
							},
							on: {
								render: function () {
									var data,
										storage = 'global/',
										list = {};

									if (satus.storage.get('websites/' + extension.hostname + '/separated') === true) {
										storage = 'websites/' + extension.hostname + '/';

										data = satus.storage.get(storage) || {};

									} else {
										data = satus.storage.get(storage) || {};
									}

									for (var key in data) {
										if (key.match(/^[0-9]{4,}/)) {
											list[key] = {
												component: 'section',
												variant: 'custom',

												shortcut: {
													component: 'shortcut',
													storage: storage + key,
													mouseButtons: true
												},
												remove: {
													component: 'button',
													variant: 'remove',
													storage: storage + key,
													on: {
														click: function () {
															satus.storage.remove(this.skeleton.parentSkeleton.shortcut.rendered.storage.key);

															this.parentNode.remove();
														}
													},

													svg: {
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
							},

							add: {
								component: 'shortcut',
								variant: 'create',
								text: 'addNewFilter',
								storage: false,
								mouseButtons: true,
								on: {
									change: function () {
										satus.storage.set('global/' + new Date().getTime(), this.storage.value);

										var layers = document.querySelector('.satus-layers');

										extension.skeleton.main.layers.rendered.dispatchEvent(new CustomEvent('open'));

										satus.empty(layers.firstChild);

										satus.render(satus.last(layers.path), layers.firstChild, undefined, true);
									}
								}
							}
						}
					}
				}
			}
		}
	}
};