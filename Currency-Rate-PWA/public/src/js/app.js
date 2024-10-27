console.log("in app.js")

var deferredPrompt

    if ("serviceWorker" in navigator) {
        console.log("yup")
        navigator.serviceWorker.register("/src/js/sw.js").then(function() {
            console.log("Service Worker registered!")
        })
    }
    
    window.addEventListener("beforeinstallprompt", function(event) {
        console.log("beforeinstall prompt fired!")
        event.preventDefault()
        deferredPrompt = event 
        return false
    })