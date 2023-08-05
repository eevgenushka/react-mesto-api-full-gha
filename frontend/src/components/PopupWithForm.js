/* eslint-disable react/prop-types */
import React from "react";

function PopupWithForm({ name, title, buttonText, isOpen, onClose, onSubmit, ...props }) {
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__button-close"
          name="popupCloseButton"
          type="button"
          aria-label="Закрыть окно"
          onClick={onClose}
        />

        <h2 className="popup__title">{title}</h2>

        <form className="popup__form" name={name} id={name} onSubmit={onSubmit} noValidate="">
          {props.children}

          <button className="popup__button popup__button-submit" type="submit">
          {buttonText || 'Сохранить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
