const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUsers, getUserById, getOwnerInfo } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getOwnerInfo);
router.get('/users/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
}), getUserById);
module.exports = router;
