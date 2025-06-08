importScripts('/sw-helper.js')

const STATIC_CACHE = "STATIC_CACHE_194"
const DYNAMIC_CACHE = "DYNAMIC_CACHE_194"

const STATIC_FILES = [
    "/",
    "/manifest.json",
    "/offline.html",
    "/index.html",
    "/src/js/app.js",
    "/src/js/fetch.js",
    "/src/js/feed.js",
    "/src/js/idb.js",
    "/src/js/highCharts.js",
    "/src/js/promise.js",
    "/src/js/polyfill.js",
    "/src/css/styles.css",
    "/src/images/icons/dollar-3-48x48.png",
    "/src/images/icons/dollar-3-57x57.png",
    "/src/images/icons/dollar-3-60x60.png",
    "/src/images/icons/dollar-3-72x72.png",
    "/src/images/icons/dollar-3-96.ico",
    "/src/images/icons/dollar-3-96x96.png",
    "/src/images/icons/dollar-3-120x120.png",
    "/src/images/icons/dollar-3-144x144.png",
    "/src/images/icons/dollar-3-152x152.png",
    "/src/images/icons/dollar-3-180x180.png",
    "/src/fonts/Montserrat/static/Montserrat-Medium.ttf",
    "/src/fonts/Montserrat/static/Montserrat-MediumItalic.ttf",
    "/src/fonts/Roboto/Roboto-Black.ttf",
    "/src/fonts/Roboto/Roboto-ThinItalic.ttf",
]

self.addEventListener("install", (event) => {
    console.log("[Service Worker] Installing...")
    event.waitUntil(
        caches.open(STATIC_CACHE).then(async (cache) => {
            console.log("[Service Worker] Precaching App Shell")
            for (const url of STATIC_FILES) {
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

self.addEventListener("activate", (event) => {
    console.log("[Service Worker] Activating...")
    event.waitUntil(
        caches.keys().then((keys) => 
            Promise.all(
                keys.map((key) => {
                    if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
                        console.log("[Service Worker] Removing old cache:", key)
                        return caches.delete(key)
                    }
                })
            )
        )
    )
    return self.clients.claim()
})

