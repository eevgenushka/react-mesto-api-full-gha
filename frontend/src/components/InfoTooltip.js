/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen ? `popup_opened` : ""}`}>
      <div className="popup__container">
          <button type="button" className="popup__button-close" onClick={props.onClose} />
          <img className="popup__icon" src={props.icon} alt={props.text}/>
        <h2 className="popup__info">{props.text}</h2>
      </div>
    </div>
  );
}
export default InfoTooltip;
