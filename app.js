const express = require('express');
const mongoose = require('mongoose');
const {ERROR_CODE} = require('./utils/constants')
const app = express();
const bodyParser = require('body-parser');

const usersRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
console.log('connected to db')
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '64bd390ca5a96e006faf8dee'
  };

  next();
});
app.use(bodyParser.json());
app.use('/cards', cardRouter);
app.use('/users', usersRouter);
/*app.use('*', (req, res) => res.status(ERROR_CODE.NOT_FOUND).send({ message: '404 ошибка'}));*/
app.use((req, res) => {
  res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Не найдено' });
});

app.listen(3000, () => {
    console.log('Сервер запущен')
})

