# Front end routes

## /login DONE

Inputs:
- email
- password

Method: `POST /api/auth`

## /login/reset DONE

For requesting a password reset. 

Inputs:
- email

Method: `POST /api/auth/reset?email=email@domain.com`*

*Always returns 200

## /users

User management dashboard for admin. Lists users and has button for inviting.

**Back end**

Method: `GET /api/users` (`?limit=int&skip=int`)

## /users/:id

Get individual user details

**Back end**

Method: `GET /api/users/:id`

## /users/invite

Invite a new user via email.

Inputs:
- email
- admin (bool, default false)

Method: `POST /api/users`

## /register/:token DONE

Landing for signup invite email link.

Inputs:
- firstName
- lastName
- password

Check if token is valid first: `GET /api/auth/reset/:token`

Create account: `PUT /api/auth/register/:token`

## /reset/:token DONE

Landing for password reset email link.

Input:
- password

Check if token is valid first: `GET /api/auth/reset/:token`

Reset password: `PUT /api/auth/reset/:token`

