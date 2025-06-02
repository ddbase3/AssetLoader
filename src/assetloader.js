/*!
 * AssetLoader – Dynamic JavaScript & CSS Loader
 * https://github.com/ddbase3/AssetLoader
 *
 * Lightweight, modular asset loader for dynamically injecting JS and CSS files,
 * with duplicate protection, async/await support, and optional jQuery integration.
 * Ideal for CMS architectures and component-driven frontends.
 *
 * Author: Daniel Dahme / BASE3 (https://base3.de)
 * License: MIT License
 */
const AssetLoader = (function () {
    const loaded = new Set();

    function loadScript(src, callback) {
        if (loaded.has(src) || document.querySelector(`script[src="${src}"]`)) {
            callback?.();
            return;
        }

        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => {
            loaded.add(src);
            callback?.();
        };
        document.head.appendChild(script);
    }

    function loadCss(href, callback) {
        if (loaded.has(href) || document.querySelector(`link[rel="stylesheet"][href="${href}"]`)) {
            callback?.();
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = () => {
            loaded.add(href);
            callback?.();
        };
        document.head.appendChild(link);
    }

    function loadScriptAsync(src) {
        return new Promise((resolve) => {
            loadScript(src, resolve);
        });
    }

    function loadCssAsync(href) {
        return new Promise((resolve) => {
            loadCss(href, resolve);
        });
    }

    if (typeof window.jQuery !== 'undefined') {
        (function ($) {
            $.extend({
                loadScript: loadScript,
                loadScriptAsync: loadScriptAsync,
                loadCss: loadCss,
                loadCssAsync: loadCssAsync
            });
        })(jQuery);
    }

    return {
        loadScript,
        loadCss,
        loadScriptAsync,
        loadCssAsync
    };
})();

