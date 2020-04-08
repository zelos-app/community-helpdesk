# /users endpoint

## Methods

### POST /

Invites an user

**Body**
```json
{
    "email": "user@email.com",
    "admin": "true"
}
```

### GET /

Lists users

**Query**
```
limit=100 // optional
skip=0 // optional
```