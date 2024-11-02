
var STATIC_CACHE = "STATIC_CACHE_108"
var DYNAMIC_CACHE = "DYNAMIC_CACHE_98"
var url = `http://localhost:3001/data`

var STATIC_FILES = [
    "/",
    "/manifest.json",
    "/offline.html",
    "/index.html",
    "/src/js/app.js",
    "/src/js/fetch.js",
    "/src/js/feed.js",
    "/src/js/promise.js",
    "/src/js/polyfill.js",
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
    "/src/fonts/Montserrat/static/Montserrat-Medium.ttf",
    "/src/fonts/Montserrat/static/Montserrat-MediumItalic.ttf",
    "/src/fonts/Roboto/Roboto-Black.ttf ",
    "/src/fonts/Roboto/Roboto-ThinItalic.ttf",
]

console.log("in service worker")

self.addEventListener("install", function(event) {

    console.log("[Service Worker Installing Service Worker ...", event)
    event.waitUntil(
        caches.open(STATIC_CACHE).then(async function(cache) {
        console.log("[Service Worker] Precaching App Shell") 
           const urlsToCache = STATIC_FILES
          for (const url of urlsToCache) {
            try {
                await cache.add(url)
                console.log(`[Service Worker] Cached: ${url}`)
            } catch (error) {
                console.error(`[Service Worker] Failed to cache: ${url}`, error)
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
    if (event.request.url.indexOf(url) > -1) {

        event.respondWith(
         caches.open(DYNAMIC_CACHE)  
         .then(async function(cache) {
            return fetch(event.request)
            .then(function(response) {
                cache.put(event.request, response.clone())
                return response
            })
         })
        )
    } else if (isInArray(event.request.url, STATIC_FILES)) {
        event.respondWith(
            caches.match(event.request)
        )
    } else {
        event.respondWith(
            caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                    .then(function (response) {
                        return caches.open(DYNAMIC_CACHE)
                        .then(function (cache) {
                            cache.put(event.request.url, res.clone())
                            return res
                        })
                    }).catch(function (err) {
                        return caches.open(STATIC_CACHE)
                        .then(function (cache) {
                            if (event.request.headers.get("accept").includes("text/html")) {
                                return cache.match("/offline.html")
                            }
                        })
                    })
                }
            })
        )
    }
})

function isInArray(string, arrayItemsToCach) {
    for (var i = 0; i < arrayItemsToCach.length; i++) {
        if (arrayItemsToCach[i] === string) {
            return true
        }
        return false
    }
}