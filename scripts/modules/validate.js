const showInputError = (formElement, inputElement, selectors, errorMsg) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}`);
  inputElement.classList.add(selectors.inputErrorClass);
  errorElement.textContent = errorMsg;
  errorElement.classList.remove(selectors.errorClass);
};

const hideInputError = (formElement, inputElement, selectors) => {
  const errorElement = formElement.querySelector(`#${inputElement.name}`);
  inputElement.classList.remove(selectors.inputErrorClass);
  errorElement.classList.add(selectors.errorClass);
  errorElement.textContent = "";
};

const hideOrShowError = (formElement, inputElement, selectors) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, selectors);
  } else {
    showInputError(formElement, inputElement, selectors, inputElement.validationMessage);
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
      hideOrShowError(formElement, inputElement, selectors);
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

const resetValidation = (formElement, selectors) => {
    
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    toggleBtnState(inputList, formElement.querySelector(selectors.submitButtonSelector));
    inputList.forEach((inputElement) => {hideInputError(formElement, inputElement, selectors);
    });
}

export {enableValidation , resetValidation};
