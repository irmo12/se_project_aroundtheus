import {setPopoutImg} from "../script.js";
import {openPopup} from "./utils.js";

class Card {
  constructor(name, source, selector) {
    this._name = name;
    this._src = source;
    this._alt = name;
    this._selector = selector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`${this._selector}`)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  makeCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__img").setAttribute("src", this._src);
    this._element.querySelector(".card__caption").textContent = this._name;
    this._element.querySelector(".card__img").setAttribute("alt", this._name);
    this._addListeners();
    return this._element;
  }

  _addListeners() {
    this._element
      .querySelector(".card__like-btn")
      .addEventListener("click", () => this._handleLikeBtn());
    this._element
      .querySelector(".card__img")
      .addEventListener("click", () => this._hanldeImgClick());
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => this._handleTrashBtn());
  }

  _handleLikeBtn() {
    this._element
      .querySelector(".card__like-btn")
      .classList.toggle("card__like-btn_active");
  }

  _handleTrashBtn() {
    this._element.remove();
  }

  _hanldeImgClick() {
    setPopoutImg(this._name, this._src);
    openPopup("#imgPopup");
  }
}

export default Card;
