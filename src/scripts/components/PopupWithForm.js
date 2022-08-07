import Popup from "./Popup.js";

const FORM_SELECTOR = ".popup-edit";
const FORM_INPUT_FIELD_SELECTOR = ".popup-edit__field";

export default class PopupWithForm extends Popup {
  constructor({ selector, handleSubmit, loadingBtnText }) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handlerWithForm = this._handlerWithForm.bind(this);
    this._form = this._modal.querySelector(FORM_SELECTOR);
    this._inputFields = [
      ...this._form.querySelectorAll(FORM_INPUT_FIELD_SELECTOR),
    ];
    this._submitBtn = this._modal.querySelector(".popup-edit__submit");
    this._btnInitText = this._submitBtn.textContent;
    this._loadingBtnText = loadingBtnText;
    console.log(this._btnInitText);
  }

  _getInputValues() {
    const inputValues = {};
    this._inputFields.forEach((field) => {
      inputValues[field.name] = field.value;
    });
    return inputValues;
  }

  open(data) {
    if (data) this._setInputValues(data);
    super.open();
  }

  _setInputValues(values) {
    this._inputFields.forEach((field) => {
      Object.keys(values).forEach((key) => {
        if (field.name === key) {
          field.value = values[key];
        }
      });
    });
  }

  _handlerWithForm(evt) {
    {
      evt.preventDefault();
      this._handleSubmit(this._getInputValues());
    }
  }

  showLoading() {
    this._submitBtn.textContent = this._loadingBtnText;
  }

  hideLoading() {
    this._submitBtn.textContent = this._btnInitText;
  }

  setEventListeners() {
    this._form.addEventListener("submit", this._handlerWithForm);
    super.setEventListeners();
  }

  close() {
    super.close();
    setTimeout(() => this._form.reset(), 500);
  }
}
