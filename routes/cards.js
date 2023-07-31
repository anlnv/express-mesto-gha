const router = require('express').Router();
const { cardIdValidate, cardValidate } = require('../middlewares/validation');

const {
  getAllCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:cardId', cardIdValidate, deleteCard);
router.post('/', cardValidate, createCard);
router.put('/:cardId/likes', cardIdValidate, putLike);
router.delete('/:cardId/likes', cardIdValidate, deleteLike);

module.exports = router;
