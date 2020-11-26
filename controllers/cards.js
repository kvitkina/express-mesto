const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const validationError = new BadRequestError('Ошибка валидации');
        next(validationError);
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка не найдена');
    })
    .then((card) => {
      if (card.owner.toString() === userId) {
        Card.findByIdAndRemove(cardId).then((card) => res.status(200).send(card));
      } else {
        throw new BadRequestError('Нельзя удалять чужую карточку');
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const validationError = new BadRequestError('Не валидный id');
        next(validationError);
      }
      if (err.statusCode === 404) {
        const notFoundError = new NotFoundError('Карточка не найдена');
        next(notFoundError);
      }
      next(err);
    });
};
