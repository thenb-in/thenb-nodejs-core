# TODO

## Critical

- [ ] **Implement real user persistence in `authController.js`** -- The `login` handler returns a mocked user (`{ id: 1 }`) regardless of credentials. The `signup` handler does not save users. Both must be connected to a real data store.
- [ ] **Implement ORM adapter classes** -- `csvAdapter.js`, `sqliteAdapter.js`, and `ormAdapter.js` are empty placeholder files. The `createORMAdapter` factory references them but they export nothing.
- [ ] **Add `jsonwebtoken` and `express` as dependencies or peer dependencies** -- The package uses both at runtime but neither is declared in `package.json`. Consumers must know to install them manually.

## Security

- [ ] **Hash passwords** -- Neither the login nor signup flow hashes or salts passwords. Use `bcrypt` or `argon2` before any production use.
- [ ] **Validate and sanitize inputs** -- No request validation exists on any endpoint. Add schema validation (e.g., `joi`, `zod`, or `express-validator`).
- [ ] **Add CSRF protection** -- The client stores tokens in `localStorage`, which is vulnerable to XSS. Consider `httpOnly` cookies with CSRF tokens instead.
- [ ] **Make token expiration configurable** -- The 1-hour expiry is hard-coded in `authService.js`. Allow consumers to configure this.

## Code Quality

- [ ] **Add unit and integration tests** -- The `test` script is a placeholder (`exit 1`). No test framework is configured.
- [ ] **Add ESLint configuration** -- No linting rules are defined.
- [ ] **Remove committed `dist/` directory** -- Build artifacts are tracked in git. They should be in `.gitignore` and generated at install time via the `prepare` script.
- [ ] **Clean up archive directory** -- `archive/index.js` is a legacy entry point that references paths like `./src/...` which would not resolve correctly from the package root.

## Features

- [ ] **Add password reset / forgot password flow** -- No mechanism exists for users to recover accounts.
- [ ] **Add refresh token support** -- Only short-lived access tokens are issued. Add refresh tokens for long-lived sessions.
- [ ] **Add role-based access control middleware** -- `authMiddleware` verifies identity but does not check roles. Add a `requireRole('admin')` middleware.
- [ ] **Add logout endpoint** -- No server-side token invalidation exists.
- [ ] **Support additional ORM backends** -- The adapter pattern is in place but only CSV and SQLite stubs exist. Consider PostgreSQL, MySQL, or MongoDB adapters.

## Documentation

- [ ] **Add inline code examples to README.md** -- The README is currently empty.
- [ ] **Add CHANGELOG.md** -- No changelog is maintained.
- [ ] **Add CONTRIBUTING.md** -- No contribution guidelines exist.

## DevOps

- [ ] **Add CI/CD pipeline** -- No GitHub Actions or other CI configuration exists.
- [ ] **Add `.npmignore` or `files` field** -- The published package includes `src/`, `archive/`, and other files that consumers do not need.
- [ ] **Pin Node.js version** -- No `.nvmrc` or `engines` field is present.
