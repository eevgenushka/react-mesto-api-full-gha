/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

	const currentUser = useContext(CurrentUserContext);

	const [name, setName] = useState('');
	const [description, setDescription] = useState('');

	function handleChangeName(e) {
		setName(e.target.value)
	}

	function handleChangeDescription(e) {
		setDescription(e.target.value)
	}

    function handleSubmit(e) {
        e.preventDefault();
		onUpdateUser({
			name,
			about: description,
        });
	}

      useEffect(() => {
		setName(currentUser.name);
		setDescription(currentUser.about);
	}, [currentUser, isOpen]);

    return (
        <PopupWithForm
        name="edit-profile"
        title="Редактировать профиль"
        buttonText={isLoading ? "Сохранение..." : "Сохранить"}
        isOpen={isOpen}
		onClose={onClose}
		onSubmit={handleSubmit}
      >
        <input
          id="name-input"
          type="text"
          name="name"
          className="popup__input popup__input_type_name"
          placeholder="Укажите имя"
          value={name || ''}
          onChange={handleChangeName}
          minLength={2}
          maxLength={40}
          required=""
        />
        <span className="popup__error" id="name-input-error">
          Заполните это поле{" "}
        </span>
        <input
          id="about-input"
          type="text"
          name="about"
          className="popup__input popup__input_type_job"
          placeholder="Укажите профессию"
          value={description || ''}
          onChange={handleChangeDescription}
          minLength={2}
          maxLength={200}
          required=""
        />
        <span className="popup__error" id="job-input-error">
          Заполните это поле
        </span>
      </PopupWithForm>
    );
}
export default EditProfilePopup;