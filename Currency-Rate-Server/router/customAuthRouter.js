const jwt = require("jsonwebtoken")
const User = require("../models/userModel")
const reviewPassword = require("../utils/verifyPassword")
const customAuthRouter = require("express").Router()

customAuthRouter.post("/signon", async function(request, response) {
    
    const credentials = request.body

    const { userEmailOrUsername, enteredPassword } = credentials

    try {
        console.log("credentials", credentials)
        if (!userEmailOrUsername || !enteredPassword) {
            response.statusCode = 400
            response.json({
                error: `${!userEmailOrUsername && !enteredPassword ? "No credentials provided." : !enteredPassword ? "No password provided." : "No username/info provided."}`
            })
            return
        }
    
        const userExists = await User.findOne({ name: userEmailOrUsername })
    
        console.log("userExists", userExists)
        
        if (!userExists) {
            response.statusCode = 200
            response.json({
                error: "No user found."
            })
            return
        }
    
        let userPassword = userExists.hashedPassword
    
        let validatePassword = reviewPassword(enteredPassword, userExists.salt, userPassword)
    
        if (!validatePassword) {
            response.statusCode = 401
            response.json({
                error: "Not authorized to sign in."
            })
            return
        }
    
        const token = jwt.sign(userExists, process.env.JWT_TOKEN)
    
        response.status(200).json(token)
        return
    } catch (error) {
        console.log("error", error)
        response.statusCode = 400
        response.json({
            error
        })
        return
    }
})


customAuthRouter.post("/register", async function(request, response) {

    let newUser

    const credentials = request.body

    const { userEmailOrUsername, enteredPassword } = credentials

    if (!userEmailOrUsername || !enteredPassword) {
        response.statusCode = 400
        response.json({
            error: `${!userEmailOrUsername && !enteredPassword ? "No credentials provided." : !enteredPassword ? "No password provided." : "No username/info provided."}`
        })
        return
    }

    try {
        newUser = new User({
            name: userEmailOrUsername,
            hashedPassword: enteredPassword
        })

        await newUser.save()
    } catch (error) {
        response.statusCode = 500
        response.json({
            error: "Unable to save user."
        })
        return
    }
    console.log("newUser", newUser)
    const token = jwt.sign({newUser}, process.env.JWT_TOKEN, { expiresIn: 60 * 5})

    response.status(201).json(token)
    return
})

customAuthRouter.delete("/user", async function(request, response) {

    const credentials = request.body

    let { userEmailOrUsername, enteredPassword } = credentials

    const user = User.findOne({ name: userEmailOrUsername })

    if (!user) {
        response.statusCode = 404
        response.json({
            error: "User does not exist."
        })
        return
    }

    let userPassword = user.hashedPassword

    let validatePassword = reviewPassword(enteredPassword, user.salt, userPassword)

    if (!validatePassword) {
        response.statusCode = 404
        response.json({
            error: "Incorrect password."
        })
        return
    }

        try {
            if (user) {
                await User.deleteOne({ name: userEmailOrUsername })
                response.statusCode = 204
            } else {
                response.statusCode = 404
                response.json({
                    error: "User does not exist."
                })
            }
            return
        } catch (error) {
            response.statusCode = 500
            response.json({
                error: "Unable to delete user."
            })
            return
        }
})

module.exports = customAuthRouter