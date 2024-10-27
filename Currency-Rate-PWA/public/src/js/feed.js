const appDownloadIcon = document.getElementById("downloadApplication")

if (deferredPrompt) {
    console.log("display download button", appDownloadIcon.style.display)
    appDownloadIcon.style.display = "block"
}

appDownloadIcon.addEventListener("click", openInstallAppModal)

function openInstallAppModal() {

}