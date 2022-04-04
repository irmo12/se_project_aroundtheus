let popupProfileEdit = document.querySelector("popup");
let buttonEditProfile = document.querySelector("profile__edit-button");

function handleEditProfileBtn() {
  popupProfileEdit.classList.add("popup__active");
}

buttonEditProfile.addEventListener("click", handleEditProfileBtn);
