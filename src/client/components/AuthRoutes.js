import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

/**
 * AuthRoutes component.
 *
 * Declares React Router routes for the authentication views (Login and Signup)
 * under a configurable base path.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} [props.basePath='/auth'] - URL prefix for the auth routes.
 * @returns {React.ReactElement} A `<Routes>` element containing login and signup routes.
 *
 * @example
 * <AuthRoutes basePath="/auth" />
 * // Renders routes: /auth/login and /auth/signup
 */
const AuthRoutes = ({ basePath = '/auth' }) => {
    return (
        <Routes>
            <Route path={`${basePath}/login`} element={<Login />} />
            <Route path={`${basePath}/signup`} element={<Signup />} />
        </Routes>
    );
};

export default AuthRoutes;
