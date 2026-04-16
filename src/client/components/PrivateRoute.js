// src/client/components/PrivateRoute.js

import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';
import { getConfig } from '../../config';

/**
 * PrivateRoute component.
 *
 * A route guard that checks whether the user is authenticated before rendering
 * the wrapped component. While the authentication check is in progress, it
 * displays a loading indicator. If the user is not authenticated, it redirects
 * to `/auth/login` with the current location preserved in state so the user
 * can be sent back after login.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {React.ComponentType} props.component - The component to render if the user is authenticated.
 * @param {Object} [props.rest] - Additional props passed through to the rendered component.
 * @returns {React.ReactElement} The protected component, a loading indicator, or a redirect.
 *
 * @example
 * <PrivateRoute component={Dashboard} />
 */
const PrivateRoute = ({ component: Component, ...rest }) => {
    /** @type {[boolean|null, Function]} Auth state: null = loading, true = authenticated, false = not authenticated */
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
