"use strict";

// src/server/auth/router.js
var express = require('express');
var _require = require('./authController'),
  login = _require.login,
  signup = _require.signup,
  verifyToken = _require.verifyToken;
var createAuthRouter = function createAuthRouter() {
  var basePath = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var router = express.Router();

  // Mount the routes at configurable paths
  router.post("".concat(basePath, "/login"), login);
  router.post("".concat(basePath, "/signup"), signup);
  router.get("".concat(basePath, "/verify"), verifyToken);
  return router;
};
module.exports = createAuthRouter;