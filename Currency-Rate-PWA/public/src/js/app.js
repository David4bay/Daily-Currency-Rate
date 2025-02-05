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

const navDropdownButton = document.querySelector(".hamburger")
const navLinksBody = document.querySelector(".app__nav__links")
const hamburgerLine = document.querySelectorAll(".hamburger__line")

navDropdownButton.addEventListener("click", function(event) {
    event.preventDefault()
    // Dropdown toggle functionality
    let displayType = navLinksBody.style.display === "none" || navLinksBody.style.display === "" ? "flex" : "none"
    navLinksBody.style.display = displayType

    dropDownAnimation(displayType)
})

function dropDownAnimation(displayState) {

    if (displayState === "flex") {    
        hamburgerLine[0].style.transform = "rotate(45deg) translate(5px, 5px)";
        hamburgerLine[1].style.opacity = "0";
        hamburgerLine[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
        hamburgerLine[0].style.transform = "rotate(0deg) translate(0, 0)";
        hamburgerLine[1].style.opacity = "1";
        hamburgerLine[2].style.transform = "rotate(0deg) translate(0, 0)";
    }
}