const mongoose = require("mongoose")
const convertPassword = require("../utils/convertPassword")
// const mongooseUniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        maxLength: 20
    },
    hashedPassword: {
    type: String,
    minLength: 5,
    maxLength: 30    
    },
    salt: {
        type: String,
        minLength: 5,
        maxLength: 30
    },
    watchList: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CurrencyPair"
    }
})

userSchema.set("toJSON", {
    transform: (_, returnedObject) => {
       let { hash, salt } = convertPassword(returnedObject.hashedPassword)
       returnedObject.salt = salt
       returnedObject.hashedPassword = hash
    }
})

// mongoose.plugin(mongooseUniqueValidator)

const User = mongoose.model("User", userSchema)

module.exports = User