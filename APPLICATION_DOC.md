# Application Documentation

## Overview

`thenb-nodejs-core` is a reusable Node.js library that packages common authentication and data-access patterns into a single installable module. It targets full-stack JavaScript projects that use **Express** on the server and **React** on the client.

The library is published as an npm package and uses conditional `exports` in `package.json` to deliver the right code to each environment:

- `require('thenb-nodejs-core')` or `require('thenb-nodejs-core/server')` resolves to the server bundle.
- `import ... from 'thenb-nodejs-core/client'` resolves to the client bundle.

## Architecture

```
thenb-nodejs-core
|
|-- src/
|   |-- config.js                 # Shared configuration store (JWT_SECRET)
|   |-- server/
|   |   |-- index.js              # Server entry point (re-exports)
|   |   |-- auth/
|   |   |   |-- authService.js    # JWT generation and verification
|   |   |   |-- authMiddleware.js # Express middleware for route protection
|   |   |   |-- authController.js # Request handlers (login, signup, verify)
|   |   |   |-- authRouter.js     # Express router factory
|   |   |-- orm/
|   |       |-- index.js          # ORM adapter factory
|   |       |-- adapters/
|   |           |-- ormAdapter.js     # (placeholder) Base adapter
|   |           |-- csvAdapter.js     # (placeholder) CSV adapter
|   |           |-- sqliteAdapter.js  # (placeholder) SQLite adapter
|   |-- client/
|       |-- index.js              # Client entry point (re-exports)
|       |-- components/
|       |   |-- Auth/
|       |   |   |-- Login.js      # Login form component
|       |   |   |-- Signup.js     # Signup form component
|       |   |-- AuthRoutes.js     # Declarative auth route definitions
|       |   |-- PrivateRoute.js   # Route guard component
|       |-- utils/
|           |-- auth.js           # Client-side token verification helper
|
|-- dist/                         # Babel-compiled output (committed)
|-- archive/                      # Legacy single-file entry point
```

## Module Descriptions

### Shared Configuration (`src/config.js`)

A simple in-memory configuration store. The consuming application calls `init({ JWT_SECRET })` once at startup. Other modules retrieve configuration via `getConfig()`.

### Server Authentication

| File | Responsibility |
|---|---|
| `authService.js` | Wraps `jsonwebtoken` to expose `generateToken(user)` and `verifyToken(token)`. Tokens encode `id` and `role` and expire in 1 hour. |
| `authMiddleware.js` | Express middleware that extracts a Bearer token from the `Authorization` header, verifies it, and attaches the decoded payload to `req.user`. Returns 401 on failure. |
| `authController.js` | Express request handlers for `login`, `signup`, and `verifyToken` endpoints. Currently uses mocked user data for login. |
| `authRouter.js` | Factory function that creates an Express `Router` with POST `/login`, POST `/signup`, and GET `/verify` routes, optionally prefixed with a `basePath`. |

### Server ORM

A factory (`createORMAdapter(type, config)`) that returns database adapter instances. Supported types are `csv` and `sqlite`. The adapter source files are currently empty placeholders.

### Client Components

| Component | Description |
|---|---|
| `Login` | A controlled form with username/password fields. Submits credentials to the API, stores the returned JWT in `localStorage`, and navigates to the previous location on success. |
| `Signup` | A controlled form with username, mobile number, password, and confirm-password fields. Validates password match client-side. On success, redirects to the login view after 2 seconds. |
| `AuthRoutes` | Renders React Router `<Routes>` for `/login` and `/signup` under a configurable `basePath` (default `/auth`). |
| `PrivateRoute` | A route guard that checks authentication status asynchronously via the API. Renders the wrapped component if authenticated; redirects to `/auth/login` otherwise. |

### Client Utilities

`isAuthenticated()` -- Reads the JWT from `localStorage` and calls the server's `/api/users/verify` endpoint to confirm validity. Returns a boolean.

## Build Pipeline

The project uses **Babel** (`@babel/preset-env` and `@babel/preset-react`) to transpile `src/` into `dist/`. The `prepare` npm lifecycle script runs the build automatically on `npm install`.

## Dependencies

- **Runtime**: `jsonwebtoken` (implicit peer -- must be installed by the consuming app), `express` (implicit peer).
- **Dev**: `@babel/cli`, `@babel/core`, `@babel/preset-env`, `@babel/preset-react`.
- **Peer**: `@mui/material ^6.1.6`, `react ^17 || ^18`, `react-router-dom ^5.2 || ^6`.
