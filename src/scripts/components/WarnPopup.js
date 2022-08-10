import Popup from "./Popup";

export class WarnPopup extends Popup {
  constructor({selector, loadingBtnText}) {
    super(selector);
  this._submitBtn = this._modal.querySelector(".popup__form-submit");
  this._btnInitText = this._submitBtn.textContent;
  this._loadingBtnText = loadingBtnText;
  }

  setAction(action) {
    this._handleSubmit = action;
  }

  showLoading() {
    this._submitBtn.textContent = this._loadingBtnText;
  }

  hideLoading() {
    this._submitBtn.textContent = this._btnInitText;
  }

  setEventListeners() {
    this._modal
      .querySelector(".popup__form-submit")
      .addEventListener("mouseup", (evt) => {
        this._handleSubmit(evt);
        this.close();
      });
    super.setEventListeners();
  }
}
