import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._modal.querySelector(".img-popout__img");
    this._caption = this._modal.querySelector(".img-popout__caption");
  }

  open(data) {
    this._image.src = data.src;
    this._image.alt = data.name;
    this._caption.textContent = data.name;
    super.open();
  }
}
