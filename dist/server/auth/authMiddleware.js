"use strict";

// src/server/auth/authMiddleware.js
var AuthService = require('./authService');
var _require = require('../../config'),
  getConfig = _require.getConfig;
function authMiddleware(req, res, next) {
  var _req$headers$authoriz;
  var token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1];
  if (!token) return res.status(401).json({
    message: 'Unauthorized'
  });
  try {
    var _getConfig = getConfig(),
      JWT_SECRET = _getConfig.JWT_SECRET;
    req.user = AuthService.verifyToken(token);
    next();
  } catch (error) {
    res.status(401).json({
      message: 'Invalid Token'
    });
  }
}
module.exports = authMiddleware;