import FormValidator from "./modules/FormValidator.js";
import Card from "./modules/Card.js";
import {
  handleEditProfileBtn,
  handleAddCard,
  handleAddCardSubmit,
  handleEditProfileSave,
  closePopup,
} from "./modules/utils.js";

const popups = document.querySelectorAll(".popup");
const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-btn");
const profileUser = document.querySelector(".profile__user");
const profilePopup = document.querySelector("#profilePopup");
const addCardPopup = document.querySelector("#addCardPopup");
const imgPopup = document.querySelector("#imgPopup");
const gallery = document.querySelector(".gallery");
const fieldPlaceTitle = addCardPopup.querySelector(
  ".popup-edit__field_place-title"
);
const fieldPlaceLink = addCardPopup.querySelector(
  ".popup-edit__field_place-link"
);
const profileName = profileUser.querySelector(".profile__user-name");
const profileAbout = profileUser.querySelector(".profile__user-about");
const fieldProfileName = profilePopup.querySelector(
  ".popup-edit__field_user_name"
);
const fieldProfileAbout = profilePopup.querySelector(
  ".popup-edit__field_user_about"
);
const img = imgPopup.querySelector(".img-popout__img");
const caption = imgPopup.querySelector(".img-popout__caption");
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
    src: "./images/peter-steiner-FrqiXDxxOGs-unsplash.jpg",
    alt: "Latemar",
  },
  {
    name: "Vanoise National Park",
    src: "./images/freysteinn-g-jonsson-Ebk1MBerpwo-unsplash.jpg",
    alt: "Vanoise National Park",
  },
  {
    name: "Lago di Braies",
    src: "./images/jeremy-alford-WhbLmhaiu_w-unsplash.jpg",
    alt: "Lago di Braies",
  },
];

const settings = {
  formSelector: ".popup-edit",
  inputSelector: ".popup-edit__field",
  submitButtonSelector: ".popup-edit__submit",
  inactiveButtonClass: "",
  inputErrorClass: "popup-edit__field_error",
  errorClass: "popup-edit__error-msg_inactive",
};

function createCard(card) {
  const cardElement = new Card(card.name, card.src, "#card");
  return cardElement.makeCard();
}

function renderCard(card) {
  gallery.prepend(createCard(card));
}

function renderCards(cardsArr = initialCards) {
  cardsArr.forEach(renderCard);
}

function fillCardForm() {
  const cardInput = {
    name: fieldPlaceTitle.value,
    src: fieldPlaceLink.value,
    alt: fieldPlaceTitle.value,
  };

  renderCard(cardInput);
}

function fillProfileInfo() {
  profileName.textContent = fieldProfileName.value;
  profileAbout.textContent = fieldProfileAbout.value;
}

function fillProfileForm() {
  fieldProfileName.value = profileName.textContent;
  fieldProfileAbout.value = profileAbout.textContent;
}

function setPopoutImg(name, source) {
  img.setAttribute("src", source);
  img.setAttribute("alt", name);
  caption.textContent = name;
}

btnEditProfile.addEventListener("click", handleEditProfileBtn);

btnAddCard.addEventListener("click", handleAddCard);

addCardPopup
  .querySelector(".popup-edit")
  .addEventListener("submit", handleAddCardSubmit);
profilePopup
  .querySelector(".popup-edit")
  .addEventListener("submit", handleEditProfileSave);

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup_active")) {
      closePopup();
    }
    if (evt.target.classList.contains("popup__container-close")) {
      closePopup();
    }
  });
});

renderCards(initialCards);

const validateForm = (settings, selector) => {
 const formElement = document.querySelector(`[name=${selector}]`);
   formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    const formValidator = new FormValidator(settings, formElement);
    formValidator.enableValidation();
};

export {
  setPopoutImg,
  fillCardForm,
  fillProfileInfo,
  fillProfileForm,
  settings,
  addCardPopup,
  validateForm,
};
