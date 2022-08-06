const TOKEN = "a71d10a8-c3e4-4a43-bbbc-db81e488ab20";
let MEID = {self: ''};
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-btn");
const btnProfilePicture = document.querySelector('.profile__picture-button');
const settings = {
  formSelector: ".popup-edit",
  inputSelector: ".popup-edit__field",
  submitButtonSelector: ".popup-edit__submit",
  inactiveButtonClass: "",
  inputErrorClass: "popup-edit__field_error",
  errorClass: "popup-edit__error-msg-inactive",
};

export { btnEditProfile, btnAddCard, settings, TOKEN, btnProfilePicture, MEID };
