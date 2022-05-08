import { enableValidation, resetValidation } from "./modules/validate.js";

const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-btn");
const profileUser = document.querySelector(".profile__user");
const profilePopup = document.querySelector("#profilePopup");
const addCardPopup = document.querySelector("#addCardPopup");
const imgPopup = document.querySelector("#imgPopup");
const gallery = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#card").content;

const btnProfilePopupClose = profilePopup.querySelector(
  ".popup__container-close"
);
const btnAddCardPopoupClose = addCardPopup.querySelector(
  ".popup__container-close"
);
const btnImgPopupClose = imgPopup.querySelector(".popup__container-close");
const profileName = profileUser.querySelector(".profile__user-name");
const profileAbout = profileUser.querySelector(".profile__user-about");
const fieldProfileName = profilePopup.querySelector(
  ".popup-edit__field_user_name"
);
const fieldProfileAbout = profilePopup.querySelector(
  ".popup-edit__field_user_about"
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
    src: './images/photo-1449867727329-3294ea016353.jpg',
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

function openPopup(popup) {
  popup.classList.add("popup_active");
  if (popup.id === "addCardPopup") {
    popup.querySelector(".popup-edit").reset();
  }
  setEscListener(popup);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  if (popup.id !== "imgPopup") {
    resetValidation(popup.querySelector(".popup-edit"));
  }
  document.removeEventListener('keydown', setEscListener);
}

function fillProfileInfo() {
  profileName.textContent = fieldProfileName.value;
  profileAbout.textContent = fieldProfileAbout.value;
}

function handleEditProfileSave(evt) {
  evt.preventDefault();
  fillProfileInfo();
  closePopup(profilePopup);
}

function fillProfileForm() {
  fieldProfileName.value = profileName.textContent;
  fieldProfileAbout.value = profileAbout.textContent;
}

function handleEditProfileBtn() {
  fillProfileForm();
  openPopup(profilePopup);
}

function createCard(card) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImg = cardElement.querySelector(".card__img");
  const cardTitle = cardElement.querySelector(".card__caption");
  const btnLike = cardElement.querySelector(".card__like-btn");
  const btnTrash = cardElement.querySelector(".card__trash");

  cardImg.setAttribute("src", card.src);
  cardImg.setAttribute("alt", card.alt);
  cardTitle.textContent = card.name;

  btnLike.addEventListener("click", handleLikeBtn);
  cardImg.addEventListener("click", hanldeImgClick);
  btnTrash.addEventListener("click", handleTrashBtn);

  return cardElement;
}

function renderCard(card) {
  gallery.prepend(createCard(card));
}

function renderCards(cardsArr = initialCards) {
  cardsArr.forEach(renderCard);
}

function handleLikeBtn(evt) {
  evt.target.classList.toggle("card__like-btn_active");
}

function handleTrashBtn(evt) {
  evt.target.closest(".card").remove();
}

function fillCardForm() {
  const fieldPlaceTitle = addCardPopup.querySelector(
    ".popup-edit__field_place-title"
  );
  const fieldPlaceLink = addCardPopup.querySelector(
    ".popup-edit__field_place-link"
  );

  const cardInput = {
    name: fieldPlaceTitle.value,
    src: fieldPlaceLink.value,
    alt: fieldPlaceTitle.value,
  };

  renderCard(cardInput);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  fillCardForm();
  closePopup(addCardPopup);
  evt.target.closest(".popup-edit").reset();
}

function handleAddCard() {
  openPopup(addCardPopup);
}

function setPopoutImg(evt) {
  const img = imgPopup.querySelector(".img-popout__img");
  const caption = imgPopup.querySelector(".img-popout__caption");

  img.setAttribute("src", evt.target.getAttribute("src"));
  img.setAttribute("alt", evt.target.getAttribute("alt"));
  caption.textContent = evt.target.getAttribute("alt");
}

function hanldeImgClick(evt) {
  setPopoutImg(evt);
  openPopup(imgPopup);
}

btnEditProfile.addEventListener("click", handleEditProfileBtn);
btnAddCard.addEventListener("click", handleAddCard);
btnProfilePopupClose.addEventListener("click", function () {
  closePopup(profilePopup);
});
btnAddCardPopoupClose.addEventListener("click", function () {
  closePopup(addCardPopup);
});
btnImgPopupClose.addEventListener("click", function () {
  closePopup(imgPopup);
});
addCardPopup
  .querySelector(".popup-edit")
  .addEventListener("submit", handleAddCardSubmit);
profilePopup
  .querySelector(".popup-edit")
  .addEventListener("submit", handleEditProfileSave);

const setEscListener = (overlay) => {
  document.addEventListener("keydown", function (evt) {
    if (evt.key === "Escape") {
      closePopup(overlay);
    }
  });
};

function setOverlayListeners(overlayList) {
  overlayList.forEach((overlay) => {
  overlay.addEventListener("click", function (evt) {
    if (evt.target === this) {
      closePopup(overlay);
    }
  });
  
});
}

const enableClosebyOverlay = () => {
  const overlayList = Array.from(document.querySelectorAll(".popup"));
  setOverlayListeners(overlayList);
};

enableClosebyOverlay();
renderCards(initialCards);
enableValidation();
