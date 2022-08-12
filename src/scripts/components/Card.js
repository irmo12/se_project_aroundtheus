class Card {
  constructor({ data, handleImg, handleDel, handleLike, userId }, selector) {
    this._name = data.name;
    this._src = data.link;
    this._likesArr = data.likes;
    this._id = data._id;
    this.ownerId = data.owner._id;
    this._selector = selector;
    this._hanldeImgClick = handleImg;
    this._handleDel = handleDel;
    this._handleLikeBtn = handleLike;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`${this._selector}`)
      .content.cloneNode(true);
    return cardElement;
  }

  makeCard() {
    this._element = this._getTemplate().querySelector(".card");
    this._img = this._element.querySelector(".card__img");
    this._caption = this._element.querySelector(".card__caption");
    this._trash = this._element.querySelector(".card__trash");
    this._like = this._element.querySelector(".card__like-btn");
    this._likes = this._element.querySelector(".card__like-counter");
    this._img.setAttribute("src", this._src);
    this._img.setAttribute("alt", this._name);
    this._caption.textContent = this._name;
    this._updateLikes(this._likesArr);
    this._addListeners();
    if (this._userId != this.ownerId) {
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

  _updateLikes(likes) {
    this._likesArr=likes;
    this._likesCount = likes.length;
    this._renderLikes();
  }

  _isLiked() {
    return this._likesArr.some((item) => item._id === this._userId);
  }

  _renderLikes() {
    this._likes.textContent = this._likesCount;
    if (this._isLiked()) {
      this._like.classList.add("card__like-btn_active");
    } else {
      this._like.classList.remove("card__like-btn_active");
    }
  }

  remove() {
    this._element.remove();
    this._element = null;
  }
}
export default Card;
