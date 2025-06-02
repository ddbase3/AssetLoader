# 🧩 AssetLoader – Dynamic JavaScript & CSS Loader

A lightweight JavaScript module to **dynamically load JavaScript and CSS files** with:

- Duplicate protection  
- Both **callback** and **Promise (`async/await`)** support  
- Optional **jQuery integration**

Perfect for modular CMS setups where individual components need to load their own resources on demand.

---

## 🚀 Features

- ✅ Load JS and CSS dynamically only when needed  
- ✅ Prevents duplicate loading  
- ✅ Supports both callback and `async/await` usage  
- ✅ Optional jQuery plugin interface (`$.loadScript`, `$.loadCss`)  
- ✅ Zero dependencies (except optional jQuery)  
- ✅ Easy to drop into any project

---

## 📦 Installation

### 📁 Manual

1. Download `assetloader.js` and place it in your project (e.g. `/js/assetloader.js`)  
2. Include it in your HTML:

```html
<script src="/js/assetloader.js"></script>
```

> jQuery is **not required**. If detected, jQuery methods are automatically added.

---

## 🛠️ API

- `AssetLoader.loadScript(src, callback?)`  
  Loads a JavaScript file unless it is already present.

- `AssetLoader.loadScriptAsync(src) → Promise`  
  Promise-based version of `loadScript`. Ideal for use with `async/await`.

- `AssetLoader.loadCss(href, callback?)`  
  Loads a CSS file unless it is already present.

- `AssetLoader.loadCssAsync(href) → Promise`  
  Promise-based version of `loadCss`.

---

## 🧪 Usage Examples

### 🔹 Example 1: Callback Usage

```javascript
AssetLoader.loadScript('/js/editor.js', () => {
    console.log('Editor loaded');
});

AssetLoader.loadCss('/css/editor.css');
```

---

### 🔹 Example 2: Using `async/await`

```javascript
(async () => {
    await AssetLoader.loadCssAsync('/css/admin.css');
    await AssetLoader.loadScriptAsync('/js/admin.js');
    console.log('Admin module fully loaded');
})();
```

---

### 🔹 Example 3: jQuery Integration

If jQuery is present, you can also use the loader as jQuery functions:

```javascript
$.loadScript('/js/modal.js', function () {
    console.log('Modal loaded');
});

$.loadCssAsync('/css/modal.css').then(() => {
    console.log('Stylesheet loaded');
});
```

---

## 📁 Example Directory Structure

```text
/js/
├── assetloader.js
├── editor.js
├── admin.js
├── modal.js
/css/
├── editor.css
├── admin.css
├── modal.css
index.html
```

---

## 📄 License

MIT License - free to use in personal and commercial projects.

---

## 👤 Author

Crafted with ❤️ for modular frontend architecture by **Daniel Dahme / BASE3 (https://base3.de)**. It is part of the ecosystem around [Contourz Photography](https://contourz.photo), a ballet-focused visual project, and adheres to modern front-end best practices.

