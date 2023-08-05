/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

    const [name, setName] = useState('');
	const [link, setLink] = useState('');

	function handleChangeName(e) {
		setName(e.target.value)
	}

	function handleChangeLink(e) {
		setLink(e.target.value)
	}

	function handleSubmit(e) {
		e.preventDefault();
        
		onAddPlace({
			name,
			link
		});
	}

	useEffect(() => {
		setName('');
		setLink('');
	}, [isOpen]);

	return (
        <PopupWithForm
        name="add-card"
        title="Новое место"
        buttonText={isLoading ? "Создание..." : "Создать"} 
        isOpen={isOpen}
		onClose={onClose}
		onSubmit={handleSubmit}
      >
        <input
          id="description"
          type="text"
          name="description"
          value={name || ''}
          onChange={handleChangeName}
          className="popup__input popup__input_type_place"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
        />
        <span className="popup__error" id="title-input-error">
          Вы пропустили это поле.
        </span>
        <input
          id="link"
          type="url"
          name="link"
          value={link || ''}
          onChange={handleChangeLink}
          className="popup__input popup__input_type_link"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__error" id="link-input-error">
          Введите адрес сайта.
        </span>
      </PopupWithForm>
    );
    }

    export default AddPlacePopup