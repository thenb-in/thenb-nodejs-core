// client.js

/**
 * Client entry point for thenb-nodejs-core.
 *
 * Re-exports all client-side React components so consumers can import them
 * from a single path: `import { ... } from 'thenb-nodejs-core/client'`.
 *
 * @module client
 */
const AuthRoutes = require('./components/AuthRoutes').default;
const PrivateRoute = require('./components/PrivateRoute').default;
const Login = require('./components/Auth/Login').default;
const Signup = require('./components/Auth/Signup').default;

module.exports = {
    /** @see module:AuthRoutes */
    AuthRoutes,
    /** @see module:PrivateRoute */
    PrivateRoute,
    /** @see module:Login */
    Login,
    /** @see module:Signup */
    Signup,
};
