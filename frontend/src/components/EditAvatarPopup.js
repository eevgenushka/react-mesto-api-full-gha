/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";

import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

	const avatarRef = useRef('');

	useEffect(() => {
		avatarRef.current.value = '';
	}, [isOpen]);

	function handleSubmit(e) {
		e.preventDefault();

		onUpdateAvatar({
			avatar: avatarRef.current.value,
		});
	}
	return (
        <PopupWithForm
        name="edit-avatar"
        title="Обновить аватар"
        buttonText={isLoading ? "Сохранение..." : "Сохранить"}
        isOpen={isOpen}
		    onClose={onClose}
		    onSubmit={handleSubmit}
      >
        <input
          id="avatar"
          type="url"
          name="avatar"
          ref={avatarRef}
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на картинку"
          required=""
        />
        <span className="popup__error" id="avatar-error">
          Введите адрес сайта.
        </span>
      </PopupWithForm>
    )
    }

    export default EditAvatarPopup