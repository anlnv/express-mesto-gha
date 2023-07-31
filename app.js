const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ERROR_CODE } = require('./utils/constants');
const { auth } = require('./middlewares/auth');
const { error } = require('./middlewares/errors');

const app = express();

const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const { authValidate, registerValidate } = require('./middlewares/validation');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
console.log('connected to db');
app.use(express.json());
app.use(bodyParser.json());
app.post('/signin', authValidate, login);
app.post('/signup', registerValidate, createUser);
app.use('/cards', auth, cardRouter);
app.use('/users', auth, usersRouter);

app.use('/*', auth, (req, res) => {
  res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Не найдено' });
});
app.use(() => error);

app.listen(3000, () => {
  console.log('Сервер запущен');
});
