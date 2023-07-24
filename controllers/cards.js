const Card = require('../models/card');

const { ERROR_CODE } = require('../utils/constants');

const getAllCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      res.status(ERROR_CODE.SERVER_ERROR).send({message: 'На сервере произошла ошибка'});
  })
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;
  console.log(cardId)
  Card.findByIdAndRemove(cardId)
  .then((card) => {
    if(!card)
      res.status(ERROR_CODE.NOT_FOUND).send({message: 'Карточка с указанным _id не найдена'})
    res.send({card})
  })
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные при удалении карточки.' });
    } else {
      res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  })
}

const createCard = (req, res) => {
  console.log(req.body)
  const { name, link} = req.body;

  Card.create({ name, link, owner: req.user._id})
  .then((card) => {
      res.status(201).send(card)
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании карточки.' });
    } else {
      res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  })
}

const putLike = (req, res) => {
  const {cardId} = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
  .then((card) => {
    if(!card){
      res
        .status(ERROR_CODE.NOT_FOUND)
        .send({ message: 'Передан несуществующий id карточки.' });
    } else {
      res.send({ card });
    }
  })
  .catch(err => {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.' });
    } else {
      res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  })
}

const deleteLike = (req, res) => {
  const {cardId} = req.params;
  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
  )
  .then((card) => {
    if(!card){
      res
        .status(ERROR_CODE.NOT_FOUND)
        .send({ message: 'Передан несуществующий id карточки.' });
    } else {
      res.send({ card });
    }
  })
  .catch(err => {
    if (err.name === 'CastError') {
      res.status(ERROR_CODE.BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.' });
    } else {
      res.status(ERROR_CODE.SERVER_ERROR).send({ message: 'На сервере произошла ошибка' });
    }
  })
}

module.exports = {
  createCard,
  getAllCards,
  deleteCard,
  putLike,
  deleteLike
}