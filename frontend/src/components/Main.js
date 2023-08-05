/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete  }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__content">
          <button
            onClick={onEditAvatar}
            className="profile__pen"
            type="button"
            aria-label="Редактировать аватар"
          >
           <img src={currentUser.avatar} alt={currentUser.name} className="profile__avatar" />
          </button>
          <div className="profile__info">
            <div className="profile__info-container">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                onClick={onEditProfile}
                className="profile__edit"
                type="button"
                aria-label="Редактировать профиль"
              ></button>
            </div>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Добавить изображение"
        ></button>
      </section>
      <section className="elements">
      {cards.map((card) => (
						<Card
							key={card._id}
							card={card}
							onCardClick={onCardClick}
							onCardLike={onCardLike}
							onCardDelete={onCardDelete}
              />
        ))}
      </section>
    </main>
  );
}

export default Main;
