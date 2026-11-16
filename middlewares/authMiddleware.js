const jwt = require('jsonwebtoken')
const authMiddleware = (req, res, next) => {
    const token = req.cookies?.token
    if (token) {
        try {
            const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
            req.payload = jwtResponse
            next()
        } catch (error) {
            return res.status(401).json("Invalid or expired token")
        }
    } else {
        return res.status(401).json("Unauthorized user : token missing")
    }
}
module.exports = authMiddleware
