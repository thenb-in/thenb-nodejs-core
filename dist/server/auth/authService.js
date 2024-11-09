"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// src/server/auth/authService.js
var jwt = require('jsonwebtoken');
var _require = require('../../config'),
  getConfig = _require.getConfig;
var AuthService = /*#__PURE__*/function () {
  function AuthService() {
    _classCallCheck(this, AuthService);
  }
  return _createClass(AuthService, null, [{
    key: "generateToken",
    value: function generateToken(user) {
      var _getConfig = getConfig(),
        JWT_SECRET = _getConfig.JWT_SECRET;
      return jwt.sign({
        id: user.id,
        role: user.role
      }, JWT_SECRET, {
        expiresIn: '1h'
      });
    }
  }, {
    key: "verifyToken",
    value: function verifyToken(token) {
      var _getConfig2 = getConfig(),
        JWT_SECRET = _getConfig2.JWT_SECRET;
      return jwt.verify(token, JWT_SECRET);
    }
  }]);
}();
module.exports = AuthService;