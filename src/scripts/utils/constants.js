const TOKEN = "a71d10a8-c3e4-4a43-bbbc-db81e488ab20";
let MEID = { self: "" };
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-btn");
const btnProfilePicture = document.querySelector(".profile__picture-button");
const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-field",
  submitButtonSelector: ".popup__form-submit",
  inactiveButtonClass: "",
  inputErrorClass: "popup__form-field_error",
  errorClass: "popup__form-error-msg_inactive",
};

export { btnEditProfile, btnAddCard, settings, TOKEN, btnProfilePicture, MEID };
