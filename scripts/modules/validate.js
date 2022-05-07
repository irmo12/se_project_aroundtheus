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
  inputSelector,
  submitButtonSelector,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const btnElement = formElement.querySelector(submitButtonSelector);
  toggleBtnState(inputList, btnElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      hideOrShowError(formElement, inputElement, inputErrorClass,
        errorClass);
      toggleBtnState(inputList, btnElement);
    });
  });
};

const enableValidation = (
  formSelector = ".popup-edit",
  inputSelector = ".popup-edit__field",
  submitButtonSelector = ".popup-edit__submit",
  inactiveButtonClass = "",
  inputErrorClass = "popup-edit__field_error",
  errorClass = "popup-edit__error-msg_inactive"
) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
    
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    setEventListeners(
      formElement,
      inputSelector,
      submitButtonSelector,
      inputErrorClass,
      errorClass
    );
  });
};

const resetValidation = (formElement) => {
    const inputErrorClass = 'popup-edit__field_error';
    const errorClass = 'popup-edit__error-msg_inactive';
    const inputList = Array.from(formElement.querySelectorAll('.popup-edit__field'));

    inputList.forEach((inputElement) => {hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    });
}

export { enableValidation , resetValidation};
