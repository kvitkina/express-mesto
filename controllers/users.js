const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const User = require('../models/user');
const { SOLT_ROUND } = require('../configs/index');

const { NODE_ENV, JWT_SECRET } = process.env;
const NotFoundError = require('../errors/not-found-err');
const BadRequestError = require('../errors/bad-request-err');
const UnauthorizedError = require('../errors/unauthorized-err');

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => {
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .then((user) => res.send(user))
    // eslint-disable-next-line consistent-return
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Не валидный id');
      }
      if (err.statusCode === 404) {
        throw new NotFoundError('Нет пользователя с таким id');
      }
      res.status(500).send(err);
    });
};

module.exports.getOwnerInfo = (req, res) => {
  const { _id } = req.user;
  User.findById(_id)
    .orFail(() => {
      throw new NotFoundError('Нет пользователя с таким id');
    })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        throw new BadRequestError('Не валидный id');
      }
      if (err.statusCode === 404) {
        throw new NotFoundError('Нет пользователя с таким id');
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
  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (user) {
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
      throw new UnauthorizedError('Ошибка авторизации');
    });
};
