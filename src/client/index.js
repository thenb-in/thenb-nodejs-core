// client.js
const AuthRoutes = require('./components/AuthRoutes').default;
const PrivateRoute = require('./components/PrivateRoute').default;
const Login = require('./components/Auth/Login').default;
const Signup = require('./components/Auth/Signup').default;

module.exports = {
    AuthRoutes,
    PrivateRoute,
    Login,
    Signup,
};
