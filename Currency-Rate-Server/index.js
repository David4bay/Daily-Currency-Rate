require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
// const cors = require("cors")
const helmet = require("helmet")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

module.exports = app