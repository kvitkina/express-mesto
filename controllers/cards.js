const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(() => res.status(500).send({ massage: 'Ошибка чтения файла' }));
}

module.exports.createCard = (req, res) => {
  const { name, link} = req.body
  Card.create({ name, link })
    .then(card => res.send(card))
    .catch(() => res.status(500).send({ massage: 'Ошибка чтения файла' }));
}

module.exports.deleteCard = (req, res) => {
  const { id } = req.params;
  User.findByIdAndRemove(id)
    .then(card => res.send(card))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}