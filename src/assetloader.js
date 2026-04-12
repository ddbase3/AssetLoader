/*!
 * AssetLoader - Dynamic JavaScript & CSS Loader
 * https://github.com/ddbase3/AssetLoader
 *
 * Lightweight, modular asset loader for dynamically injecting JS and CSS files,
 * with duplicate protection, async/await support, and optional jQuery integration.
 * Ideal for CMS architectures and component-driven frontends.
 *
 * Author: Daniel Dahme / BASE3 (https://base3.de)
 * License: GPL v3.0 License
 */
const AssetLoader = (function() {
	const loaded = new Set();
	const loading = new Map();

	function loadScript(src, callback) {
		loadScriptAsync(src).then(function() {
			if (callback) {
				callback();
			}
		}).catch(function(error) {
			console.error('Failed to load script:', src, error);
		});
	}

	function loadCss(href, callback) {
		loadCssAsync(href).then(function() {
			if (callback) {
				callback();
			}
		}).catch(function(error) {
			console.error('Failed to load stylesheet:', href, error);
		});
	}

	function loadScriptAsync(src) {
		if (loaded.has(src)) {
			return Promise.resolve();
		}

		if (loading.has(src)) {
			return loading.get(src);
		}

		const existingScript = document.querySelector('script[src="' + src + '"]');

		if (existingScript) {
			const promise = new Promise(function(resolve, reject) {
				const state = existingScript.getAttribute('data-assetloader-state');

				if (state === 'loaded') {
					loaded.add(src);
					loading.delete(src);
					resolve();
					return;
				}

				if (state === 'error') {
					loading.delete(src);
					reject(new Error('Script previously failed to load: ' + src));
					return;
				}

				existingScript.addEventListener('load', function onLoad() {
					existingScript.removeEventListener('load', onLoad);
					existingScript.removeEventListener('error', onError);
					existingScript.setAttribute('data-assetloader-state', 'loaded');
					loaded.add(src);
					loading.delete(src);
					resolve();
				});

				existingScript.addEventListener('error', function onError() {
					existingScript.removeEventListener('load', onLoad);
					existingScript.removeEventListener('error', onError);
					existingScript.setAttribute('data-assetloader-state', 'error');
					loading.delete(src);
					reject(new Error('Failed to load script: ' + src));
				});
			});

			loading.set(src, promise);
			return promise;
		}

		const promise = new Promise(function(resolve, reject) {
			const script = document.createElement('script');
			script.src = src;
			script.async = true;
			script.setAttribute('data-assetloader-state', 'loading');

			script.onload = function() {
				script.setAttribute('data-assetloader-state', 'loaded');
				loaded.add(src);
				loading.delete(src);
				resolve();
			};

			script.onerror = function() {
				script.setAttribute('data-assetloader-state', 'error');
				loading.delete(src);
				reject(new Error('Failed to load script: ' + src));
			};

			document.head.appendChild(script);
		});

		loading.set(src, promise);
		return promise;
	}

	function loadCssAsync(href) {
		if (loaded.has(href)) {
			return Promise.resolve();
		}

		if (loading.has(href)) {
			return loading.get(href);
		}

		const existingLink = document.querySelector('link[rel="stylesheet"][href="' + href + '"]');

		if (existingLink) {
			const promise = new Promise(function(resolve, reject) {
				const state = existingLink.getAttribute('data-assetloader-state');

				if (state === 'loaded') {
					loaded.add(href);
					loading.delete(href);
					resolve();
					return;
				}

				if (state === 'error') {
					loading.delete(href);
					reject(new Error('Stylesheet previously failed to load: ' + href));
					return;
				}

				existingLink.addEventListener('load', function onLoad() {
					existingLink.removeEventListener('load', onLoad);
					existingLink.removeEventListener('error', onError);
					existingLink.setAttribute('data-assetloader-state', 'loaded');
					loaded.add(href);
					loading.delete(href);
					resolve();
				});

				existingLink.addEventListener('error', function onError() {
					existingLink.removeEventListener('load', onLoad);
					existingLink.removeEventListener('error', onError);
					existingLink.setAttribute('data-assetloader-state', 'error');
					loading.delete(href);
					reject(new Error('Failed to load stylesheet: ' + href));
				});
			});

			loading.set(href, promise);
			return promise;
		}

		const promise = new Promise(function(resolve, reject) {
			const link = document.createElement('link');
			link.rel = 'stylesheet';
			link.href = href;
			link.setAttribute('data-assetloader-state', 'loading');

			link.onload = function() {
				link.setAttribute('data-assetloader-state', 'loaded');
				loaded.add(href);
				loading.delete(href);
				resolve();
			};

			link.onerror = function() {
				link.setAttribute('data-assetloader-state', 'error');
				loading.delete(href);
				reject(new Error('Failed to load stylesheet: ' + href));
			};

			document.head.appendChild(link);
		});

		loading.set(href, promise);
		return promise;
	}

	if (typeof window.jQuery !== 'undefined') {
		(function($) {
			$.extend({
				loadScript: loadScript,
				loadScriptAsync: loadScriptAsync,
				loadCss: loadCss,
				loadCssAsync: loadCssAsync
			});
		})(jQuery);
	}

	return {
		loadScript: loadScript,
		loadCss: loadCss,
		loadScriptAsync: loadScriptAsync,
		loadCssAsync: loadCssAsync
	};
})();
