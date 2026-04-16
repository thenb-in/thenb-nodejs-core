# Repository Summary

## What

`thenb-nodejs-core` is a shared npm package (v0.0.2) that provides reusable authentication and data-access modules for full-stack JavaScript applications built with Express and React.

## Why

To avoid re-implementing JWT-based auth flows and basic CRUD patterns in every new project. This library extracts those concerns into a single installable dependency with both server and client exports.

## Structure

```
src/
  config.js              -- Shared config store (JWT_SECRET)
  server/
    index.js             -- Server entry point
    auth/
      authService.js     -- JWT sign/verify (jsonwebtoken)
      authMiddleware.js  -- Express route guard middleware
      authController.js  -- Login, signup, verify handlers
      authRouter.js      -- Express Router factory
    orm/
      index.js           -- Adapter factory (csv, sqlite)
      adapters/          -- Placeholder adapter files
  client/
    index.js             -- Client entry point
    components/
      Auth/Login.js      -- MUI login form
      Auth/Signup.js     -- MUI signup form
      AuthRoutes.js      -- React Router route definitions
      PrivateRoute.js    -- Auth-gated route wrapper
    utils/auth.js        -- Token verification utility
dist/                    -- Babel-compiled output
archive/                 -- Legacy single-file entry point
```

## Tech Stack

| Layer | Technology |
|---|---|
| Server runtime | Node.js, Express |
| Authentication | JSON Web Tokens (jsonwebtoken) |
| Client framework | React 17/18 |
| UI library | Material UI 6.x |
| Routing | React Router 5.x/6.x |
| Build tool | Babel (preset-env, preset-react) |
| Package format | CommonJS (server), ESM (client) |

## Key Stats

| Metric | Value |
|---|---|
| Source files | 14 |
| Lines of code (src/) | ~280 |
| npm dependencies (dev) | 4 |
| Peer dependencies | 3 |
| Test coverage | 0% (no tests) |
| Version | 0.0.2 |
| License | ISC |

## Current State

The project is in early prototype stage. The authentication flow is structurally complete but uses mocked data -- there is no real user persistence, no password hashing, and no input validation. The ORM adapter files are empty placeholders. No tests, linting, or CI are configured.

## Entry Points

- **Server**: `require('thenb-nodejs-core/server')` exports `init`, `authMiddleware`, `AuthService`, `createAuthRouter`
- **Client**: `import { AuthRoutes, PrivateRoute, Login, Signup } from 'thenb-nodejs-core/client'`
