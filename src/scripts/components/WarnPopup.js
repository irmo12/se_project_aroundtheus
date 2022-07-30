import Popup from "./Popup";

export class WarnPopup extends Popup {
  constructor({ selector, handleSubmit }) {
    super(selector);
    this._submitAction = handleSubmit;
    this._submitAction = this._submitAction.bind(this);
  }

  _handleSubmit(evt) {
    {
      evt.preventDefault();
      this._submitAction(this._callerId);
      this.close();
    }
  }

  open(id) {
    this._callerId = id;
    super.open();
  }

  setEventListeners() {
    this._modal
      .querySelector(".popup-edit__submit")
      .addEventListener("mouseup", (evt) => this._handleSubmit(evt));
    super.setEventListeners();
  }
}
