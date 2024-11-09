// src/server/auth/authMiddleware.js
const AuthService = require('./authService');
const { getConfig } = require('../../config');

function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    try {
        const { JWT_SECRET } = getConfig();
        req.user = AuthService.verifyToken(token);
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid Token' });
    }
}

module.exports = authMiddleware;
