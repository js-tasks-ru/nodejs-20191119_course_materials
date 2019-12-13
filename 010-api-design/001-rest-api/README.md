[RestAPITutorial.com](https://www.restapitutorial.com/)

[RestAPITutorial.ru](http://www.restapitutorial.ru/)

[JSON:API](https://jsonapi.org/)

[OpenAPI/swagger](https://swagger.io/)

[Swagger online editor](https://editor.swagger.io/)


1. All users
```
GET /users?from=0&count=10&filter[email]=*@rambler.ru

Response:
200 - Ok
204 - No Content
```
2. User by Id
```
GET /users/:userId
200 - Ok
204 - No Content
404 - Not Found
```
3. Create user
```
POST /users
POST /users/:userId 

200 - Ok
201 - Created
202 - Accepted (delayed process)
```
4. Change user
```
PUT /users/:id
```
4.1 Change user
```
PUTCH /users/:id
```
5. Delete user
```
DELETE /users/:id
```

400 - Bad request = validation error
401 - Unauthorized
403 - Forbidden

500 - Internal Server Error
