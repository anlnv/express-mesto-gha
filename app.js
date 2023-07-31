const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const signupRouter = require('./routes/signupRouter');
const signinRouter = require('./routes/signinRouter');
const auth = require('./middlewares/auth');
const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const NotFoundError = require('./errors/NotFoundError');
const error = require('./middlewares/errors');

const URL = 'mongodb://127.0.0.1:27017/mestodb';

mongoose
  .connect(URL)
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

const app = express();

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', signinRouter);
app.post('/signup', signupRouter);

app.use(auth);

app.use('/cards', cardRouter);
app.use('/users', usersRouter);

app.use((req, res, next) => next(new NotFoundError('Запрашиваемый ресурс не найден.')));
app.use(errors());
app.use(error);

app.listen(3000, () => {
  console.log('Сервер запущен');
});
