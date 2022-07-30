import { TOKEN } from "../utils/constants.js";
import {userInfo} from "../../page/index.js"

class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, { headers: this._headers })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, { headers: this._headers })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }

  patchUserInfo(data) {
    fetch(`${this._baseURL}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(data),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }

  postNewCard(data) {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }

  deleteCard(id) {
    return fetch(`${this._baseURL}/cards/${id}`, {
      headers: this._headers,
      method: "DELETE",
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }

  likeClick(state,id) {
    if (state) {
      return fetch(`${this._baseURL}cards/likes/${id}`, {
        headers: this._headers,
        method: "PUT",
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
        .catch((err) => console.log(err));
    }
    if (!state) {
      return fetch(`${this._baseURL}cards/likes/${id}`, {
        headers: this._headers,
        method: "DELETE",
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
        .catch((err) => console.log(err));
    }
  }
}

export const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/cohort-3-en/",
  headers: {
    authorization: `${TOKEN}`,
    "Content-Type": "application/json",
  },
});
