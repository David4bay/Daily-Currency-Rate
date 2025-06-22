const axios = require("axios")
const store = require("../store/store")
const buildCurrencyList = require("../utils/buildCurrencyList")
const authRouter = require("../router/authRouter")
const customAuthRouter = require("../router/customAuthRouter")
const currencyRouter = require("express").Router()
const currencyNameAndSymbols = require("../data/currencyList")
const { default: formatCurrencyData } = require("../utils/formatCurrencyData")

currencyRouter.use(customAuthRouter)

currencyRouter.use(authRouter)

currencyRouter.get("/currencies", async function(request, response) {

    let defaultCurrency = request.body.defaultCurrency || "USD"

    console.log("currency List", currencyNameAndSymbols)

    let currencySymbols = currencyNameAndSymbols.currencySymbols.filter((currencySymbol) => currencySymbol !== defaultCurrency)
    let currencyFetchInfo = buildCurrencyList(defaultCurrency, currencySymbols)

    console.log("currencyFetchInfo", currencyFetchInfo)

    try {

        return axios.get(`${store.CURRENCIES_API}/${currencyFetchInfo}`).then((currencyPayloadInfo) => {
        console.log("currencyPayloadInfo", currencyPayloadInfo)
        let currencyPayload = formatCurrencyData(currencyPayloadInfo.data)
        console.log("currencyPayload", currencyPayload)
        return response.status(200).json(currencyPayload)
        
    })
    } catch (error) {
        response.statusCode = 400
        response.json({
            error: `Unable to retrieve currencyData. ${error}`
        })
        return
    }
})

currencyRouter.get("/fetch", async function(request, response) {
    let defaultCurrency = request.body.defaultCurrency || "USD"
    let convertToCurrency = request.body.convertToCurrency || "NGN"

    try {
        let rate = await axios.get(`${store.CURRENCY_API}${defaultCurrency}-${convertToCurrency}`)
        const currencyPayload = rate.data
        console.log("currencyPayload", currencyPayload)
        response.status(200).json(currencyPayload)
        return
    } catch (error) {
        response.statusCode = 400
        response.json({
            error: "Bad request."
        })
        return
    }
})

currencyRouter.get("/graph", async function(request, response) {

    const defaultCurrency = request.query.default || "USD"
    const compareToCurrency = request.query.lookup || "NGN"
    const numberOfDays = request.query.numberOfDays

    if (!defaultCurrency || !compareToCurrency || !numberOfDays) {
        response.status(400).json({ error: `Value(s) ommitted.`})
        return
    }

    console.log("defaultCurrency", defaultCurrency, "compareToCurrency", compareToCurrency)

    try {
        let currencyPayload = await axios.get(`${store.CURRENCIES_CHART_API}/${defaultCurrency}-${compareToCurrency}/${numberOfDays}`)
        let currencyGraphList = currencyPayload.data.map((currencyData) => { return { pctChange: Number((Number(currencyData.pctChange)).toFixed(2)), timestamp: Number(currencyData.timestamp) * 1000 } })
        response.status(200).json(currencyGraphList)        
        return
    } catch (error) {
        response.statusCode = 404
        response.json({
            error: `Unable to fetch currency data list. ${error}`
        })
        return
    }
})

module.exports = currencyRouter