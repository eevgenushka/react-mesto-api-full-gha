const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const ErrorHandler = require('./errors/ErrorHandler');
const NotFoundError = require('./errors/NotFoundError');
const { createUser, login } = require('./controllers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(requestLogger);
app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://eevgenushka.nomoreparties.co'],
}));

app.use('/', express.json());
app.use('/users', auth, require('./routes/users'));
app.use('/cards', auth, require('./routes/cards'));

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().min(2).max(30)
        .email(),
      password: Joi.string().required().min(6),
    }),
  }),
  login,
);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^:?https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);
app.use('*', auth, () => {
  throw new NotFoundError('Страницы не существует');
});

app.use(errorLogger);
app.use(errors());
app.use(ErrorHandler);
app.listen(PORT, () => {
  console.log(PORT);
});
