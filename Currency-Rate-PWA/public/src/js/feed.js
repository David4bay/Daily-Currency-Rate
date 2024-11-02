
var dummyServer = `http://localhost:3001/data`

var appDownloadIcon = document.getElementById("downloadApplication")
var carousel = document.querySelector(".carousel")
var carouseTableContent = document.querySelector(".currencyTable__content")
var articleIntro = document.querySelector(".article__intro")
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

fetch(dummyServer).then(function(response) {
    return response.json()
}).then(function(fetchResponse) {
    articleIntro.textContent += fetchResponse[0].data.data.base
    console.log("fetched data from /src/js/app.js", fetchResponse)

    createCarouselOnHomepage(fetchResponse)
    createExchangeRateTable(fetchResponse)
})

function createCarouselOnHomepage(currencyPayload) {

    currencyPayload.forEach((currencyData) => {
        let currencySymbol = currencyData.currencySymbol 
        let baseCurrencySymbol = currencyData.data.data.base 
        let currencyExchangeRate = currencyData.data.data.mid.toFixed(2)
        // let timestamp = currencyData.data.data.timestamp

        let carouselElement = document.createElement("span")
        carouselElement.innerText = `${baseCurrencySymbol}/${currencySymbol}: ${currencyExchangeRate}`
        carouselElement.title = ` ${baseCurrencySymbol}/${currencySymbol}: ${currencyExchangeRate}`
        carouselElement.className = "carousel-item"
        carousel.appendChild(carouselElement)
    })

    function cloneItems() {
        const items = [...carousel.children] 
        items.forEach(function(item) {
            const clone = item.cloneNode(true) 
            carousel.appendChild(clone)
        })
    }

function setSpeed(duration) {
    carousel.style.animationDuration = `${duration}s`
}

setSpeed(20)
cloneItems()
}

function createExchangeRateTable(currencyPayload) {

    currencyPayload.forEach(function(currencyData, indexOfCurrencyData) {
        
        if (indexOfCurrencyData < 5) {
            
            let currencySymbol = currencyData.currencySymbol 
            let baseCurrencySymbol = currencyData.data.data.base 
            let currencyExchangeRate = currencyData.data.data.mid.toFixed(2)
    
            let tableRow = document.createElement("tr")
            let currencySymbolTableData = document.createElement("td")
            let currencyExchangeRateData = document.createElement("td")

            tableRow.className = "currencyRowHeading"
            currencySymbolTableData.className = "currencyData"
            currencyExchangeRateData.className = "currencyData"
    
            currencySymbolTableData.innerText = `${baseCurrencySymbol}/${currencySymbol}`
            currencyExchangeRateData.innerText = `${currencyExchangeRate}`
    
            tableRow.appendChild(currencySymbolTableData)
            tableRow.appendChild(currencyExchangeRateData)
    
    
            if (indexOfCurrencyData === 4) {
                let borderStyle = getComputedStyle(document.documentElement).getPropertyValue("--text")
                console.log("borderStyle", borderStyle)
                tableRow.style.borderBottom = `1px solid ${borderStyle}`
                console.log("tableRow.style.borderLeftBottomRadius", tableRow.style.borderLeftBottomRadius)
            }
    
            carouseTableContent.appendChild(tableRow)
        }
        })
}