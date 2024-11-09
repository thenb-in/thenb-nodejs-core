"use strict";

// src/config.js
var config = {
  JWT_SECRET: null
};
var init = function init(_ref) {
  var JWT_SECRET = _ref.JWT_SECRET;
  if (!JWT_SECRET) throw new Error("JWT_SECRET is required");
  config.JWT_SECRET = JWT_SECRET;
};
var getConfig = function getConfig() {
  return config;
};
module.exports = {
  init: init,
  getConfig: getConfig
};