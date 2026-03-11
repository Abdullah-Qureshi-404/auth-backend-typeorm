# Auth Backend using Express + TypeORM

Backend API for authentication and user profile management using:
- Node.js + Express
- PostgreSQL + TypeORM
- JWT authentication
- Nodemailer for forgot-password email flow

This backend is configured to work with a frontend running on `http://localhost:5173`.

## Features

- User signup
- User login with JWT token
- Forgot password (email reset link)
- Reset password using reset link token
- Authenticated password reset
- Authenticated profile update

## Tech Stack

- Express 5
- TypeORM 0.3
- PostgreSQL (`pg`)
- JSON Web Token (`jsonwebtoken`)
- Validation (`express-validator`)
- Password hashing (`bcrypt`)
- Email sending (`nodemailer`)
- Environment config (`dotenv`)

## Project Structure

```txt
controller/
  email.js
  login.js
  signup.js
  updateProfile.js
middleware/
  authMiddleware.js
  signup.js
routes/
  login.js
  signup.js
services/
  email.js
  login.js
  signup.js
  updateProfile.js
src/
  database/
    dataSource.js
  entity/
    User.js
utils/
  jwt.js
validators/
  auth.js
server.js
```

## Prerequisites

- Node.js 18+
- PostgreSQL running locally
- A Gmail account (or app password) for email sending

## Installation

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in project root:

```env
PORT=3000
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=1d
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
```

3. Configure database connection in `src/database/dataSource.js`.

Current code uses:
- host: `localhost`
- port: `5432`
- username: `postgres`
- password: `*****`
- database: `User`
- synchronize: `true`

Update these values to match your local PostgreSQL setup.

4. Start the server:

```bash
node server.js
```

Optional (dev mode with auto-reload):

```bash
npx nodemon server.js
```

## Base URL

```txt
http://localhost:3000/api
```

Health check:

```txt
GET http://localhost:3000/
```

## CORS

Server currently allows requests from:

```txt
http://localhost:5173
```

If your frontend runs on another host/port, update CORS in `server.js`.

## Authentication

Protected routes require Bearer token in header:

```http
Authorization: Bearer <jwt_token>
```

## API Endpoints

### 1) Signup

- Method: `POST`
- Route: `/signup`
- Public: Yes

Request body:

```json
{
  "username": "john",
  "email": "john@example.com",
  "password": "12345"
}
```

Success response (201):

```json
{
  "message": "User created (services)",
  "user": {
    "id": 1,
    "username": "john",
    "email": "john@example.com",
    "token": "<jwt>"
  }
}
```

### 2) Login

- Method: `POST`
- Route: `/login`
- Public: Yes

Request body:

```json
{
  "email": "john@example.com",
  "password": "12345"
}
```

Success response (200):

```json
{
  "message": "User logged in successfully",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "username": "john",
    "token": "<jwt>"
  }
}
```

### 3) Forgot Password (Email Link)

- Method: `POST`
- Route: `/forgotPassword`
- Public: Yes

Request body:

```json
{
  "email": "john@example.com"
}
```

Behavior:
- Creates a reset token (1 hour expiry)
- Sends reset URL to user email
- Reset URL format:
  `http://localhost:5173/reset-password/<token>`

### 4) Reset Password via Link

- Method: `POST`
- Route: `/reset-Password/:token`
- Public: Yes

Request body:

```json
{
  "password": "newpass123",
  "confirmPassword": "newpass123"
}
```

Success response (200):

```json
{
  "message": "Password Update successfully"
}
```

### 5) Reset Password (Authenticated)

- Method: `POST`
- Route: `/login/resetPassword`
- Protected: Yes

Headers:

```http
Authorization: Bearer <jwt_token>
```

Request body currently expected by service/controller:

```json
{
  "oldPassword": "old12345",
  "newPassword": "new12345",
  "confirmPassword": "new12345"
}
```

### 6) Update Profile

- Method: `POST`
- Route: `/login/updateProfile`
- Protected: Yes

Headers:

```http
Authorization: Bearer <jwt_token>
```

Request body:

```json
{
  "username": "john_new",
  "address": "Street 10",
  "city": "Lahore",
  "country": "Pakistan"
}
```

Success response (200):

```json
{
  "message": "Profile Updated!",
  "user": {
    "username": "john_new",
    "address": "Street 10",
    "city": "Lahore",
    "country": "Pakistan"
  }
}
```

## User Entity Fields

Table: `users`

- `id` (auto-increment primary key)
- `username`
- `email` (unique)
- `password` (hashed)
- `city`
- `country`
- `address`

## Notes and Known Issues

1. `routes/login.js` applies `resetValidator` on `/login/resetPassword`, but this validator expects fields (`email`, `password`, `confirmPassword`) that do not match controller/service fields (`oldPassword`, `newPassword`, `confirmPassword`).
2. `server.js` logs `Server running on http://localhost:3000` even if `PORT` env value is different.
3. Database credentials are hardcoded in `src/database/dataSource.js`; move these to `.env` for safer config.

## Troubleshooting

### Database connection fails

- Verify PostgreSQL service is running.
- Verify DB name, username, password, and port in `src/database/dataSource.js`.
- Ensure database `User` exists.

### JWT errors (401/403)

- Ensure `Authorization` header uses `Bearer <token>` format.
- Check `JWT_SECRET` is set and unchanged.
- Ensure token is not expired.

### Forgot password email not sent

- Check `EMAIL_USER` and `EMAIL_PASS` in `.env`.
- For Gmail, use an app password (not normal account password).
- Check spam folder.

### Validation errors

- Confirm request body keys exactly match endpoint expectations.
- Check minimum password length (5).

## Quick Test Flow

1. `POST /api/signup`
2. `POST /api/login`
3. Use returned token for protected endpoints
4. `POST /api/login/updateProfile`
5. `POST /api/forgotPassword`
6. Open link from email and call `POST /api/reset-Password/:token`

## License

No license specified.
