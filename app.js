const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const helmet = require('helmet');
const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');
const { login } = require('./controllers/login');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/news-explorer-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(helmet());

// app.post('/signin', celebrate({
//   [Segments.BODY]: Joi.object({
//     email: Joi.string().required().email(),
//     password: Joi.string().required().min(8),
//     name:Joi.string().required().min(2).max(30),
//   }),
// }), login);

// app.all('/*', () => {
//   throw new NotFoundError('Запрашиваемый  ресурс  не  найден');
// });

// app.use(errors());


app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    res.status(400).send({ message: 'Проверьте пожалуйста правильность введеных данных' });
  } else {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  }
});

app.listen(PORT, () => {});