import Popup from "./Popup";

export class WarnPopup extends Popup {
  setAction(action) {
    this._handleSubmit = action;
  }

  setEventListeners() {
    this._modal
      .querySelector(".popup-edit__submit")
      .addEventListener("mouseup", (evt) => {
        this._handleSubmit(evt);
        this.close();
      });
    super.setEventListeners();
  }
}
