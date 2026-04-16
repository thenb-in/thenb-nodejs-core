# Roadmap

## Phase 1 -- Foundation (Current: v0.0.x)

The library currently provides:
- JWT-based authentication scaffolding (generate, verify, middleware)
- Express router factory for auth endpoints
- React components for login, signup, and route protection
- ORM adapter pattern with CSV and SQLite stubs

**Status:** Early prototype. Core structures exist but critical features (real persistence, password hashing, input validation) are missing.

---

## Phase 2 -- Production Readiness (Target: v0.1.0)

### Authentication Hardening
- [ ] Integrate `bcrypt` for password hashing in signup and login flows
- [ ] Add request validation middleware using `zod` or `joi`
- [ ] Make JWT expiration time configurable via `init()` options
- [ ] Add refresh token support with configurable rotation policy
- [ ] Add rate limiting on auth endpoints to prevent brute-force attacks

### Data Layer
- [ ] Implement the `CSVAdapter` class with full CRUD operations
- [ ] Implement the `SQLiteAdapter` class with full CRUD operations
- [ ] Define a common `ORMAdapter` interface/base class with documented methods
- [ ] Connect auth controller to the ORM layer for real user persistence

### Testing
- [ ] Set up Jest as the test framework
- [ ] Write unit tests for `AuthService`, `authMiddleware`, and `authController`
- [ ] Write integration tests for the auth router endpoints
- [ ] Write component tests for Login, Signup, PrivateRoute, and AuthRoutes
- [ ] Achieve >= 80% code coverage

### Developer Experience
- [ ] Configure ESLint with a standard rule set
- [ ] Add Prettier for code formatting
- [ ] Set up GitHub Actions for CI (lint, test, build)
- [ ] Add `.npmignore` to exclude `src/`, `archive/`, and dev files from published package

---

## Phase 3 -- Feature Expansion (Target: v0.2.0)

### Auth Features
- [ ] Password reset / forgot password flow with email or SMS verification
- [ ] Role-based access control middleware (`requireRole('admin')`)
- [ ] OAuth2 / social login support (Google, GitHub)
- [ ] Multi-factor authentication (TOTP)
- [ ] Account lockout after repeated failed attempts

### ORM Expansion
- [ ] PostgreSQL adapter
- [ ] MySQL adapter
- [ ] MongoDB adapter
- [ ] Migration support for SQL-based adapters
- [ ] Connection pooling and transaction support

### Client Enhancements
- [ ] Theming support for auth components (custom styles, dark mode)
- [ ] Form field customization via props (additional registration fields)
- [ ] Loading spinners and skeleton screens
- [ ] Internationalization (i18n) support
- [ ] Headless mode (logic-only hooks, no UI)

---

## Phase 4 -- Ecosystem (Target: v1.0.0)

- [ ] Publish stable v1.0.0 to npm
- [ ] Comprehensive API documentation site (e.g., Docusaurus)
- [ ] Example applications (full-stack starter templates)
- [ ] TypeScript type definitions (`.d.ts` files or full TS rewrite)
- [ ] Plugin architecture for extending auth flows
- [ ] Performance benchmarks and optimization
- [ ] Security audit by a third party

---

## Versioning Policy

This project follows [Semantic Versioning](https://semver.org/):
- **0.0.x** -- Initial development, breaking changes expected
- **0.x.0** -- Pre-release, API stabilizing
- **1.0.0** -- First stable release with public API guarantees
