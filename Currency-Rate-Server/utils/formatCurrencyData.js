export default function formatCurrencyData(currencyData) {
    for (let currencyPair in currencyData) {
        currencyData[currencyPair].high = Number(currencyData[currencyPair].high).toFixed(2)
        currencyData[currencyPair].low = Number(currencyData[currencyPair].low).toFixed(2)
    }
    return currencyData
}