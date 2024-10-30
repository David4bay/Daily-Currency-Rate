
var dummyServer = `http://localhost:3001/currency-info`

var appDownloadIcon = document.getElementById("downloadApplication")
var platform 

appDownloadIcon.addEventListener("click", openInstallAppModal)

function openInstallAppModal() {
    console.log("boop! beep! app install button clicked!")
    if (deferredPrompt) {
        console.log("deferredPrompt", deferredPrompt)
        platform = deferredPrompt.platforms
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then(function(choiceResult) {
            console.log("user choice", choiceResult.outcome)
            if (choiceResult.outcome === "dismissed") {
                console.log("User cancelled app installation")
            } else {
                console.log("User added app to homescreen")
                appDownloadIcon.remove()
            }
            deferredPrompt = null
        })
    }
}

fetch(dummyServer).then(function(res) {
    return res.json()
}).then(function(data) {
    console.log("fetched data from /src/js/app.js", data)
})