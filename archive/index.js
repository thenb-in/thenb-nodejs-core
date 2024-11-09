// src/index.js
const { init } = require('./src/config');
const authMiddleware = require('./src/server/auth/authMiddleware');
const AuthService = require('./src/server/auth/authService');
const createAuthRouter = require('./src/server/auth/authRouter');

// Separate backend and frontend exports
const backendExports = {
    init,
    authMiddleware,
    AuthService,
    createAuthRouter,
};

const frontendExports = {
    AuthRoutes: require('./src/client/components/AuthRoutes').default,
    PrivateRoute: require('./src/client/components/PrivateRoute').default,
    Login: require('./src/client/components/Auth/Login').default,
    Signup: require('./src/client/components/Auth/Signup').default,
};

// Export frontend and backend modules separately
module.exports = {
    ...backendExports,
    ...frontendExports,
};
