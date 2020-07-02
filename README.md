# Description

---

Auth is a backend authentication server exposing a RESTFUL API to requesting clients. It uses jwt tokens to authenticate users and keep them logged in.

# Database Schema

![UserModel](https://i.ibb.co/r2MC87f/database-auth.png)

#### User Model

A simplistic model for user to illustrate the authentication example.

# Instructions to run

---

This project is packaged via npm; the respective package.json file contains all required scripts.

In order to the run the project, the dependencies need to be installed first.

---

To install all dependencies:

```
    `yarn install` or `npm install`
```

---

To start the server:

```
    `yarn start` or `npm start`
```

---

The project expects a mongoDB database server with the appropriate mongoose configuration; failure to find a database-server would cause the server to throw an error. The project expects the connection to saved in a `.env` file against the variable `DB_CONNECT`.

If database configurations are met then the server will launch at `localhost:8000/` and listen for incoming requests. The project is ran via `nodemon`, any changes in the files would cause the server to restart for a faster dev. experience.

# REST API: GET and POST requests

#### POST REQUESTS

---

## Register User

#### POST api/user/register

```json
Body
{
  "name":"sampleName",
  "password":"sampelPassword",
  "email":"sampleEmail@sampleDomain.com"
}
```

#### Expected Response

```json
{
    "user": "userID"
}
```

## Login User

#### POST api/user/login

```json
Body
{
  "email":"sampleEmail@sampleDomain.com",
  "password":"sampelPassword"
}
```

#### Expected Response

```json
{
    "auth-token": "token"
}
```

## Access Protected Route

#### GET api/posts

```json
Header
{
  "auth-token":"token"
}
```

#### Expected Response

```json
{
    "name": "userName"
}
```

## Get All Users

#### GET api/user

#### Expected Response

```json
[
    {
        "name": "sampleName",
        "email": "sampleEmail@sampleDomain.com"
    }
]
```

# Acknowledgement

This project is based on tutorials by youtuber DevEd. Here is a link to Ben's channel: https://www.youtube.com/watch?v=2jqok-WgelI99baddawg; like, share and follow his channel if you appreciate the content.
