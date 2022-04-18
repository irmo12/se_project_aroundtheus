let popupProfileEdit = document.querySelector(".popup");
let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonEditProfileClose = document.querySelector(".popup__container-close");
let formEditProfile = document.querySelector(".profile-edit");
let fieldProfileName = document.querySelector(".profile-edit__field_user_name");
let fieldProfileAbout = document.querySelector(
  ".profile-edit__field_user_about"
);
const initialCards = [
  {
    name: "Yosemite Valley",
    src: "./images/kirill-pershin-1088404-unsplash.png",
    alt: "Yosemite el capitan",
  },
  {
    name: "Lake Louise",
    src: "./images/kirill-pershin-1404681-unsplash.png",
    alt: "Lake Louise",
  },
  {
    name: "Bald Mountains",
    src: "./images/kirill-pershin-1556355-unsplash.png",
    alt: "Bald Mountains",
  },
  {
    name: "Latemar",
    src: "./images/kirill-pershin-1404681-unsplash-1.png",
    alt: "Latemar",
  },
  {
    name: "Vanoise National Park",
    src: "./images/kirill-pershin-1556355-unsplash-1.png",
    alt: "Vanoise National Park",
  },
  {
    name: "Lago di Braies",
    src: "./images/kirill-pershin-1088404-unsplash-1.png",
    alt: "Lago di Braies",
  },
];
const gallery = document.querySelector('.gallery');
const cardTemplate = document.querySelector('#card').content;

function populateInitial() {
  initialCards.forEach(function (card){
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const cardImg = cardElement.querySelector('.card__img');
    const cardTitle = cardElement.querySelector('.card__caption');
    
    cardImg.setAttribute('src', card.src);
    cardImg.setAttribute('alt', card.alt);
    cardTitle.textContent = card.name;
    
    gallery.append(cardElement);
    
  })
}
populateInitial(initialCards);



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
