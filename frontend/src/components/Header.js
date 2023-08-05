/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
       <img src={logo} alt={props.alt} className="header__logo" />
       <div className="header__box">
        <p className="header__text">{props.email}</p>
        <Link to={props.link} className="header__link button" type="button" onClick={props.onSignOut}>{props.text}</Link>
      </div>
    </header>
  );
}

export default Header;
