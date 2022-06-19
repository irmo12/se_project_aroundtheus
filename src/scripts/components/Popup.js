const POPUP_ACTIVE_SELECTOR = 'popup_active';
const POPUP_CLOSE_BTN_SELECTOR = "popup__container-close"

export default class Popup {
  constructor(selector) {
    this._selector = selector;
    this._modal = document.querySelector(`${this._selector}`);
    this._handleEscKey = this._handleEscKey.bind(this);
  }

  _handleEscKey(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _setEventListeners() {
    this._modal.addEventListener("mouseup", (evt) => {
      if (evt.target.classList.contains(POPUP_ACTIVE_SELECTOR)) {
        this.close();
      }
      if (evt.target.classList.contains(POPUP_CLOSE_BTN_SELECTOR)) {
        this.close();
      }
    });
  }

  open() {
    document.addEventListener("keyup", this._handleEscKey);
    this._modal.classList.add(POPUP_ACTIVE_SELECTOR);
  }

  close() {
    document.removeEventListener("keyup", this._handleEscKey);
    this._modal.classList.remove(POPUP_ACTIVE_SELECTOR);
  }
}
