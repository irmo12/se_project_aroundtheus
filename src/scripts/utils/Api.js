import { TOKEN } from "./constants.js";

class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _processResponse = (res) => {
    res.ok ? res.json() : Promise.reject(`Error: ${res.statusText}`);
  };

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, { headers: this._headers }).then(
      (res) => this._processResponse(res)
    );
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, { headers: this._headers }).then(
      (res) => this._processResponse(res)
    );
  }

  patchUserInfo(data) {
    fetch(`${this._baseURL}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => this._processResponse(res));
  }

  postNewCard(data) {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => this._processResponse(res));
  }

  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._processResponse(res));
  }

  addLike(id) {
    return fetch(`${this._baseURL}cards/likes/${id}`, {
      headers: this._headers,
      method: "PUT",
    }).then((res) => this._processResponse(res));
  }

  removeLike(id) {
    return fetch(`${this._baseURL}cards/likes/${id}`, {
      headers: this._headers,
      method: "DELETE",
    }).then((res) => this._processResponse(res));
  }

  changeAvatar(avatar) {
    return fetch(`${this._baseURL}users/me/avatar`, {
      headers: this._headers,
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    }).then((res) => this._processResponse(res));
  }

  getInitialData() {
    return Promise.all([api.getUserInfo(), api.getInitialCards()]);
  }
}

export const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/cohort-3-en/",
  headers: {
    authorization: `${TOKEN}`,
    "Content-Type": "application/json",
  },
});
