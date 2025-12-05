const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "30d"
    })
}

const register = async (req, res) => {
    try {
        console.log('Registration attempt:', { username: req.body.username, email: req.body.email, role: req.body.role });
        const { username, email, password, role } = req.body

        // Check if user exists by email
        const userExist = await User.findOne({ email })
        if (userExist) {
            console.log('Registration failed: User already exists with email:', email);
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            })
        }

        // Check if username is taken
        const usernameExist = await User.findOne({ username })
        if (usernameExist) {
            console.log('Registration failed: Username already taken:', username);
            return res.status(400).json({
                success: false,
                message: "Username is already taken"
            })
        }

        const user = await User.create({
            username, email, password, role
        })
        console.log('User registered successfully:', { id: user.id, username: user.username, email: user.email });
        res.status(201).json({
            success: true,
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id)
            }
        })
    } catch (error) {
        console.error('Registration error:', error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user && (await user.matchPassword(password))) {
            res.status(200).json({
                success: true,
                data: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role,
                    token: generateToken(user.id)
                }
            })
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = { login, register }