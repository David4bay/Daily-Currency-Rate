const PORT = process.env.PORT || 3000
const app = require("./index.js")

app.listen(PORT, function() {
    console.log(`Server started on PORT ${PORT}`)
})