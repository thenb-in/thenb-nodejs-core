# thenb-nodejs-core

A shared Node.js library providing reusable **authentication** and **ORM** modules for both server-side (Express/Node.js) and client-side (React) applications.

## Quick Links

| Document | Description |
|---|---|
| [APPLICATION_DOC.md](APPLICATION_DOC.md) | Architecture overview and module descriptions |
| [TECHNICAL_DOC.md](TECHNICAL_DOC.md) | Technical reference: APIs, configuration, and internals |
| [USER_DOCS.md](USER_DOCS.md) | Getting-started guide and usage examples |
| [TODO.md](TODO.md) | Known issues and pending tasks |
| [ROADMAP.md](ROADMAP.md) | Future plans and feature roadmap |
| [REPO_SUMMARY.md](REPO_SUMMARY.md) | High-level repository summary |

## What Is This Package?

`thenb-nodejs-core` is a dual-purpose npm package (version 0.0.2) that exposes:

- **Server exports** (`thenb-nodejs-core/server`) -- JWT-based authentication middleware, service, router, and a pluggable ORM adapter factory (CSV, SQLite).
- **Client exports** (`thenb-nodejs-core/client`) -- Pre-built React components for Login, Signup, route protection (`PrivateRoute`), and auth routing (`AuthRoutes`), built with Material UI.

## Installation

```bash
npm install thenb-nodejs-core
```

### Peer Dependencies

| Package | Version |
|---|---|
| `@mui/material` | ^6.1.6 |
| `react` | ^17.0.0 \|\| ^18.0.0 |
| `react-router-dom` | ^5.2.0 \|\| ^6.0.0 |

## Minimal Example

### Server

```js
const { init, authMiddleware, createAuthRouter } = require('thenb-nodejs-core/server');

init({ JWT_SECRET: process.env.JWT_SECRET });

const app = require('express')();
app.use('/api/users', createAuthRouter());
app.get('/protected', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});
app.listen(3000);
```

### Client (React)

```jsx
import { AuthRoutes, PrivateRoute } from 'thenb-nodejs-core/client';

function App() {
    return (
        <>
            <AuthRoutes basePath="/auth" />
            <PrivateRoute component={Dashboard} />
        </>
    );
}
```

## License

ISC
