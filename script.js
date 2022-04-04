let popupProfileEdit = document.querySelector(".popup");
let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonEditProfileClose = document.querySelector(".profile-edit__close");
let formEditProfile = document.querySelector(".profile-edit");
let fieldProfileName = document.querySelector(".profile-edit__name");
let fieldProfileAbout = document.querySelector(".profile-edit__about");

function handleEditProfileBtn() {
  let profileName = document.querySelector(".profile__user-name").textContent;
  let profileAbout = document.querySelector(".profile__user-about").textContent;

  popupProfileEdit.classList.add("popup__active");

  fieldProfileName.value = profileName;
  fieldProfileAbout.value = profileAbout;
}

function handleEditProfileClose() {
  popupProfileEdit.classList.remove("popup__active");
}

function handleEditProfileSave(evt) {
  evt.preventDefault();

  document.querySelector(".profile__user-name").textContent =
    fieldProfileName.value;
  document.querySelector(".profile__user-about").textContent =
    fieldProfileAbout.value;

  popupProfileEdit.classList.remove("popup__active");
}

buttonEditProfile.addEventListener("click", handleEditProfileBtn);
buttonEditProfileClose.addEventListener("click", handleEditProfileClose);
formEditProfile.addEventListener("submit", handleEditProfileSave);
