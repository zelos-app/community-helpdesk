# Front end routes

## /login

Inputs:
- email
- password

Backend method: `POST /api/auth`

## /users

User management dashboard for admin. Lists users and has button for inviting.

## /users/:id

Individual user

## /users/invite

Invite a new user via email.

Inputs:
- email

## /register/:token

Landing for signup invite email link.

Inputs:
- firstName
- lastName
- password

Check if token is valid: `GET /api/users/reset/:token`
Create account: `PUT /api/users/register/:token`

## /reset/:token

Landing for password reset email link.

Input:
- password

Check if token is valid: `GET /api/users/reset/:token`
Reset password: `PUT /api/users/reset/:token`

