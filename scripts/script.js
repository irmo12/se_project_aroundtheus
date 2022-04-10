let popupProfileEdit = document.querySelector(".popup");
let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonEditProfileClose = document.querySelector(".popup__container-close");
let formEditProfile = document.querySelector(".profile-edit");
let fieldProfileName = document.querySelector(".profile-edit__field_user_name");
let fieldProfileAbout = document.querySelector(".profile-edit__field_user_about");

function handleEditProfileBtn() {
  let profileName = document.querySelector(".profile__user-name").textContent;
  let profileAbout = document.querySelector(".profile__user-about").textContent;

  popupProfileEdit.classList.add("popup_active");

  fieldProfileName.value = profileName;
  fieldProfileAbout.value = profileAbout;
}

function handleEditProfileClose() {
  popupProfileEdit.classList.remove("popup_active");
}

function handleEditProfileSave(evt) {
  evt.preventDefault();

  document.querySelector(".profile__user-name").textContent =
    fieldProfileName.value;
  document.querySelector(".profile__user-about").textContent =
    fieldProfileAbout.value;

  if (fieldProfileName.value == "") {
    document.querySelector(".profile__user-name").textContent = "Name";
  }
  if (fieldProfileAbout.value == "") {
    document.querySelector(".profile__user-about").textContent = "About me";
  }

  popupProfileEdit.classList.remove("popup_active");
}

buttonEditProfile.addEventListener("click", handleEditProfileBtn);
buttonEditProfileClose.addEventListener("click", handleEditProfileClose);
formEditProfile.addEventListener("submit", handleEditProfileSave);
