// src/config.js
let config = {
    JWT_SECRET: null,
};

const init = ({ JWT_SECRET }) => {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is required");
    config.JWT_SECRET = JWT_SECRET;
};

const getConfig = () => config;

module.exports = { init, getConfig };
