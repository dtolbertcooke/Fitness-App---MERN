import jwt from 'jsonwebtoken'
import secretKey from './jwtConfig.js'

function authToken(req, res, next) {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
        return res.status(401).json({ message: 'Unauthorized: token missing' })
    }
    const [bearer, token] = authHeader.split(' ')
    if (bearer !== 'Bearer' || !token) {
        return res.status(401).json({ message: 'Unauthorized: invalid token format' })
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token is invalid' })
        }
        req.user = user
        next()
    })
}

export default authToken