//////////////////////////////////////////////////////////////////////////////80
// Atheos Specific Helper functions
//////////////////////////////////////////////////////////////////////////////80
// Copyright (c) Atheos & Liam Siira (Atheos.io), distributed as-is and without
// warranty under the modified License: MIT - Hippocratic 1.2: firstdonoharm.dev
// See [root]/license.md for more. This information must remain intact.
//////////////////////////////////////////////////////////////////////////////80
// Notes: 
// This helper module is potentially temporary, but will be used to
// help identify and reduce code repition across the application.
// Think of it like a temporary garbage dump of all functions that
// don't fit within the actual module I found them in.
//
// If any of these become long term solutions, more research will need
// to take place on each function to ensure it does what it says. Most
// of these were just pulled from a google search and kept if they 
// seemed to work.
//												- Liam Siira
//////////////////////////////////////////////////////////////////////////////80

'use strict';

var log = function(m, t) {
	if (t) {
		console.trace(m);
	} else {
		console.log(m);
	}
};

(function(global) {

	var codiad = global.codiad;



	codiad.helpers = {

		icons: {},
		settings: {},

		init: function(options) {
			if (options) {
				this.setings = this.extend(this.settings, options);
			}
		},

		file: {
			//////////////////////////////////////////////////////////////////
			// Return the node name (sans path)
			//////////////////////////////////////////////////////////////////

			getShortName: function(path) {
				return path.split('/').pop();
			},

			//////////////////////////////////////////////////////////////////
			// Return extension
			//////////////////////////////////////////////////////////////////

			getExtension: function(path) {
				return path.split('.').pop();
			},
		},

		//////////////////////////////////////////////////////////////////////
		// Extend used in:
		//   Toast.js
		//////////////////////////////////////////////////////////////////////

		extend: function(obj, src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) obj[key] = src[key];
			}
			return obj;
		},

		//////////////////////////////////////////////////////////////////////
		// Trigger used in:
		//   Sidebars.js
		//////////////////////////////////////////////////////////////////////
		trigger: function(selector, event) {
			if (!event || !selector) return;
			var element;
			if (selector.self == window) {
				element = selector;
			} else {
				element = selector.nodeType === Node.ELEMENT_NODE ? selector : document.querySelector(selector);
			}
			if (element) {
				if ('createEvent' in document) {
					// modern browsers, IE9+
					var e = document.createEvent('HTMLEvents');
					e.initEvent(event, false, true);
					element.dispatchEvent(e);
				} else {
					// IE 8
					var e = document.createEventObject();
					e.eventType = event;
					el.fireEvent('on' + e.eventType, e);
				}
			}
		},
		loadScript: function(url, arg1, arg2) {
			// console.trace('Custom LoadScripts');
			var cache = true,
				callback = null;
			//arg1 and arg2 can be interchangable
			if (typeof arg1 === 'function') {
				callback = arg1;
				cache = arg2 || cache;
			} else {
				cache = arg1 || cache;
				callback = arg2 || callback;
			}

			var load = true;
			//check all existing script tags in the page for the url
			jQuery('script[type="text/javascript"]').each(function() {
				load = (url !== $(this).attr('src'));
				return load;
			});
			if (load) {
				//didn't find it in the page, so load it
				jQuery.ajax({
					type: 'GET',
					url: url,
					success: callback,
					dataType: 'script',
					cache: cache
				});
			} else {
				//already loaded so just call the callback
				if (jQuery.isFunction(callback)) {
					callback.call(this);
				}
			}
		}
	};

})(this);