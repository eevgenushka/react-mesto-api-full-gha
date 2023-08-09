import React, { useState, useEffect } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";
import "../index.css";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import * as auth from "../utils/auth.js";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register.js";
import Login from "./Login";
import InfoTooltip from "./InfoTooltip";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import success from "../images/Union.png";
import fail from "../images/Union (1).png";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpened] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpened] = useState(false);
  const [isEditProfilePopupOpen, setEditProfileOpened] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [infoTooltipText, setInfoTooltipText] = useState("");
  const [infoTooltipIcon, setInfoTooltipIcon] = useState("");
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const navigate = useNavigate();

  function сheckTocken() { 
    const jwt = localStorage.getItem("jwt"); 
    if (jwt) { 
      auth 
       .getToken(jwt) 
        .then((res) => { 
          if (res) { 
            setLoggedIn(true); 
            navigate('/', { replace: true }); 
            setEmail(res.email); 
          } 
        }) 
        .catch((err) => { 
         console.error(err); 
        }); 
    } 
  } 

  useEffect(() => {
    loggedIn &&
    Promise.all([api.getMyProfile(), api.getInitialCards()])
       .then(([userData, initialCards]) => {
         setCurrentUser(userData);
      setCards(initialCards);
      })
       .catch((err) => console.log(err));

   сheckTocken(); 
   
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedIn]); 
  

  function onLogin(email, password) { 
    auth 
      .login(email, password) 
      .then((res) => { 
        localStorage.setItem("jwt", res.token); 
        setLoggedIn(true); 
        setEmail(email); 
        navigate('/', { replace: true }); 
      }) 
     .catch(() => { 
        setInfoTooltipIcon(fail); 
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз."); 
      }) 
  } 

  function onRegister(email, password) { 
    auth 
      .register(email, password) 
      .then(() => { 
        setInfoTooltipIcon(success); 
        setInfoTooltipText("Вы успешно зарегистрировались!"); 
        navigate('/sign-in', { replace: true }); 
      }) 
     .catch(() => { 
        setInfoTooltipIcon(fail); 
        setInfoTooltipText("Что-то пошло не так! Попробуйте ещё раз."); 
      }) 
      .finally(handleInfoTooltip()); 
  } 


  function onSignOut() { 
    localStorage.removeItem("jwt"); 
    setLoggedIn(false); 
    navigate('/sign-in', { replace: true }); 
  } 

  function handleCardClick(card) { 
    setSelectedCard(card); 
  } 

  function handleEditAvatarClick() { 
    setEditAvatarPopupOpened(true); 
  } 

  function handleAddPlaceClick() { 
    setAddPlacePopupOpened(true); 
  } 

  function handleEditProfileClick() { 
    setEditProfileOpened(true); 
  } 

  function handleInfoTooltip() { 
    setIsInfoTooltipPopupOpen(true); 
  } 

  function closeAllPopups() { 
    setEditAvatarPopupOpened(false); 
    setAddPlacePopupOpened(false); 
    setEditProfileOpened(false); 
    setIsInfoTooltipPopupOpen(false); 
    setSelectedCard(null); 
  } 

	function handleCardLike(card) { 
   const isLiked = card.likes.some(i => i === currentUser._id); 
    api 
      .changeLikeCardStatus(card._id, !isLiked) 
			.then((newCard) => { 
       setCards((state) => state.map((c) => c._id === card._id ? newCard : c)); 
      }) 
      .catch((err) => console.log(err)); 
  } 

  function handleCardDelete(card) { 
    setIsLoading(true); 
    api 
      .deleteCard(card._id) 
      .then(() => { 
        setCards((state) => state.filter((c) => c._id !== card._id)); 
      }) 
      .then(() => closeAllPopups()) 
      .catch((err) => console.log(err)); 
  } 

  function handleAddPlaceSubmit({name,link}) { 
    setIsLoading(true); 
    api 
      .setNewCard({name, link}) 
      .then((newCard) => setCards([newCard, ...cards])) 
      .then(() => closeAllPopups()) 
      .catch((err) => console.log(err)) 
      .finally(() => { 
        setIsLoading(false); 
      }); 
  } 

  function handleUpdateUser(newName) {
    setIsLoading(true); 
    api 
      .editMyProfile(newName)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      })
      .catch((err) => console.log(err)) 
      .finally(() => { 
        setIsLoading(false); 
      }); 
  } 

  function handleUpdateAvatar(avatar) {
    setIsLoading(true); 
    api 
      .setNewAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups()
      }) 
      .catch((err) => console.log(err)) 
      .finally(() => { 
        setIsLoading(false); 
      }); 
  } 

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route
            path="*"
            element={
              loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/sign-in"
            element={
              <>
                <Header text="Регистрация" link="/sign-up" />
                <Login onLogin={onLogin} title="Вход" textSubmit="Войти"/>
              </>
            }
          />
          <Route
            path="/sign-up"
            element={
              <>
                <Header text="Войти" link="/sign-in" />
                <Register
                  onRegister={onRegister}
                  title="Регистрация"
                  textSubmit="Зарегистрироваться"
                  paragraph="Уже зарегистрированы?"
                />
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Header
                  text="Выйти"
                  email={email}
                  link="/sign-in"
                  onSignOut={onSignOut}
                />
                <ProtectedRoute
                  element={Main}
                  loggedIn={loggedIn}
                  onCardClick={handleCardClick}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
                <Footer />
              </>
            }
          />
        </Routes>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <PopupWithForm
          name="delete-card"
          title="Вы уверены?"
          buttonText="Да"
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
        />
        <InfoTooltip
          icon={infoTooltipIcon}
          text={infoTooltipText}
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
