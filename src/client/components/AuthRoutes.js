// src/client/components/AuthRoutes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const AuthRoutes = ({ basePath = '/auth' }) => {
    return (
        <Router>
            <Routes>
                {/* Route for Login page */}
                <Route path={`${basePath}/login`} element={<Login />} />

                {/* Route for Signup page */}
                <Route path={`${basePath}/signup`} element={<Signup />} />

                {/* Optionally, you can add other auth-related routes here */}
            </Routes>
        </Router>
    );
};

export default AuthRoutes;
