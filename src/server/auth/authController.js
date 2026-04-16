// src/server/auth/authController.js

const AuthService = require('./authService');
const { getConfig } = require('../../config');

/**
 * Handles user login requests.
 *
 * Extracts `username` and `password` from the request body, generates a JWT
 * for the user, and returns it in the response.
 *
 * @async
 * @param {import('express').Request} req - Express request object. Expects `{ username, password }` in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {void} Responds with `200 { token }`.
 *
 * @note Currently uses a mocked user object. Replace with real database lookup.
 */
const login = async (req, res) => {
    const { username, password } = req.body;
    // Perform authentication logic here, such as checking the database
    const user = { id: 1, username }; // Mocked user for demonstration purposes
    const token = AuthService.generateToken(user);
    res.status(200).json({ token });
};

/**
 * Handles user signup/registration requests.
 *
 * Extracts `username`, `password`, and `mobile_number` from the request body.
 * Should create a new user in the data store.
 *
 * @async
 * @param {import('express').Request} req - Express request object. Expects `{ username, password, mobile_number }` in body.
 * @param {import('express').Response} res - Express response object.
 * @returns {void} Responds with `201 { message }`.
 *
 * @note Currently does not persist user data. Implement database storage.
 */
const signup = async (req, res) => {
    const { username, password, mobile_number } = req.body;
    // Perform user creation logic here, such as saving to the database
    res.status(201).json({ message: 'User created successfully' });
};

/**
 * Handles token verification requests.
 *
 * Extracts the Bearer token from the `Authorization` header, verifies it,
 * and returns the decoded user payload if valid.
 *
 * @param {import('express').Request} req - Express request object. Expects `Authorization: Bearer <token>` header.
 * @param {import('express').Response} res - Express response object.
 * @returns {void} Responds with `200 { message, user }` on success or `401` on failure.
 */
const verifyToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token is missing' });
    }

    try {
        const user = AuthService.verifyToken(token);
        res.status(200).json({ message: 'Token is valid', user });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = { login, signup, verifyToken };
