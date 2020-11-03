const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(500).send(err));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(400).send({ message: 'Не валидный id' });
      }
      if (err.statusCode === 404) {
        return res.status(404).send({ message: 'Пользователь не найден' });
      }
      res.status(500).send(err);
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const errorList = Object.keys(err.errors);
        const messages = errorList.map((item) => err.errors[item].message);
        res.status(400).send({ message: `Ошибка валидации: ${messages.join(' ')}` });
      } else {
        res.status(500).send({ message: 'Ошибка на сервере' });
      }
    });
};
