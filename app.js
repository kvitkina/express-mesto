require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cardsRoutes = require('./routes/cards.js');
const usersRoutes = require('./routes/users.js');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { requestLogger, errorLogger } = require('./middlewares/logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
app.use(requestLogger); // логгер запросов

// обработчики роутов
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(6),
  }),
}), createUser);

app.use(auth); // защита роутов

app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('*', (req, res) => {
  throw new NotFoundError('Запрашиваемый ресурс не найден');
});

app.use(errorLogger); // логгер ошибок

// обработчики ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => { // централизованный обработчик ошибок
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
