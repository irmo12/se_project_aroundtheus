import {
  addNewCard,
  fillProfileInfo,
  fillProfileForm,
  settings,
  addCardPopup,
  validateForm,
  formValidator
} from "../script.js";

function openPopup(selector) {
  document.querySelector(`${selector}`).classList.add("popup_active");
  document.addEventListener("keydown", handlecloseByEscape);
}

function closePopup() {
  document.querySelector(".popup_active").classList.remove("popup_active");
  document.removeEventListener("keydown", handlecloseByEscape);
}

function handleEditProfileSave(evt) {
  evt.preventDefault();
  fillProfileInfo();
  closePopup();
}

function handleEditProfileBtn() {
  fillProfileForm();
  // validateForm(settings, "editProfileForm");
  formValidator.reset();
  openPopup("#profilePopup");
}

function handleAddCard() {
  addCardPopup.querySelector(settings.formSelector).reset();
  validateForm(settings, "addCardForm");
  openPopup("#addCardPopup");
}

function handlecloseByEscape(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  addNewCard();
  closePopup();
  evt.target.reset();
}

export {
  openPopup,
  closePopup,
  handleEditProfileSave,
  handleEditProfileBtn,
  handleAddCard,
  handleAddCardSubmit,
};
