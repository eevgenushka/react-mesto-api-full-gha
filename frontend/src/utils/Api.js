class Api { 
  constructor(config) { 
    this._url = config.url; 
  } 

  _getResponseData(res) { 
    if (res.ok) { 
      return res.json(); 
    } 
    return Promise.reject(`Ошибка: ${res.status}`); 
  } 

  getInitialCards() { 
    return fetch(`${this._url}/cards`, { 
      method: "GET", 
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res)); 
  } 

  getMyProfile() { 
    return fetch(`${this._url}/users/me`, { 
      method: "GET", 
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
     }
    }).then((res) => this._getResponseData(res)); 
  } 

  editMyProfile(data) { 
    return fetch(`${this._url}/users/me`, { 
      method: "PATCH", 
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        name: data.name,
        about: data.about,
 }), 
    }).then((res) => this._getResponseData(res)); 
  } 

  setNewCard({name, link}) { 
    return fetch(`${this._url}/cards`, { 
      method: "POST", 
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, link }), 
    }).then((res) => this._getResponseData(res)); 
  } 

  setLikeCard(cardId) { 
    return fetch(`${this._url}/cards/${cardId}/likes`, { 
      method: "PUT", 
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res)); 
  } 

  removeLikeCard(cardId) { 
    return fetch(`${this._url}/cards/${cardId}/likes`, { 
      method: "DELETE", 
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res)); 
  } 

/*  changeLikeCardStatus(cardId, isLiked) { 
		return isLiked ? this.setLikeCard(cardId) : this.removeLikeCard(cardId) 
} */

  deleteCard(cardId) { 
    return fetch(`${this._url}/cards/${cardId}`, { 
      method: "DELETE", 
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
      }
    }).then((res) => this._getResponseData(res)); 
  } 

  setNewAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, { 
      method: "PATCH", 
      headers: {
        'authorization': `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
     },
      body: JSON.stringify({avatar: data.avatar}),
    }).then((res) => this._getResponseData(res)); 
  } 
} 

const api = new Api({ 
	url: 'https://api.eevgenushka.nomoreparties.co',
}); 

export default api; 