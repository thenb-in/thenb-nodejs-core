"use strict";

// server.js
var _require = require('../config'),
  init = _require.init;
var authMiddleware = require('./auth/authMiddleware');
var AuthService = require('./auth/authService');
var createAuthRouter = require('./auth/authRouter');
module.exports = {
  init: init,
  authMiddleware: authMiddleware,
  AuthService: AuthService,
  createAuthRouter: createAuthRouter
};