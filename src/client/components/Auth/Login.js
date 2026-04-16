// src/client/components/Login.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Login form component.
 *
 * Renders a Material UI form with username and password fields. On submission,
 * sends credentials to `{REACT_APP_API_BASE_URL}/api/users/login` via POST.
 * On success, stores the returned JWT in `localStorage` and navigates to the
 * previous location (or `/` by default). Displays inline error messages on failure.
 *
 * @component
 * @returns {React.ReactElement} The rendered login form.
 */
const Login = () => {
    /** @type {[{username: string, password: string}, Function]} */
    const [formData, setFormData] = useState({ username: '', password: '' });
    /** @type {[string, Function]} */
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    /**
     * Updates form state when an input field value changes.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    /**
     * Handles form submission. Sends login credentials to the API,
     * stores the JWT on success, and navigates to the intended destination.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        fetch(`${REACT_APP_API_BASE_URL}/api/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Login failed');
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                navigate(location.state?.from || '/', { replace: true });
            })
            .catch((err) => setError(err.message));
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField label="Username" name="username" value={formData.username} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Password" name="password" type="password" value={formData.password} onChange={handleChange} fullWidth required />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
                </Grid>
                {error && <Grid item xs={12}><Typography color="error">{error}</Typography></Grid>}
            </Grid>
        </form>
    );
};

export default Login;
