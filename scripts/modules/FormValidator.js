class FormValidator {
  constructor(settings, formElement) {
    this._settings = settings;
    this._formElement = formElement;
  }

  _resetValidation() {
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    this._toggleBtnState(
      this._inputList,
      this._formElement.querySelector(this._settings.submitButtonSelector)
    );
    this._inputList.forEach((inputElement) => {
      _hideInputError(this._formElement, inputElement, this._settings);
    });
  }

  enableValidation() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._settings.inputSelector)
    );
    const btnElement = this._formElement.querySelector(
      this._settings.submitButtonSelector
    );
    this._toggleBtnState(inputList, btnElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._hideOrShowError(this._formElement, inputElement, this._settings);
        this._toggleBtnState(inputList, btnElement);
      });
    });
  }

  _hideOrShowError = (formElement, inputElement, settings) => {
    if (inputElement.validity.valid) {
      this._hideInputError(formElement, inputElement, settings);
    } else {
      this._showInputError(
        formElement,
        inputElement,
        settings,
        inputElement.validationMessage
      );
    }
  };

  _showInputError = (formElement, inputElement, settings, errorMsg) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMsg;
    errorElement.classList.remove(settings.errorClass);
  };

  _hideInputError = (formElement, inputElement, settings) => {
    const errorElement = formElement.querySelector(`#${inputElement.name}`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.add(settings.errorClass);
    errorElement.textContent = "";
  };

  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleBtnState = (inputList, btnElement) => {
    if (this._hasInvalidInput(inputList)) {
      btnElement.setAttribute("disabled", "");
    } else {
      btnElement.removeAttribute("disabled", "");
    }
  };
}
export default FormValidator;
