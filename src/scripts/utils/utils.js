import {
  addNewCard,
  fillProfileInfo,
  fillProfileForm,
  settings,
  addCardPopup,
  profilePopup,
  formValidators
} from "../../page/script.js";

// function openPopup(popup) {
//   popup.classList.add("popup_active");
//   document.addEventListener("keydown", handleEscKey);
// }

// function closePopup() {
//   document.querySelector(".popup_active").classList.remove("popup_active");
//   document.removeEventListener("keydown", handleEscKey);
// }

function handleEditProfileSave(evt) {
  evt.preventDefault();
  fillProfileInfo();
  closePopup(profilePopup);
}

function handleEditProfileBtn() {
  fillProfileForm();
  formValidators["editProfileForm"].resetValidation();
  openPopup(profilePopup);
}

function handleAddCard() {
  addCardPopup.querySelector(settings.formSelector).reset();
  formValidators["addCardForm"].resetValidation();
  openPopup(addCardPopup);
}

function handleEscKey(evt) {
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
