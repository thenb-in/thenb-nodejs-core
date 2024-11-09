// src/server/auth/authService.js
const jwt = require('jsonwebtoken');
const { getConfig } = require('../../config');

class AuthService {
    static generateToken(user) {
        const { JWT_SECRET } = getConfig();
        return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    }

    static verifyToken(token) {
        const { JWT_SECRET } = getConfig();
        return jwt.verify(token, JWT_SECRET);
    }
}

module.exports = AuthService;
