let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonAddCard = document.querySelector(".profile__add-btn");
let popup = document.querySelector(".popup");
let buttonPopupClose = popup.querySelector(".popup__container-close");

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
const gallery = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#card").content;

function populateInitial(cardsArr = initialCards) {
  cardsArr.forEach(function (card) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImg = cardElement.querySelector(".card__img");
    const cardTitle = cardElement.querySelector(".card__caption");

    cardImg.setAttribute("src", card.src);
    cardImg.setAttribute("alt", card.alt);
    cardTitle.textContent = card.name;

    gallery.append(cardElement);
  });
}
populateInitial(initialCards);

function handleEditProfileBtn() {
  let profileName = document.querySelector(".profile__user-name").textContent;
  let profileAbout = document.querySelector(".profile__user-about").textContent;

  popupTemplate = document.querySelector("#popup-template").content;
  popupElement = popupTemplate
    .querySelector(".popup__container")
    .cloneNode(true);
  popup.classList.add("popup_active");

  let formEditProfile = popupElement.querySelector(".profile-edit");
  let fieldProfileName = popupElement.querySelector(
    ".profile-edit__field_user_name"
  );
  let fieldProfileAbout = popupElement.querySelector(
    ".profile-edit__field_user_about"
  );

  fieldProfileName.value = profileName;
  fieldProfileAbout.value = profileAbout;

  popup.prepend(popupElement);

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

    popup.classList.remove("popup_active");
    popupElement.remove();
  }
  formEditProfile.addEventListener("submit", handleEditProfileSave);
}

function handleAddCard() {
  popupTemplate = document.querySelector("#popup-template").content;
  popupElement = popupTemplate
    .querySelector(".popup__container")
    .cloneNode(true);
  popup.classList.add("popup_active");

  let formEditProfile = popupElement.querySelector(".profile-edit");
  let fieldProfileName = popupElement.querySelector(
    ".profile-edit__field_user_name"
  );
  let fieldProfileAbout = popupElement.querySelector(
    ".profile-edit__field_user_about"
  );

  fieldProfileName.value = "Title"
  fieldProfileAbout.value = "Image link"

  popup.prepend(popupElement);

  function handleEditProfileSave(evt) {
    evt.preventDefault();
    let cardInput = [ 
     {
        name: fieldProfileName.value,
        src: fieldProfileAbout.value,
        alt: fieldProfileName.value,
     }
    ];   
    populateInitial(cardInput);
    popup.classList.remove("popup_active");
    popupElement.remove();
  }

  formEditProfile.addEventListener("submit", handleEditProfileSave);
}

function handleEditProfileClose() {
  popup.classList.remove("popup_active");
  popupElement.remove();
}

buttonEditProfile.addEventListener("click", handleEditProfileBtn);
buttonAddCard.addEventListener('click', handleAddCard);
buttonPopupClose.addEventListener("click", handleEditProfileClose);
