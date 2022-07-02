import Popup from "./Popup.js";

export default class PopupWithImages extends Popup {
  constructor(selector) {
    super(selector);
  }

  open(data) {
    const image = this._modal.querySelector(".img-popout__img");
    const caption = this._modal.querySelector(".img-popout__caption");

    image.src = data.src;
    image.alt = data.name;
    caption.textContent = data.name;
    super.open();
  }
}
