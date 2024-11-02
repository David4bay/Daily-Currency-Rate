const currencySymbols = require("../data/currencySymbols")
const fs = require("fs")
const path = require("path")
const axios = require("axios")
const currencyRouter = require("express").Router()

currencyRouter.get("/fetch", async function(request, response) {
    let defaultCurrency = request.query.default || "USD"
    let formattedCurrencySymbols = currencySymbols.filter((currencySymbol) => currencySymbol !== defaultCurrency)
    
    console.log("formattedCurrencySymbols", formattedCurrencySymbols)

    let url = process.env.CURRENCY_API

    try {
        const responseData = await Promise.all(
            formattedCurrencySymbols.map((currencySymbol) => {
                return axios.get(`${url}/rates/latest/${defaultCurrency}?target=${currencySymbol}`)
                    .then(res => ({ data: res.data, currencySymbol }))
                    .catch(error => {
                        console.error(`Failed for ${currencySymbol}: ${error.message}`)
                        return null
                    })
            })
        )

        const successfulResponses = responseData.filter(result => result !== null)

        if (successfulResponses.length > 0) {
            response.status(200).json({ data: successfulResponses })
        } else {
            response.status(422).json({ error: "All requests failed or had issues." })
        }
        return
    } catch (error) {
        response.status(400).json({
            error: `Server error encountered. ${error.message}`
        })
        return
    }
})


currencyRouter.get("/currency", async function(request, response) {

    const convertFromCurrency = request.query.from 
    const convertToCurrency = request.query.to 

    if (!convertFromCurrency || !convertToCurrency) {
        response.status(400).json({
            error: `${!convertFromCurrency ? "currency to convert from" : !convertToCurrency ? "currency to converted into" : null} not provided.`
        })
    }
})

module.exports = currencyRouter