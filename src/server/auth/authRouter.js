// src/server/auth/router.js
const express = require('express');
const { login, signup, verifyToken } = require('./authController');

const createAuthRouter = (basePath = '') => {
    const router = express.Router();

    // Mount the routes at configurable paths
    router.post(`${basePath}/login`, login);
    router.post(`${basePath}/signup`, signup);
    router.get(`${basePath}/verify`, verifyToken);

    return router;
};

module.exports = createAuthRouter;
