
function buildCurrencyList(defaultCurrency, currencySymbols) {
    let string = ""

    currencySymbols.forEach((symbol) => {
        string += `${defaultCurrency}-${symbol},`
    })

    string = string.slice(0, string.length - 2)
    .replace(",USD-BAM", "")
    .replace(",USD-BTC", "")
    .replace(",USD-CHFRTS", "")
    .replace(",USD-CVE", "")
    .replace(",USD-DOGE", "")
    .replace(",USD-ETH", "")
    .replace(",USD-JPYRTS", "")
    .replace(",USD-KYD", "")
    .replace(",USD-LTC", "")
    .replace(",USD-QA", "")
    
    return string
}

module.exports = buildCurrencyList