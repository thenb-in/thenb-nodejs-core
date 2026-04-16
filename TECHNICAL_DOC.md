# Technical Documentation

## Table of Contents

1. [Configuration API](#configuration-api)
2. [Server API Reference](#server-api-reference)
3. [Client API Reference](#client-api-reference)
4. [ORM Adapter Factory](#orm-adapter-factory)
5. [Build System](#build-system)
6. [Package Exports](#package-exports)

---

## Configuration API

### `init(options)`

Initializes the shared configuration store. Must be called before any authentication operations.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `options.JWT_SECRET` | `string` | Yes | Secret key used for signing and verifying JWTs. |

**Throws:** `Error` if `JWT_SECRET` is not provided.

```js
const { init } = require('thenb-nodejs-core/server');
init({ JWT_SECRET: 'my-secret-key' });
```

### `getConfig()`

Returns the current configuration object.

**Returns:** `{ JWT_SECRET: string | null }`

---

## Server API Reference

### AuthService

A static utility class for JWT operations.

#### `AuthService.generateToken(user)`

Generates a signed JWT for the given user.

| Parameter | Type | Description |
|---|---|---|
| `user` | `Object` | Must contain `id` (any) and `role` (any). |

**Returns:** `string` -- A signed JWT valid for 1 hour.

**Token payload:** `{ id, role, iat, exp }`

#### `AuthService.verifyToken(token)`

Verifies and decodes a JWT.

| Parameter | Type | Description |
|---|---|---|
| `token` | `string` | A JWT string. |

**Returns:** `Object` -- The decoded token payload.

**Throws:** `JsonWebTokenError` or `TokenExpiredError` if the token is invalid or expired.

---

### authMiddleware(req, res, next)

Express middleware that protects routes by requiring a valid JWT.

**Behavior:**

1. Extracts the token from `Authorization: Bearer <token>` header.
2. If missing, responds with `401 { message: 'Unauthorized' }`.
3. If present, calls `AuthService.verifyToken(token)`.
4. On success, attaches the decoded payload to `req.user` and calls `next()`.
5. On failure, responds with `401 { message: 'Invalid Token' }`.

```js
const { authMiddleware } = require('thenb-nodejs-core/server');
app.get('/protected', authMiddleware, handler);
```

---

### createAuthRouter(basePath?)

Factory that returns an Express `Router` with authentication endpoints.

| Parameter | Type | Default | Description |
|---|---|---|---|
| `basePath` | `string` | `''` | Optional path prefix for all routes. |

**Routes created:**

| Method | Path | Handler | Description |
|---|---|---|---|
| POST | `{basePath}/login` | `login` | Authenticates user, returns JWT |
| POST | `{basePath}/signup` | `signup` | Creates a new user account |
| GET | `{basePath}/verify` | `verifyToken` | Validates a Bearer token |

**Returns:** `express.Router`

```js
const { createAuthRouter } = require('thenb-nodejs-core/server');
app.use('/api/users', createAuthRouter());
```

---

### Controller Functions

#### `login(req, res)` -- POST

**Request body:** `{ username: string, password: string }`

**Response:** `200 { token: string }`

> **Note:** The current implementation uses a mocked user (`{ id: 1 }`). Integration with a real database is expected in future versions.

#### `signup(req, res)` -- POST

**Request body:** `{ username: string, password: string, mobile_number: string }`

**Response:** `201 { message: 'User created successfully' }`

> **Note:** No actual persistence is implemented yet.

#### `verifyToken(req, res)` -- GET

**Headers:** `Authorization: Bearer <token>`

**Response (success):** `200 { message: 'Token is valid', user: <decoded_payload> }`

**Response (failure):** `401 { message: 'Token is missing' | 'Invalid or expired token' }`

---

## Client API Reference

### `<Login />`

A React component rendering a login form.

**State:** `{ username, password }` controlled via `useState`.

**Behavior:**
- Submits credentials via `POST` to `{REACT_APP_API_BASE_URL}/api/users/login`.
- On success, stores the JWT in `localStorage` under key `token`.
- Navigates to the URL stored in `location.state.from`, or `/` by default.
- Displays error messages inline on failure.

**Dependencies:** `@mui/material` (TextField, Button, Typography, Grid), `react-router-dom` (useNavigate, useLocation).

---

### `<Signup />`

A React component rendering a registration form.

**State:** `{ username, mobile_number, password, confirmPassword }`.

**Behavior:**
- Validates that `password === confirmPassword` before submitting.
- Submits via `POST` to `{REACT_APP_API_BASE_URL}/api/users/signup`.
- On success, displays a success message and redirects to `/auth?tab=login` after 2 seconds.

---

### `<AuthRoutes basePath? />`

Renders login and signup routes.

| Prop | Type | Default | Description |
|---|---|---|---|
| `basePath` | `string` | `'/auth'` | URL prefix for auth routes. |

**Routes rendered:**
- `{basePath}/login` -> `<Login />`
- `{basePath}/signup` -> `<Signup />`

---

### `<PrivateRoute component />`

A route-guard component that checks authentication before rendering.

| Prop | Type | Description |
|---|---|---|
| `component` | `React.ComponentType` | The component to render if authenticated. |

**Behavior:**
1. Calls `isAuthenticated()` on mount.
2. Shows `Loading...` while the check is in progress.
3. If authenticated, renders `<Component />`.
4. If not authenticated, redirects to `/auth/login` with the current location in state.

---

### `isAuthenticated()`

Async utility function that checks whether the current user has a valid session.

**Returns:** `Promise<boolean>`

**Behavior:**
1. Reads the `token` from `localStorage`.
2. If absent, returns `false`.
3. Sends `GET {REACT_APP_API_BASE_URL}/api/users/verify` with the token as a Bearer header.
4. Returns `true` if the response status is OK, `false` otherwise.

---

## ORM Adapter Factory

### `createORMAdapter(type, config)`

Creates a data-access adapter instance.

| Parameter | Type | Description |
|---|---|---|
| `type` | `string` | `'csv'` or `'sqlite'` |
| `config` | `Object` | Adapter-specific configuration |

**Config by type:**

| Type | Config Key | Description |
|---|---|---|
| `csv` | `filePath` | Path to the CSV file |
| `sqlite` | `dbPath` | Path to the SQLite database file |

**Throws:** `Error` for unsupported types.

> **Note:** The adapter implementations (`csvAdapter.js`, `sqliteAdapter.js`, `ormAdapter.js`) are currently empty placeholders.

---

## Build System

The project transpiles `src/` to `dist/` using Babel.

**Presets:** `@babel/preset-env`, `@babel/preset-react`

**Scripts:**
- `npm run build` -- Runs `npx babel src --out-dir dist --copy-files`
- `npm run prepare` -- Runs the build (executed automatically on `npm install`)
- `npm test` -- Placeholder (currently exits with error)

---

## Package Exports

The `exports` field in `package.json` provides conditional entry points:

```json
{
    ".": {
        "require": "./dist/server",
        "import": "./dist/client"
    },
    "./server": "./dist/server",
    "./client": "./dist/client"
}
```

- **CommonJS** (`require`): resolves to the server module.
- **ESM** (`import`): resolves to the client module.
- Explicit subpath imports (`/server`, `/client`) are available for unambiguous access.
