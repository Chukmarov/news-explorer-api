# News-explorer-api.
## Creating backend part for diploma work.
### This server part of service where you can search news in web. Read them and save. Enjoy)
#### Instruction:
| Question | Answer |
|----------------|:---------:|
| To clone repo | git clone |
| To install | npm install |
| To develop project| npm run dev |
| To visit| npm run dev |
| To visit server| news-api.students.nomoreparties.co |
|----------------|:---------:|

##### Functional:
*  GET /users/me (return information about user, such as "email" and "name"),
*  GET /articles (return all saved articles),
*  POST /articles (save article in own page),
*  DELETE /articles/:articleId (delete article from saved)
*  POST /signup (create new user with tags "name", "email", "password"),
*  POST /signin (checked user's email and password and return JWT)

###### Used technologies: 
* Node.js
* Express.js
* MongoDB
* Mongoose
* Nodemon
* Eslint
* bcrypt
* JSON Web Token
* Сelebrate и Joi
* Winston
* Helmet
