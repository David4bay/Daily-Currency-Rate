// importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

console.log("in service worker")

self.addEventListener("install", function(event) {
    console.log("[Service Worker Installing Service Worker ...", event)
})

self.addEventListener("activate", function(event) {
    console.log("[Service Worker Activating Service Worker ...", event)
    return self.clients.claim()
})

self.addEventListener("fetch", function(event) {
    console.log("[Service Worker] fetching something ...", event)
    event.respondWith(fetch(event.request))
})