// src/server/auth/authMiddleware.js

const AuthService = require('./authService');
const { getConfig } = require('../../config');

/**
 * Express middleware that protects routes by requiring a valid JWT.
 *
 * Extracts the Bearer token from the `Authorization` header, verifies it
 * using {@link AuthService.verifyToken}, and attaches the decoded payload
 * to `req.user`. If the token is missing or invalid, responds with 401.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 * @returns {void}
 *
 * @example
 * const { authMiddleware } = require('thenb-nodejs-core/server');
 * app.get('/protected', authMiddleware, (req, res) => {
 *     res.json({ user: req.user });
 * });
 */
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
