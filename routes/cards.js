const router = require('express').Router();

const {
  getAllCards,
  deleteCard,
  createCard,
  putLike,
  deleteLike
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:cardId', deleteCard);
router.post('/', createCard);
router.put('/:cardId/likes', putLike);
router.delete('/:cardId/likes', deleteLike);

module.exports = router;
