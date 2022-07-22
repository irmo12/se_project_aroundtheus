import { TOKEN } from "../utils/constants.js";

class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
      .catch((err) => console.log(err));
  }

  patchUserInfo(data) {
    console.log(JSON.stringify({data}));
    return fetch(`${this._baseURL}users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(
        data
      ),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
    .catch((err) => console.log(err));
  }
}

export const api = new Api({
  baseURL: "https://around.nomoreparties.co/v1/cohort-3-en/",
  headers: {
    authorization: `${TOKEN}`,
    "Content-Type": "application/json",
  },
});
