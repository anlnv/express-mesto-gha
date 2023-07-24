const User = require('../models/user');

const { ERROR_CODE } = require('../utils/constants');

const getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res.status(ERROR_CODE.SERVER_ERROR).send({message:'На сервере произошла ошибка'});
  })
};

const getUser = (req, res) => {
  const { userId } = req.params
  User.findById(userId)
  .then((user) => {
    if (!user) {
      res.status(ERROR_CODE.NOT_FOUND).send({ message: 'Пользователь с указанным id не найден' });
    } else {
      res.send(user);
    }
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные' });
    } else {
      res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  })
}

const createUser = (req, res) => {
  console.log(req.body)
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
  .then((user) => {
      res.status(201).send(user)
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя' });
    } else {
      res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  })
}

const updateUser = (req, res) => {
  const userId = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
  .then((user) => {
    if (!user) {
      res
        .status(ERROR_CODE.NOT_FOUND)
        .send({ message: 'Пользователь по указанному id не найден.' });
    } else {
      res.send({ user });
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE.BAD_REQUEST).send({
        message: 'Переданы некорректные данные при обновлении профиля.',
      });
    } else {
      res.status(ERROR_CODE.SERVER_ERROR).send({
        message: 'На сервере произошла ошибка',
      });
    }
  });
};

const updateUserAvatar = (req, res) => {
  const userId = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    userId,
    { avatar },
    { new: true}
  )
  .then((user) => {
    if (!user) {
      res
        .status(ERROR_CODE.NOT_FOUND)
        .send({ message: 'Пользователь по указанному id не найден.' });
    } else {
      res.send({ user });
    }
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE.BAD_REQUEST).send({
        message: 'Переданы некорректные данные при обновлении аватара.',
      });
    } else {
      res.status(ERROR_CODE.SERVER_ERROR).send({
        message: 'На сервере произошла ошибка'
      });
    }
  });

  console.log(req.body);
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  updateUserAvatar
}