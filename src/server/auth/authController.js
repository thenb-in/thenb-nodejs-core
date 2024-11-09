// src/server/auth/authController.js
const AuthService = require('./authService');
const { getConfig } = require('../../config');

const login = async (req, res) => {
    const { username, password } = req.body;
    // Perform authentication logic here, such as checking the database
    const user = { id: 1, username }; // Mocked user for demonstration purposes
    const token = AuthService.generateToken(user);
    res.status(200).json({ token });
};

const signup = async (req, res) => {
    const { username, password, mobile_number } = req.body;
    // Perform user creation logic here, such as saving to the database
    res.status(201).json({ message: 'User created successfully' });
};

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
