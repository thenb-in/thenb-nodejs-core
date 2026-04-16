import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Signup form component.
 *
 * Renders a Material UI registration form with username, mobile number,
 * password, and confirm-password fields. Validates that passwords match
 * before submitting. On success, displays a confirmation message and
 * redirects to the login page after 2 seconds.
 *
 * @component
 * @returns {React.ReactElement} The rendered signup form.
 */
const Signup = () => {
    /** @type {[{username: string, mobile_number: string, password: string, confirmPassword: string}, Function]} */
    const [formData, setFormData] = useState({
        username: '',
        mobile_number: '',
        password: '',
        confirmPassword: '',
    });
    /** @type {[string, Function]} */
    const [error, setError] = useState('');
    /** @type {[string, Function]} */
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    /**
     * Updates form state when an input field value changes.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input field.
     */
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    /**
     * Handles form submission. Validates password match, sends registration
     * data to the API, and handles success/error feedback.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submit event.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        fetch(`${REACT_APP_API_BASE_URL}/api/users/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: formData.username,
                password: formData.password,
                mobile_number: formData.mobile_number,
            }),
        })
            .then(async (response) => {
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Signup failed');
                }
                return response.json();
            })
            .then(() => {
                setSuccess('Signup successful! Redirecting to login...');
                setTimeout(() => navigate('/auth?tab=login'), 2000);
            })
            .catch((err) => setError(err.message));
    };

    return (
        <form onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        label="Username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Mobile Number"
                        name="mobile_number"
                        value={formData.mobile_number}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Sign Up
                    </Button>
                </Grid>
                {error && (
                    <Grid item xs={12}>
                        <Typography color="error">{error}</Typography>
                    </Grid>
                )}
                {success && (
                    <Grid item xs={12}>
                        <Typography color="success.main">{success}</Typography>
                    </Grid>
                )}
            </Grid>
        </form>
    );
};

export default Signup;
