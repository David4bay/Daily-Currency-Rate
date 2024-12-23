require("dotenv").config()
const PORT = process.env.PORT || 3000
const store = require("./store/store")
const mongoose = require("mongoose")

mongoose.connect(`mongodb+srv://${store.DBUsername}:${store.DBPassword}@${store.DB_URL}/${store.DB_NAME}?`)
.then(() => {
    console.log(`[Mongo Atlas] Connected successfully.`)
})
.catch((error) => {
    console.error(`[Mongo Atlas] Failed to connected. ${error}`)
})

const app = require("./index.js")

// app.use(function(error, _, response, _) {
//     if (error) {
//         response.statusCode = 500
//         response.json({
//             error: `Operation failed. ${error}`
//         })
//     }
// })

app.listen(PORT, function() {
    console.log(`Server started on PORT ${PORT}.`)
})