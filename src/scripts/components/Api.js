import { TOKEN } from "../utils/constants.js";

class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.statusText)))
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
