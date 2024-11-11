import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Auth/Login';
import Signup from './Auth/Signup';

const AuthRoutes = ({ basePath = '/auth' }) => {
    return (
        <Routes>
            <Route path={`${basePath}/login`} element={<Login />} />
            <Route path={`${basePath}/signup`} element={<Signup />} />
        </Routes>
    );
};

export default AuthRoutes;
