// src/config.js
let config = {
    JWT_SECRET: null,
    API_BASE_URL: null,
};

const init = ({ JWT_SECRET, API_BASE_URL }) => {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is required");
    config.JWT_SECRET = JWT_SECRET;
    config.API_BASE_URL = API_BASE_URL || "http://localhost:5000"; // default for API_BASE_URL
};

const getConfig = () => config;

module.exports = { init, getConfig };
