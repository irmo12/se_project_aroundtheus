import { userInfo } from "../../page/index.js";
import { api } from "./Api.js";

class Card {
  constructor({ data, handleImg, handleDel }, selector) {
    this._name = data.name;
    this._src = data.link;
    this._likesCount = data.likes.length;
    this._id = data._id;
    this.ownerId = data.owner._id;
    this._selector = selector;
    this._hanldeImgClick = handleImg;
    this._handleDel = handleDel;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`${this._selector}`)
      .content.cloneNode(true);
    this._img = cardElement.querySelector(".card__img");
    this._caption = cardElement.querySelector(".card__caption");
    this._trash = cardElement.querySelector(".card__trash");
    this._like = cardElement.querySelector(".card__like-btn");
    this._likes = cardElement.querySelector(".card__like-counter");

    return cardElement;
  }

  makeCard() {
    this._element = this._getTemplate().querySelector(".card");
    this._img.setAttribute("src", this._src);
    this._img.setAttribute("alt", this._name);
    this._caption.textContent = this._name;
    this._likes.textContent = this._likesCount;
    this._addListeners();
    if (userInfo.id != this.ownerId) {
      this._trash.classList.add("trash_display-none");
      this._trash.setAttribute("disabled", "");
    }
    this._element.setAttribute("id", this._id);
    return this._element;
  }

  _addListeners() {
    this._like.addEventListener("click", () => this._handleLikeBtn());
    this._img.addEventListener("click", () =>
      this._hanldeImgClick({ name: this._name, src: this._src })
    );
    this._trash.addEventListener("click", () => this._handleDel(this._id));
  }

  _handleLikeBtn() {
    if (this._like.classList.length == 1) {
      api
        .likeClick(true, this._id)
        .then((res) => (this._likes.textContent = res.likes.length));
    }
    if (this._like.classList.length == 2) {
      api
        .likeClick(false, this._id)
        .then((res) => (this._likes.textContent = res.likes.length));
    }
    this._like.classList.toggle("card__like-btn_active");
  }
}
export default Card;
