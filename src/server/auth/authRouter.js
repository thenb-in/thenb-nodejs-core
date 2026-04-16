// src/server/auth/authRouter.js

const express = require('express');
const { login, signup, verifyToken } = require('./authController');

/**
 * Creates an Express Router pre-configured with authentication endpoints.
 *
 * The router exposes:
 * - `POST {basePath}/login`  -- Authenticate a user and return a JWT.
 * - `POST {basePath}/signup` -- Register a new user.
 * - `GET  {basePath}/verify` -- Validate a Bearer token.
 *
 * @param {string} [basePath=''] - Optional URL prefix prepended to each route path.
 * @returns {import('express').Router} An Express Router instance with auth routes mounted.
 *
 * @example
 * const { createAuthRouter } = require('thenb-nodejs-core/server');
 * app.use('/api/users', createAuthRouter());
 * // Creates: POST /api/users/login, POST /api/users/signup, GET /api/users/verify
 */
const createAuthRouter = (basePath = '') => {
    const router = express.Router();

    // Mount the routes at configurable paths
    router.post(`${basePath}/login`, login);
    router.post(`${basePath}/signup`, signup);
    router.get(`${basePath}/verify`, verifyToken);

    return router;
};

module.exports = createAuthRouter;
