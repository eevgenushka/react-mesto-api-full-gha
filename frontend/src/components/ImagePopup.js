/* eslint-disable react/prop-types */
import React from "react";

function ImagePopup(props) {
  return (
    <div
      className={`popup popup_type_picture ${props.card ? "popup_opened" : ""}`}
      onClick={() => props.onClose(false)}
    >
      <div
        className="popup__container popup__container_type_picture"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          aria-label="Close"
          className="popup__button-close"
          type="button"
          onClick={props.onClose}
        />
        <img
          src={props.card?.link}
          alt={props.card?.name}
          className="popup__picture"
        />
        <h2 className="popup__name">{props.card?.name}</h2>
      </div>
    </div>
  );
}
export default ImagePopup;
