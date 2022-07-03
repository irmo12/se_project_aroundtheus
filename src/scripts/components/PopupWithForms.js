import Popup from "./Popup.js";

const FORM_SELECTOR = ".popup-edit";
const FORM_INPUT_FIELD_SELECTOR = ".popup-edit__field";

export default class PopupWithForms extends Popup {
  constructor({ selector, handleSubmit }) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handlerWithForm = this._handlerWithForm.bind(this);
    this._form = this._modal.querySelector(FORM_SELECTOR);
    this._inputFields = [
      ...this._form.querySelectorAll(FORM_INPUT_FIELD_SELECTOR),
    ];
  }

  getInputValues() {
    const inputValues = {};
    this._inputFields.forEach((field) => {
      inputValues[field.name] = field.value;
    });
    return inputValues;
  }

  open(data) {
    if (data) this._setInputValues(data);
    this._setEventListeners();
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
      this._handleSubmit(this.getInputValues());
      this.close();
    }
  }
  setEventListeners() {
    this._form.addEventListener("submit", this._handlerWithForm);
    super.setEventListeners();
  }

  close() {
    this._form.removeEventListener("submit", this._handlerWithForm);
    super.close();
    this._form.reset();
  }
}
