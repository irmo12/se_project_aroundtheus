import Popup from "./Popup.js";

const FORM_SELECTOR = "popup-edit";
const FORM_INPUT_FIELD_SELECTOR = 'popup-edit__field'

export default class PopupWithForms extends Popup {
  constructor(selector, handleSubmit) {
    super(selector);
    this._handleSubmit = handleSubmit;
    this._handleSubmit = this._handleSubmit.bind(this);
    this._form = this._modal.querySelector(FORM_SELECTOR);
    
  }

  _getInputValues() {
    this._inputFields = [...this._form.querySelectorAll(FORM_INPUT_FIELD_SELECTOR)];
    const inputValues = this._inputFields.forEach(field => 
        {const key = field.name;
         const value = field.value;
         
         inputValues[key] = value;
    });
    return inputValues;
      }


  _setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
        this._handleSubmit(this._getInputValues());});
    
    super._setEventListeners();
  }

  close() {
    this._form.reset();
    super.close();
  }
}
