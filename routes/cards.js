const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getCards, createCard, deleteCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/),
  }),
}), createCard);
router.delete('/cards/:cardId', deleteCard);

module.exports = router;
