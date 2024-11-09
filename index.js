// src/index.js
const { init } = require('./config');
const authMiddleware = require('./server/auth/authMiddleware');
const AuthService = require('./server/auth/authService');
const createAuthRouter = require('./server/auth/router');

module.exports = {
    init,
    authMiddleware,
    AuthService,
    createAuthRouter, // Export the configurable router creator
    PrivateRoute: require('./client/components/PrivateRoute').default,
    Login: require('./client/components/Login').default,
    Signup: require('./client/components/Signup').default,
};
