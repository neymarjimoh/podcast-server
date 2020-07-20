# podcast-server
A Podcast management application

## Problem Statement/Test

Most of the applications you will be working on typically will be using CRUD applications at the basic, and as such develop a podcast management application which will be accessed majorly by exposing REST API end points. The application should have the following features
- Create a User and Admin
- User and Admin login
- Upload a podcast (title, description, tag, file, date uploaded )
- Authentication
- Admin modify podcast
- Admin delete podcast
- Admin view all podcasts
- A READ.me documentation

## Prerequisites
- Nodejs installed
- npm/yarn installed (this project uses npm)

## Tools
- MongoDB
- Nodejs
- Express

## Getting Started
A step-by-step guide on how to test this project's endpoints
- Clone this repo to your computer locally, `git clone https://github.com/neymarjimoh/podcast-server`
- cd into podcast-server, `cd podcast-server`
- npm or yarn install to install the server dependencies, `npm install` 
- Start/Run the server, yarn start or npm run start to start the server
- On postman or any restful client, navigate to `http://localhost:7500`.

**NOTE:**
This project uses Mongodb Atlas. If you'll will like to have database freedom, Make sure you have MongoDB installed and change the connection string on `src/config/index.js` file on line 4 as follows and leave the rest at default.
`"mongodb://localhost:27017/podcast-server"`

---

## API Spec

### status codes:

401 for Unauthorized requests, when a request requires authentication but it isn't provided

403 for Forbidden requests, when a request may be valid but the user doesn't have permissions to perform the action

404 for Not found requests, when a resource can't be found to fulfill the request

200 for successful request 

201 for creating a new object upon successful request

409 document conflict

500 internal server error

### Users/Admin (for authentication)

```source-json
{
  "user": {
    "email": "jake@jake.jake",
    "name": "jakerman node",
    "password": "userpassword",
    "passwordConfirm": "userpassword",
    "role": "user/admin",
  }
}
```

### Podcast

```source-json
{
  "podcast": {
    "title": "Backend",
    "description": "How to become a backend engineer",
    "file": "podcast file",
    "tag": ["technology", "science"],
    "dateUplaoded": "date",
  }
}
```

## Endpoints:

### Authentication: User and admin login

`POST /api/v1/auth/login`

Example request body:

```source-json
{
  "user":{
    "email": "jake@jake.jake",
    "password": "jakejake"
  }
}
```

No authentication required, returns a User with **token** to grant access to other endpoints based on user's role

Required fields: `email`, `password`

### Registration: Admin

`POST /api/v1/auth/signup`

Example request body:

```source-json
{
  "user":{
    "email": "jake@jake.jake",
    "name": "jakerman node",
    "password": "userpassword",
    "passwordConfirm": "userpassword",
    "role": "admin",
  }
}
```

No authentication required, returns a User

Required fields: `email`, `name`, `password`, `role`

### Registration: User

`POST /api/v1/auth/signup`

Example request body:

```source-json
{
  "user":{
    "email": "jake@jake.jake",
    "name": "jakerman node",
    "password": "userpassword",
    "passwordConfirm": "userpassword",
  }
}
```

No authentication required, returns a User

Required fields: `email`, `name`, `password`


### Upload a podcast

`POST /api/v1/podcasts/upload`

Example request body:

```source-json
{
  "podcast":{
    "title": "Backend",
    "description": "How to become a backend engineer",
    "file": "podcast file",
    "tag": ["technology", "science"],
    "dateUplaoded": "date",
  }
}
```
Authentication required (only logged in users), returns created podcast

Required fields: `title`, `description`, `file`, `tag`

### Modify Podcast by Admin 

`PATCH /api/v1/podcasts/{podcastId}`

Example request body:

```source-json
{
    "title": "Backend",
    "description": "How to become a backend engineer",
    "tag": ["technology", "science"],
    "dateUplaoded": "date",
}
```

Authentication required (only admins), returns success message

Accepted fields: `title`, `description`, `tag`

### Delete Podcast by Admin

`DELETE /api/v1/podcasts/{podcastId}`

Authentication required (only admins), 

Required parameters: `podcast Id`

### Search Podcasts By Title 

`GET /api/v1/podcasts?page=1&limit=10`

Returns most recent articles globally by default, provide `tag`, `author` or `favorited` query parameter to filter results

Query Parameters:

Filter by title:

`?title=NodeJS`

Authentication required (admin only), will return multiple podcasts that match the title query passed

### View Podcasts by Admin

`GET /api/v1/podcasts?page=1&limit=10`

Can also take `limit` and `page` query parameters for pagination. Defaults 10 and 1 respectively if not provided

Authentication required (admin only), will return multiple podcasts in pagination based on the page and limit. The default query are set to `page=1` and `limit=10`, if these are provided by the admin they override the default values and paginate as requested.

### View A podcast by Admin

`GET /api/v1/podcasts/{podcastId}`

Authentication required (only admins), returns fetched podcast

Required parameters: `podcast Id`
