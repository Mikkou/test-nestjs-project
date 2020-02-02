<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>

## Description

This is the test project based on [Nest](https://github.com/nestjs/nest), Docker, MySql with some REST api.

## Installation

```bash
$ npm ci
```

## Running the app

```bash
$ docker build -t nestjs-mysql .
$ docker run -dp 3306:3306 nestjs-mysql
$ npm run start
```

## REST api list
'1. upload image

POST: /users/:userId/avatar

BODY: Multipart with one key - file

'2. create new user

POST: /users

BODY: 
```$xslt
{
	"firstName": "Cat",
	"lastName": "Tac",
	"gender": "f",
	"birthday": "2020-03-02T14:50:59.140Z"
}
```

'3. update user by id

PUT: /users

BODY:
```$xslt
{
	"firstName": "Cat",
	"lastName": "Tac",
	"gender": "f",
	"birthday": "2020-03-02T14:50:59.140Z",
	"id": 1
}
```

'4. delete user by id

DELETE: /users/:userId

'5. get all users

GET: /users?filterKey=gender$filterValue=f

'6. get user by id

GET: /users/:userId


## License

[MIT licensed](LICENSE).
