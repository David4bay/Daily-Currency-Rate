const helmet = require("helmet")
const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const authRouter = require("./router/authRouter")
const customAuthRouter = require("./router/customAuthRouter")
const currencyRouter = require("./router/currencyRouter")

app.use(cors({
    origin: "*"
}))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())

app.use(morgan(":method :url :status :res[content-length] - :response-time ms"))

if (process.env.NODE_ENV === "development") {

    app.use(customAuthRouter)

    app.use(authRouter)

    app.use("/api/v1", currencyRouter)

    app.get("/home", function(_, response) {
        response.status(200).json({ message: "You're home buddy. "})
    })

    app.get("/login", function(_, response) {
        response.status(200).json({ message: "Login bro. "})
    })
}

module.exports = app