import { MEID } from "../utils/constants.js"


class Card {
  constructor({ data, handleImg, handleDel, handleLike }, selector) {
    this._name = data.name;
    this._src = data.link;
    this._likesCount = data.likes.length;
    this._id = data._id;
    this.ownerId = data.owner._id;
    this._selector = selector;
    this._hanldeImgClick = handleImg;
    this._handleDel = handleDel;
    this._handleLikeBtn = handleLike;
    
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
    if (MEID.self != this.ownerId) {
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

  updateLikes(likes) {
    this._likesCount = likes;
    this._renderLikes();
  }

  _isLiked() {
    return (!(this._like.classList.length == 1));
  }

  _renderLikes() {
    this._likes.textContent = this._likesCount;
    this._like.classList.toggle("card__like-btn_active");
  }

  remove() {
    this._element.remove();
  }
}
export default Card;
