# Elevvo Backend Task 4: JWT Authentication

Express + TypeScript API with secure authentication.

## Features
- Register and login with bcrypt password hashing
- JWT access tokens (1 hour expiry)
- Protected routes with an auth middleware
- Role-based access (user / admin)
- helmet, cors and rate limiting

## Run
npm install
npx tsx src/index.ts

## Endpoints
- POST /api/auth/register  { email, password, role? }
- POST /api/auth/login     { email, password } -> { token }
- GET  /api/auth/me        (Bearer token)
- GET  /api/auth/admin     (Bearer token, admin only)