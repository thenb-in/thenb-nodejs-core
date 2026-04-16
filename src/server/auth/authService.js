// src/server/auth/authService.js

const jwt = require('jsonwebtoken');
const { getConfig } = require('../../config');

/**
 * AuthService provides static methods for JSON Web Token operations.
 * It relies on the shared configuration store for the JWT secret.
 *
 * @class AuthService
 */
class AuthService {
    /**
     * Generates a signed JWT for the given user.
     * The token encodes the user's `id` and `role` and expires after 1 hour.
     *
     * @param {Object} user - The user object to encode in the token.
     * @param {number|string} user.id - Unique identifier for the user.
     * @param {string} [user.role] - The user's role (e.g., 'admin', 'user').
     * @returns {string} A signed JWT string.
     *
     * @example
     * const token = AuthService.generateToken({ id: 1, role: 'admin' });
     */
    static generateToken(user) {
        const { JWT_SECRET } = getConfig();
        return jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
    }

    /**
     * Verifies and decodes a JWT.
     *
     * @param {string} token - The JWT string to verify.
     * @returns {Object} The decoded token payload containing `id`, `role`, `iat`, and `exp`.
     * @throws {JsonWebTokenError} If the token signature is invalid.
     * @throws {TokenExpiredError} If the token has expired.
     *
     * @example
     * try {
     *     const payload = AuthService.verifyToken(token);
     *     console.log(payload.id);
     * } catch (err) {
     *     console.error('Token invalid');
     * }
     */
    static verifyToken(token) {
        const { JWT_SECRET } = getConfig();
        return jwt.verify(token, JWT_SECRET);
    }
}

module.exports = AuthService;
