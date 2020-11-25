const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SOLT_ROUND } = require('../configs/index');
const user = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

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

module.exports.getOwnerInfo = (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  User.findById(_id)
    .orFail(() => {
      const err = new Error('Пользователь не найден');
      err.statusCode = 404;
      throw err;
    })
    .then((user) => res.status(200).send(user))
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
  const {
    name, about, avatar, email, password,
  } = req.body;
  User.findOne({ email })
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.status(409).send({ message: 'Пользователь с таким email уже зарегистрирован' });
      }
    });
  bcrypt.hash(password, SOLT_ROUND)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    // eslint-disable-next-line no-shadow
    .then((user) => res.status(201).send({ _id: user._id }))
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

module.exports.login = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (matched) {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
          { expiresIn: '7d' },
        );
        return res.send({ token });
      }
      return Promise.reject(new Error('Неправильные почта или пароль'));
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};
