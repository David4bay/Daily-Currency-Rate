const PORT = process.env.PORT || 3000
const app = require("./index.js")

app.use(function(err, _req, response) {
    if (err) {
        response.statusCode = 500
        response.send({
            error: `Unable to process request. ${err.message}`
        })
        return
    }
})

app.listen(PORT, function() {
    console.log(`Server started on PORT ${PORT}`)
})