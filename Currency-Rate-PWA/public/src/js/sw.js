let STATIC_CACHE = "STATIC_CACHE_01"
let DYNAMIC_CACHE = "DYNAMIC_CACHE_01"

console.log("in service worker")

self.addEventListener("install", function(event) {
    console.log("[Service Worker Installing Service Worker ...", event)
    event.waitUntil(
        caches.open(STATIC_CACHE).then(function(cache) {
          console.log("[Service Worker] Precaching App Shell")  
          cache.addAll([
            "/",
            "/index.html",
            "/src/js/app.js",
            "src/js/feed.js",
            "/src/js/fetch.js",
            "/src/js/material.min.js",
            "/src/css/styles.css",
            
        ]
          )
        })
    )
})

self.addEventListener("activate", function(event) {
    console.log("[Service Worker Activating Service Worker ...", event)
    return self.clients.claim()
})

self.addEventListener("fetch", function(event) {
    console.log("[Service Worker] fetching something ...", event)
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            if (response) {
                return response
            } else {
                return fetch(event.response)
            }
        })
    )
})