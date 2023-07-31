const router = require('express').Router();
const { userValidate, userIdValidate, avatarValidate } = require('../middlewares/validation');

const {
  getAllUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/me', getCurrentUser);
router.get('/', getAllUsers);
router.get('/:userId', userValidate, getUser);
router.patch('/me', userIdValidate, updateUser);
router.patch('/me/avatar', avatarValidate, updateUserAvatar);

module.exports = router;
