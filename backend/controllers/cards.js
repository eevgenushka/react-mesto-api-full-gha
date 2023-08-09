const Cards = require('../models/card');
const NotFoundError = require('../errors/NotFoundError');
const NoRightsError = require('../errors/NoRightsError');
const BadRequestError = require('../errors/BadRequestError');

const SUCCESS = 200;

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { userId } = req.user;

  Cards.create({ name, link, owner: userId })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные при создании карты.'));
      } else {
        next(err);
      }
    });
};

const getCards = (req, res, next) => {
  Cards.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

const deleteCard = (req, res, next) => {
  const { id: cardId } = req.params;
  const { userId } = req.user;

  Cards
    .findById({
      _id: cardId,
    })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка по указанному _id не найдена.');
      }
      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) {
        throw new NoRightsError('Невозможно удалить карту с другим _id пользователя.');
      }
      return Cards.findByIdAndDelete(cardId);
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        throw new NotFoundError('Переданы некорректные данные.');
      }
      res.send({ data: deletedCard });
    })
    .catch(next);
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  Cards.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } }, // добавить _id в массив, если его там нет
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) {
        return res.status(SUCCESS).send({ data: card });
      }
      return next(new NotFoundError('Запрашиваемая карточка не найдена.'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для постановки лайка.'));
      }
      return next(err);
    });
};

const dislikeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { userId } = req.user;

  Cards.findByIdAndUpdate(
    cardId,
    { $pull: { likes: userId } }, // убрать _id из массива
    {
      new: true,
    },
  )
    .then((card) => {
      if (card) {
        return res.send({ data: card });
      }
      return next(new NotFoundError('Запрашиваемая карточка не найдена.'));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new BadRequestError('Переданы некорректные данные для постановки дизлайка.'));
      }
      return next(err);
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  likeCard,
  dislikeCard,
};
