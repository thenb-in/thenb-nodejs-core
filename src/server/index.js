// server.js
const { init } = require('../config');
const authMiddleware = require('./auth/authMiddleware');
const AuthService = require('./auth/authService');
const createAuthRouter = require('./auth/authRouter');

module.exports = {
    init,
    authMiddleware,
    AuthService,
    createAuthRouter,
};
