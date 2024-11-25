var deferredPrompt

if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js", {
        scope: "/"
    }).then(function() {
        console.log("[Service Worker] Service worker registered...")
    })
}

window.addEventListener("beforeinstallprompt", function(event) {
    event.preventDefault()
    deferredPrompt = event
    return false
})