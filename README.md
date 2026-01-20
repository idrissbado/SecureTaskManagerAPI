# 🔒 SecureTaskManagerAPI

A secure Task Manager REST API with JWT and Google authentication, robust error handling, and best security practices.

## Features
- JWT-based authentication (signup/login)
- Google OAuth login (Passport.js)
- Secure HTTP-only cookie for JWT
- User can create, view, and delete their own tasks
- Only the owner can access/delete their tasks
- Security: helmet, xss-clean, express-mongo-sanitize, rate limiting
- Centralized error handling and async error wrapper

## Essential Endpoints
- `POST /auth/signup` – Register a new user (JWT)
- `POST /auth/login` – Login with JWT (rate limited)
- `GET /auth/google` – Google OAuth login
- `POST /tasks` – Create a task (auth required)
- `GET /tasks` – List user tasks (auth required)
- `DELETE /tasks/:id` – Delete user task (auth required, owner only)

## Security Practices
- All inputs sanitized (xss-clean, express-mongo-sanitize)
- Secure headers (helmet)
- JWT stored in HTTP-only cookie
- Rate limiting on login
- Access control on all task routes

## Error Handling
- Custom `AppError` class for consistent errors
- Centralized error middleware
- All async routes wrapped with `catchAsync()`

## How to Run
1. `npm install`
2. Configure `.env` (MongoDB URI, JWT secret, Google OAuth credentials)
3. `npm start`

## Technologies
- Node.js, Express, MongoDB, Passport.js, JWT, Helmet, xss-clean, express-mongo-sanitize, express-rate-limit

---

Built by Idriss Bado – Security, Clean Code, and Real-World Best Practices.
