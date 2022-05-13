const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMsg) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMsg;
  errorElement.classList.remove(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = "";
};

const hideOrShowError = (formElement, inputElement, inputErrorClass,
    errorClass) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, inputErrorClass,
        errorClass);
  } else {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleBtnState = (inputList, btnElement) => {
  if (hasInvalidInput(inputList)) {
    btnElement.setAttribute("disabled", "");
  } else {
    btnElement.removeAttribute("disabled", "");
  }
};

const setEventListeners = (
  formElement,
  selectors
) => {
  const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
  const btnElement = formElement.querySelector(selectors.submitButtonSelector);
  toggleBtnState(inputList, btnElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      hideOrShowError(formElement, inputElement, selectors.inputErrorClass,
        selectors.errorClass);
      toggleBtnState(inputList, btnElement);
    });
  });
};

const enableValidation = (selectors) => {

  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, selectors);
  });
};

const resetValidation = (formElement) => {
    const inputErrorClass = 'popup-edit__field_error';
    const errorClass = 'popup-edit__error-msg_inactive';
    const inputList = Array.from(formElement.querySelectorAll('.popup-edit__field'));
    toggleBtnState(inputList, formElement.querySelector('.popup-edit__submit'));
    inputList.forEach((inputElement) => {hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    });
}

export { enableValidation , resetValidation};
