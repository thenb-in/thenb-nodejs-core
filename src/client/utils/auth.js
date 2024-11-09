// src/client/utils/auth.js
import { getConfig } from '../../config';

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
