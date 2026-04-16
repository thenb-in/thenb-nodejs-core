// src/config.js

/**
 * Internal configuration store.
 * Holds runtime settings shared across server and client modules.
 * @type {{ JWT_SECRET: string | null }}
 */
let config = {
    JWT_SECRET: null,
};

/**
 * Initializes the shared configuration with required settings.
 * Must be called once at application startup before any authentication
 * operations are performed.
 *
 * @param {Object} options - Configuration options.
 * @param {string} options.JWT_SECRET - Secret key used for signing and verifying JSON Web Tokens.
 * @throws {Error} If JWT_SECRET is not provided.
 *
 * @example
 * const { init } = require('thenb-nodejs-core/server');
 * init({ JWT_SECRET: process.env.JWT_SECRET });
 */
const init = ({ JWT_SECRET }) => {
    if (!JWT_SECRET) throw new Error("JWT_SECRET is required");
    config.JWT_SECRET = JWT_SECRET;
};

/**
 * Returns the current configuration object.
 *
 * @returns {{ JWT_SECRET: string | null }} The current configuration.
 */
const getConfig = () => config;

module.exports = { init, getConfig };
