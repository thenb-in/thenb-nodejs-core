// src/client/components/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { getConfig } from '../../config';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);
    const location = useLocation();
    const { REACT_APP_API_BASE_URL } = getConfig();

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated(REACT_APP_API_BASE_URL);
            setIsUserAuthenticated(authStatus);
        };
        checkAuth();
    }, [REACT_APP_API_BASE_URL]);

    // Display loading state while authentication status is being checked
    if (isUserAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // If not authenticated, redirect to /auth
    if (!isUserAuthenticated) {
        console.log('User is not authenticated. Redirecting to /auth');
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the component
    return <Component {...rest} />;
};

export default PrivateRoute;
