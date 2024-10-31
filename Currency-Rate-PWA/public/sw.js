var STATIC_CACHE = "STATIC_CACHE_43"
var DYNAMIC_CACHE = "DYNAMIC_CACHE_34"

console.log("in service worker")

self.addEventListener("install", function(event) {
    console.log("[Service Worker Installing Service Worker ...", event);
    event.waitUntil(
        caches.open(STATIC_CACHE).then(async function(cache) {
        console.log("[Service Worker] Precaching App Shell"); 
           const urlsToCache = [
            "/",
            "/offline.html",
            "/index.html",
            "/src/js/app.js",
            "/src/js/fetch.js",
            "/src/js/feed.js",
            "/src/js/promise.js",
            "/src/js/polyfill.js",
            "/src/js/material.min.js",
            "/src/css/styles.css",
            "/src/images/icons/dollar-3-48x48.png",
            "/src/images/icons/dollar-3-57x57.png",
            "/src/images/icons/dollar-3-60x60.png",
            "/src/images/icons/dollar-3-72x72.png",
            "/src/images/icons/dollar-3-96x96.png",
            "/src/images/icons/dollar-3-120x120.png",
            "/src/images/icons/dollar-3-144x144.png",
            "/src/images/icons/dollar-3-152x152.png",
            "/src/images/icons/dollar-3-180x180.png",
            "/src/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf",
            "/src/fonts/Montserrat/Montserrat-VariableFont_wght.ttf",
            "/src/fonts/Montserrat/static/Montserrat-Medium.ttf",
            "/src/fonts/Montserrat/static/Montserrat-ThinItalic.ttf",
            "/src/fonts/Montserrat/static/Montserrat-Thin.ttf",
            "/src/fonts/Montserrat/static/Montserrat-SemiBoldItalic.ttf",
            "/src/fonts/Montserrat/static/Montserrat-SemiBold.ttf",
            "/src/fonts/Montserrat/static/Montserrat-Regular.ttf",
            "/src/fonts/Montserrat/static/Montserrat-MediumItalic.ttf",
            "/src/fonts/Montserrat/static/Montserrat-LightItalic.ttf",
            "/src/fonts/Montserrat/static/Montserrat-Light.ttf",
            "/src/fonts/Montserrat/static/Montserrat-Italic.ttf",
            "/src/fonts/Montserrat/static/Montserrat-ExtraLightItalic.ttf",
            "/src/fonts/Montserrat/static/Montserrat-ExtraLight.ttf",
            "/src/fonts/Montserrat/static/Montserrat-ExtraBoldItalic.ttf",
            "/src/fonts/Montserrat/static/Montserrat-ExtraBold.ttf",
            "/src/fonts/Montserrat/static/Montserrat-BoldItalic.ttf",
            "/src/fonts/Montserrat/static/Montserrat-Bold.ttf",
            "/src/fonts/Montserrat/static/Montserrat-Black.ttf",
            "/src/fonts/Montserrat/static/Montserrat-BlackItalic.ttf",
            "/src/fonts/Roboto/Roboto-ThinItalic.ttf",
            "/src/fonts/Roboto/Roboto-Black.ttf",
            "/src/fonts/Roboto/Roboto-BlackItalic.ttf",
            "/src/fonts/Roboto/Roboto-Bold.ttf",
            "/src/fonts/Roboto/Roboto-BoldItalic.ttf",
            "/src/fonts/Roboto/Roboto-Italic.ttf",
            "/src/fonts/Roboto/Roboto-Light.ttf",
            "/src/fonts/Roboto/Roboto-LightItalic.ttf",
            "/src/fonts/Roboto/Roboto-Medium.ttf",
            "/src/fonts/Roboto/Roboto-MediumItalic.ttf",
            "/src/fonts/Roboto/Roboto-Medium.ttf",
            "/src/fonts/Roboto/Roboto-MediumItalic.ttf",
            "/src/fonts/Roboto/Roboto-Thin.ttf",
            "/src/fonts/Roboto/Roboto-ThinItalic.ttf",
        ]
          for (const url of urlsToCache) {
            try {
                await cache.add(url);
                console.log(`[Service Worker] Cached: ${url}`);
            } catch (error) {
                console.error(`[Service Worker] Failed to cache: ${url}`, error);
            }
        }
        })
    )
})

self.addEventListener("activate", function(event) {
    console.log("[Service Worker Activating Service Worker ...", event)
    event.waitUntil(
        caches.keys()
        .then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                    console.log("[Service Worker] Removing old cache.", key)
                    return caches.delete(key)
                }
            }))
        })
    )
    return self.clients.claim()
})

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches.match(event.request).then(function(response) {
            if (response) {
                return response;
            } else {
                return fetch(event.request).then(function(res) {
                    return caches.open(DYNAMIC_CACHE).then(function(cache) {
                        console.log("Adding to DYNAMIC_CACHE:", event.request.url); // Check this
                        cache.put(event.request, res.clone());
                        return res;
                    });
                }).catch(function(err) {
                    console.log("Fetch failed; returning offline page", err);
                    return caches.match('/offline.html');
                });
            }
        })
    );
});