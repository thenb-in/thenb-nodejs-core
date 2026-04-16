# User Guide

## Table of Contents

1. [Introduction](#introduction)
2. [Prerequisites](#prerequisites)
3. [Installation](#installation)
4. [Server-Side Setup](#server-side-setup)
5. [Client-Side Setup](#client-side-setup)
6. [Full-Stack Example](#full-stack-example)
7. [API Endpoints](#api-endpoints)
8. [Environment Variables](#environment-variables)
9. [Troubleshooting](#troubleshooting)

---

## Introduction

`thenb-nodejs-core` provides ready-made authentication for full-stack JavaScript applications. On the backend it gives you JWT-based login/signup endpoints and a route-protection middleware. On the frontend it gives you pre-built React components for login, signup, and guarded routes.

---

## Prerequisites

- Node.js >= 14
- npm or yarn
- An Express application (server-side)
- A React application with React Router v5 or v6 (client-side)

---

## Installation

```bash
npm install thenb-nodejs-core
```

You must also install the required peer dependencies in your project:

```bash
# Server peer dependencies
npm install express jsonwebtoken

# Client peer dependencies
npm install react react-dom react-router-dom @mui/material @emotion/react @emotion/styled
```

---

## Server-Side Setup

### Step 1: Initialize Configuration

Before using any authentication features, initialize the library with your JWT secret:

```js
const { init } = require('thenb-nodejs-core/server');

init({ JWT_SECRET: process.env.JWT_SECRET });
```

This must be called once at application startup, before any routes or middleware are registered.

### Step 2: Mount the Auth Router

Use `createAuthRouter()` to add login, signup, and token verification endpoints:

```js
const express = require('express');
const { init, createAuthRouter } = require('thenb-nodejs-core/server');

const app = express();
app.use(express.json());

init({ JWT_SECRET: process.env.JWT_SECRET });
app.use('/api/users', createAuthRouter());

app.listen(3000, () => console.log('Server running on port 3000'));
```

This creates the following endpoints:
- `POST /api/users/login`
- `POST /api/users/signup`
- `GET /api/users/verify`

### Step 3: Protect Routes with Middleware

Use `authMiddleware` to guard any Express route:

```js
const { authMiddleware } = require('thenb-nodejs-core/server');

app.get('/api/dashboard', authMiddleware, (req, res) => {
    // req.user contains the decoded JWT payload
    res.json({ message: `Welcome, user ${req.user.id}` });
});
```

### Step 4: Use AuthService Directly (Optional)

You can generate and verify tokens programmatically:

```js
const { AuthService } = require('thenb-nodejs-core/server');

// Generate a token
const token = AuthService.generateToken({ id: 42, role: 'admin' });

// Verify a token
try {
    const payload = AuthService.verifyToken(token);
    console.log(payload); // { id: 42, role: 'admin', iat: ..., exp: ... }
} catch (err) {
    console.error('Invalid token');
}
```

---

## Client-Side Setup

### Step 1: Configure the API Base URL

Create a `.env` file in your React project root:

```
REACT_APP_API_BASE_URL=http://localhost:3000
```

### Step 2: Add Auth Routes

Use the `AuthRoutes` component to add login and signup pages:

```jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthRoutes } from 'thenb-nodejs-core/client';

function App() {
    return (
        <BrowserRouter>
            <AuthRoutes basePath="/auth" />
            {/* Your other routes */}
        </BrowserRouter>
    );
}

export default App;
```

This renders:
- `/auth/login` -- Login form
- `/auth/signup` -- Signup form

### Step 3: Protect Client Routes

Wrap any component that requires authentication with `PrivateRoute`:

```jsx
import { PrivateRoute } from 'thenb-nodejs-core/client';
import Dashboard from './Dashboard';

// Inside your Routes:
<PrivateRoute component={Dashboard} />
```

If the user is not authenticated, they are automatically redirected to `/auth/login`.

### Step 4: Use Individual Components (Optional)

You can import `Login` and `Signup` separately for custom layouts:

```jsx
import { Login, Signup } from 'thenb-nodejs-core/client';

// Use them anywhere in your component tree
<Login />
<Signup />
```

---

## Full-Stack Example

### Server (`server.js`)

```js
const express = require('express');
const cors = require('cors');
const { init, createAuthRouter, authMiddleware } = require('thenb-nodejs-core/server');

const app = express();
app.use(cors());
app.use(express.json());

// Initialize the library
init({ JWT_SECRET: 'your-secret-key-here' });

// Public auth routes
app.use('/api/users', createAuthRouter());

// Protected route
app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.json({ message: 'Welcome to the dashboard', user: req.user });
});

app.listen(3000, () => console.log('API server on http://localhost:3000'));
```

### Client (`App.jsx`)

```jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthRoutes, PrivateRoute } from 'thenb-nodejs-core/client';
import Dashboard from './Dashboard';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/auth/*" element={<AuthRoutes basePath="/auth" />} />
                <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
```

---

## API Endpoints

### POST `/login`

Authenticate a user and receive a JWT.

**Request:**
```json
{
    "username": "john",
    "password": "secret"
}
```

**Response (200):**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

### POST `/signup`

Register a new user account.

**Request:**
```json
{
    "username": "john",
    "password": "secret",
    "mobile_number": "+1234567890"
}
```

**Response (201):**
```json
{
    "message": "User created successfully"
}
```

### GET `/verify`

Validate an existing JWT.

**Headers:** `Authorization: Bearer <token>`

**Response (200):**
```json
{
    "message": "Token is valid",
    "user": { "id": 1, "role": "admin", "iat": 1700000000, "exp": 1700003600 }
}
```

**Response (401):**
```json
{
    "message": "Invalid or expired token"
}
```

---

## Environment Variables

| Variable | Side | Description |
|---|---|---|
| `JWT_SECRET` | Server | Secret for signing/verifying JWTs |
| `REACT_APP_API_BASE_URL` | Client | Base URL for API calls (e.g., `http://localhost:3000`) |

---

## Troubleshooting

### "JWT_SECRET is required" error
You forgot to call `init({ JWT_SECRET })` before using authentication features. Make sure this runs at startup.

### 401 Unauthorized on protected routes
- Verify the token is being sent in the `Authorization` header as `Bearer <token>`.
- Check that the token has not expired (tokens are valid for 1 hour).
- Ensure the server and client are using the same `JWT_SECRET`.

### Client components not rendering
- Confirm that `@mui/material`, `react`, and `react-router-dom` peer dependencies are installed.
- Ensure your React app is wrapped in a `<BrowserRouter>`.

### Build errors
Run `npm run build` to regenerate the `dist/` directory from `src/`.
