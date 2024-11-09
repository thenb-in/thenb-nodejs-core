"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _Login = _interopRequireDefault(require("./Auth/Login"));
var _Signup = _interopRequireDefault(require("./Auth/Signup"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// src/client/components/AuthRoutes.js

var AuthRoutes = function AuthRoutes(_ref) {
  var _ref$basePath = _ref.basePath,
    basePath = _ref$basePath === void 0 ? '/auth' : _ref$basePath;
  return /*#__PURE__*/_react["default"].createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Routes, null, /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "".concat(basePath, "/login"),
    element: /*#__PURE__*/_react["default"].createElement(_Login["default"], null)
  }), /*#__PURE__*/_react["default"].createElement(_reactRouterDom.Route, {
    path: "".concat(basePath, "/signup"),
    element: /*#__PURE__*/_react["default"].createElement(_Signup["default"], null)
  })));
};
var _default = exports["default"] = AuthRoutes;