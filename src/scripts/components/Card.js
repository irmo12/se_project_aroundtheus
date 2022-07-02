class Card {
  constructor({ name, source }, selector, handler) {
    this._name = name;
    this._src = source;
    this._selector = selector;
    this._hanldeImgClick = handler;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(`${this._selector}`)
      .content.cloneNode(true);
    this._img = cardElement.querySelector(".card__img");
    this._caption = cardElement.querySelector(".card__caption");
    this._trash = cardElement.querySelector(".card__trash");
    this._like = cardElement.querySelector(".card__like-btn");

    return cardElement;
  }

  makeCard() {
    this._element = this._getTemplate();
    this._img.setAttribute("src", this._src);
    this._img.setAttribute("alt", this._name);
    this._caption.textContent = this._name;
    this._addListeners();
    return this._element;
  }

  _addListeners() {
    this._like.addEventListener("click", () => this._handleLikeBtn());
    this._img.addEventListener("click", () =>
      this._hanldeImgClick({ name: this._name, src: this._src })
    );
    this._trash.addEventListener("click", (evt) =>
      evt.target.closest(".card").remove()
    );
  }

  _handleLikeBtn() {
    this._like.classList.toggle("card__like-btn_active");
  }
}

export default Card;
