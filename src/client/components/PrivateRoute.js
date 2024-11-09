// PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const PrivateRoute = ({ element: Element, ...rest }) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const checkAuth = async () => {
            const authStatus = await isAuthenticated();
            setIsUserAuthenticated(authStatus);
        };

        checkAuth();
    }, []);

    // Display loading state while authentication status is being checked
    if (isUserAuthenticated === null) {
        return <div>Loading...</div>;
    }

    // If not authenticated, redirect to /auth
    if (!isUserAuthenticated) {
        console.log('User is not authenticated. Redirecting to /auth');
        return <Navigate to="/auth" state={{ from: location }} replace />;
    }

    // If authenticated, render the element
    return <Element {...rest} />;
};

export default PrivateRoute;
