require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
// const cors = require("cors")
const helmet = require("helmet")
const currencyRouter = require("./router/currencyRouter")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

app.use("/api/v1", currencyRouter)

module.exports = app