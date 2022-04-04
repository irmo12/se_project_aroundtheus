let popupProfileEdit = document.querySelector(".popup");
let buttonEditProfile = document.querySelector(".profile__edit-button");

let fieldProfileName = document.querySelector(
  ".profile-edit__name"
);
console.log(fieldProfileName.textContent);
let fieldProfileAbout = document.querySelector(
  ".profile-edit__about"
);

function handleEditProfileBtn() {
  let profileName = document.querySelector(".profile__user-name").textContent;
  let profileAbout = document.querySelector(".profile__user-about").textContent;
console.log(profileName);
  popupProfileEdit.classList.add("popup__active");

  fieldProfileName.value = profileName;
  fieldProfileAbout.value = profileAbout;

}

buttonEditProfile.addEventListener("click", handleEditProfileBtn);
