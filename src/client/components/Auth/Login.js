// src/client/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { REACT_APP_API_BASE_URL } from '../../constants';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

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
