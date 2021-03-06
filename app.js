require('dotenv').config();

//  подключаем фреймворк
const express = require('express');
const cors = require('cors');
//  подключаем плагины
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const {
  celebrate, Joi, errors, Segments,
} = require('celebrate');

//  блок роутов
const articleRouter = require('./routes/article.js');
const userRouter = require('./routes/user.js');
//  блок контроллеров
const { createUser } = require('./controllers/user');
const { login } = require('./controllers/login');
//  блок middlewares
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
//  блок errors
const { NotFoundError } = require('./errors/notFoundError');

const { PORT = 3000 } = process.env;

const corsOptions = {
  origin: [
    'https://news-api.tk',
    'https://www.news-api.tk',
    'http://localhost:8080',
    'https://chukmarov.github.io',
    'https://www.chukmarov.github.io',
  ],
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Content-Type',
    'origin',
    'x-access-token',
    'Authorization'
  ],
  credentials: true
};

// const allowedList = [
//   'https://news-api.tk',
//   'https://www.news-api.tk',
//   'http://localhost:8080',
//   'https://chukmarov.github.io'
// ];

// const corsOptions = {
// origin: (origin, callback) => {
//   if (allowedList.indexOf(origin) !== -1) {
//     callback(null, true);
//   } else {
//     callback(new Error('Not allowed by CORS'));
//   }
// },
// credentials: true,
// };

const app = express();

//  подключаемся к локальной базе данных мангуст
mongoose.connect('mongodb://localhost:27017/news-explorer-api', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

// app.use(cors(corsOptions));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());
app.use('*', cors(corsOptions));

app.use(helmet());
app.use(requestLogger);

app.post('/signin', celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

app.post('/signup', celebrate({
  [Segments.BODY]: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/articles', articleRouter);

app.all('/*', () => {
  throw new NotFoundError('Запрашиваемый  ресурс  не  найден');
});

app.use(errorLogger);
app.use(errors());

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
