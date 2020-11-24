require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;
const bodyParser = require('body-parser');
const cardsRoutes = require('./routes/cards.js');
const usersRoutes = require('./routes/users.js');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/', usersRoutes);
app.use('/', cardsRoutes);
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Запрашиваемый ресурс не найден' });
});

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
