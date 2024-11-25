
var dummyServer = `http://localhost:3001/api/v1/currencies`
var data

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
    let reformattedCurrency = Object.keys(fetchResponse)
    let articleBaseCurrency = reformattedCurrency[0].code
    let carouselCurrencyData = Object.values(fetchResponse)
    let exchangeRateCurrencyData = Object.values(fetchResponse)
    console.log("articleBaseCurrency", articleBaseCurrency, "reformattedCurrency", reformattedCurrency)
    data = Array.from(exchangeRateCurrencyData)
    console.log("articleBaseCurrency", articleBaseCurrency)
    articleIntro.textContent += `${articleBaseCurrency}`

    if (reformattedCurrency.length > 1 && exchangeRateCurrencyData.length > 1) {
        createCarouselOnHomepage(carouselCurrencyData)
        createExchangeRateTable(exchangeRateCurrencyData)
    }
})

function createCarouselOnHomepage(currencyPayload) {

    currencyPayload.forEach((currencyData) => {
        let currencySymbol = currencyData.codein 
        let baseCurrencySymbol = currencyData.code

        // let timestamp = currencyData.data.data.timestamp

        let carouselElement = document.createElement("span")
        carouselElement.innerHTML = `<span>${baseCurrencySymbol}/${currencySymbol}: <svg class="upTick" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#36f756"><path d="m280-400 200-200 200 200H280Z"/></svg> ${currencyData.high} | <svg class="downTick" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M480-360 280-560h400L480-360Z"/></svg> ${currencyData.low}<span>`
        carouselElement.title = ` ${baseCurrencySymbol}/${currencySymbol} hi ${currencyData.high} | lo  ${currencyData.low}`
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

setSpeed(120)
cloneItems()
}

function createExchangeRateTable(currencyPayload) {

    currencyPayload.forEach(function(currencyData, indexOfCurrencyData) {
        
        if (indexOfCurrencyData < 15) {

            let currencySymbol = currencyData.codein
            let baseCurrencySymbol = currencyData.code
    
            let tableRow = document.createElement("tr")
            let currencySymbolTableData = document.createElement("td")
            let currencyExchangeRateData = document.createElement("td")

            tableRow.className = "currencyRowHeading"
            currencySymbolTableData.className = "currencyData"
            currencyExchangeRateData.className = "currencyData"
    
            currencySymbolTableData.innerText = `${baseCurrencySymbol}/${currencySymbol}`
            currencyExchangeRateData.innerText = `${currencyData.bid}`
    
            tableRow.appendChild(currencySymbolTableData)
            tableRow.appendChild(currencyExchangeRateData)
    
    
            if (indexOfCurrencyData === 14) {
                let borderStyle = getComputedStyle(document.documentElement).getPropertyValue("--text")
                console.log("borderStyle", borderStyle)
                tableRow.style.borderBottom = `1px solid ${borderStyle}`
                console.log("tableRow.style.borderLeftBottomRadius", tableRow.style.borderLeftBottomRadius)
            }
    
            carouseTableContent.appendChild(tableRow)
        }
        })
}