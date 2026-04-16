// src/client/utils/auth.js

import { getConfig } from '../../config';

/**
 * Checks whether the current user is authenticated by verifying the stored JWT
 * against the server's verification endpoint.
 *
 * Reads the `token` from `localStorage`. If no token exists, returns `false`
 * immediately. Otherwise, sends a GET request to
 * `{REACT_APP_API_BASE_URL}/api/users/verify` with the token as a Bearer header.
 *
 * @async
 * @returns {Promise<boolean>} `true` if the token is valid and the server confirms
 *   authentication; `false` otherwise.
 *
 * @example
 * const authenticated = await isAuthenticated();
 * if (!authenticated) {
 *     redirect('/login');
 * }
 */
export const isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const { REACT_APP_API_BASE_URL } = getConfig();

    try {
        const response = await fetch(`${REACT_APP_API_BASE_URL}/api/users/verify`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.ok;
    } catch (error) {
        console.error('Error verifying authentication:', error);
        return false;
    }
};
