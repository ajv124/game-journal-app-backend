const bcrypt = require('bcrypt')
const users = require("../models/userModel")
const jwt = require("jsonwebtoken")

exports.registerController = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const existingUsername = await users.findOne({ username })
        if (existingUsername) {
            return res.status(409).json("Username is already registered. Please enter a different username.")
        }
        const existingEmail = await users.findOne({ email })
        if (existingEmail) {
            return res.status(409).json("Email is already registered. Please login.")
        }
        let encryptedPassword = await bcrypt.hash(password, 10)
        await users.create({
            username, email, password: encryptedPassword
        })
        res.status(201).json("Registration successful. Please login")
    } catch (error) {
        console.error(error)
        res.status(500).json("Internal server error")
    }
}

exports.loginController = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body
        const existingUser = await users.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        })
        if (existingUser) {
            const isPasswordMatch = await bcrypt.compare(password, existingUser.password)
            if (isPasswordMatch) {
                const token = jwt.sign(
                    { userId: existingUser._id, username: existingUser.username, email: existingUser.email, role: existingUser.role },
                    process.env.JWTSECRET,
                    { expiresIn: '1d' }
                )
                const isProduction = process.env.NODE_ENV === "production"
                res.cookie("token", token, {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: isProduction ? "none" : "lax",
                    maxAge: 24 * 60 * 60 * 1000,
                })
                return res.status(200).json({
                    user: {
                        _id: existingUser._id,
                        username: existingUser.username,
                        email: existingUser.email,
                        role: existingUser.role,
                        picture: existingUser.picture
                    }
                })
            } else {
                return res.status(401).json("Invalid username/email or password")
            }
        } else {
            return res.status(401).json("Invalid username/email or password")
        }
    } catch (error) {
        console.error(error)
        res.status(500).json("Internal server error")
    }
}

exports.logoutController = async (req, res) => {
    const isProduction = process.env.NODE_ENV === "production"
    res.clearCookie("token", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
    })
    return res.status(200).json("Logged out successfully")
}

exports.getUserController = async (req, res) => {
    try {
        const id = req.payload.userId
        const user = await users.findById(id).select("-password")
        if (user) {
            return res.status(200).json(user)
        } else {
            return res.status(404).json("User not found")
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json("Internal server error")
    }
}