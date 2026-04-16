// server.js

/**
 * Server entry point for thenb-nodejs-core.
 *
 * Re-exports all server-side modules so consumers can import them
 * from a single path: `require('thenb-nodejs-core/server')`.
 *
 * @module server
 */
const { init } = require('../config');
const authMiddleware = require('./auth/authMiddleware');
const AuthService = require('./auth/authService');
const createAuthRouter = require('./auth/authRouter');

module.exports = {
    /** @see module:config~init */
    init,
    /** @see module:authMiddleware */
    authMiddleware,
    /** @see module:AuthService */
    AuthService,
    /** @see module:authRouter~createAuthRouter */
    createAuthRouter,
};
