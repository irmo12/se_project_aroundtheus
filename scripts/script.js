const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-btn");
const profilePopup = document.querySelector("#profilePopup");
const addCardPopup = document.querySelector("#addCardPopup");
const imgPopup = document.querySelector('#imgPopup')
const btnPopupClose = popup.querySelector(".popup__container-close");
const imgElement = imgTemplate.querySelector(".img-popout")
const gallery = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#card").content;
const popupElement = document.querySelector(".popup__container")
const mediaQuery = window.matchMedia("(max-width: 796px)");

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

function popupOpen(id) {
  popup.classList.add("popup_active");
}

function popupClose() {
  popup.classList.remove("popup_active");
}

function setXMargin(width) {
  if (mediaQuery.matches) {
    buttonPopupClose.setAttribute("style", "margin: 0 0 20px 80vw;");
  } else {
    buttonPopupClose.setAttribute(
      "style",
      `margin-left: calc(${width}px + 36px);`
    );
  }
}

function renderCards(cardsArr = initialCards) {
  cardsArr.forEach(function (card) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImg = cardElement.querySelector(".card__img");
    const cardTitle = cardElement.querySelector(".card__caption");
    const btnLike = cardElement.querySelector(".card__like-btn");
    const btnTrash = cardElement.querySelector(".card__trash");

    cardImg.setAttribute("src", card.src);
    cardImg.setAttribute("alt", card.alt);
    cardTitle.textContent = card.name;

    btnLike.addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__like-btn_active");
    });

    btnTrash.addEventListener("click", function (evt) {
      evt.target.closest(".card").remove();
    });

    cardImg.addEventListener("click", hanldeImgClick);

    gallery.append(cardElement);
  });
}
renderCards(initialCards);

function handleEditProfileBtn() {
  clearClone();

  popupElement.querySelector(".profile-edit__heading").textContent =
    "Edit profile";
  const profileName = document.querySelector(".profile__user-name").textContent;
  const profileAbout = document.querySelector(
    ".profile__user-about"
  ).textContent;

  popupOpen();

  const formEditProfile = popupElement.querySelector(".profile-edit");
  const fieldProfileName = popupElement.querySelector(
    ".profile-edit__field_user_name"
  );
  const fieldProfileAbout = popupElement.querySelector(
    ".profile-edit__field_user_about"
  );

  fieldProfileName.value = profileName;
  fieldProfileAbout.value = profileAbout;
  popup.prepend(popupElement);

  const formWidth = popupElement.offsetWidth;
  setXMargin(formWidth);

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

    popupClose();
  }
  formEditProfile.addEventListener("submit", handleEditProfileSave);
}

function handleAddCard() {
  clearClone();

  const formEditProfile = popupElement.querySelector(".profile-edit");
  const formHeading = popupElement.querySelector(".profile-edit__heading");
  const fieldProfileName = popupElement.querySelector(
    ".profile-edit__field_user_name"
  );
  const fieldProfileAbout = popupElement.querySelector(
    ".profile-edit__field_user_about"
  );

  formHeading.textContent = "New place";
  fieldProfileName.value = "Title";
  fieldProfileAbout.value = "Image link";

  popupOpen();
  popup.prepend(popupElement);

  const formWidth = popupElement.offsetWidth;
  setXMargin(formWidth);

  function handleEditProfileSave(evt) {
    evt.preventDefault();
    const cardInput = [
      {
        name: fieldProfileName.value,
        src: fieldProfileAbout.value,
        alt: fieldProfileName.value,
      },
    ];
    populate(cardInput);
    popupClose();
  }
  formEditProfile.addEventListener("submit", handleEditProfileSave);
}

function hanldeImgClick(evt) {
  clearClone();

  const img = imgElement.querySelector(".img-popout__img");
  const cap = imgElement.querySelector(".img-popout__caption");

  img.setAttribute("src", evt.target.getAttribute("src"));
  cap.textContent = evt.target.getAttribute("alt");

  popup.prepend(imgElement);
  popupOpen();

  const width = img.offsetWidth;
  setXMargin(width);
}

buttonEditProfile.addEventListener("click", handleEditProfileBtn);
buttonAddCard.addEventListener("click", handleAddCard);
buttonPopupClose.addEventListener("click", popupClose);
