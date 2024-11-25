const mongoose = require("mongoose")

const userCurrencyPreferenceSchema = new mongoose.Schema({
    watchedCurrencies: {
        type: Array,
        default: []
    },
    alerts: {
        type: Boolean,
        default: false
    }
})

const userCurrencyPreference = mongoose.model("UserCurrencyPreferencies", userCurrencyPreferenceSchema)

module.exports = userCurrencyPreference