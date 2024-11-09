"use strict";

// client.js
var AuthRoutes = require('./components/AuthRoutes')["default"];
var PrivateRoute = require('./components/PrivateRoute')["default"];
var Login = require('./components/Auth/Login')["default"];
var Signup = require('./components/Auth/Signup')["default"];
module.exports = {
  AuthRoutes: AuthRoutes,
  PrivateRoute: PrivateRoute,
  Login: Login,
  Signup: Signup
};