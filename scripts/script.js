let buttonEditProfile = document.querySelector(".profile__edit-button");
let buttonAddCard = document.querySelector(".profile__add-btn");
let popup = document.querySelector(".popup");
let popupCloseBtn = popup.querySelector(".popup__container-close");
let buttonPopupClose = popup.querySelector(".popup__container-close");
let imgTemplate = document.querySelector("#imgPopout").content;
let imgElement = imgTemplate.querySelector(".img-popout").cloneNode(true);
let gallery = document.querySelector(".gallery");
let cardTemplate = document.querySelector("#card").content;
let popupTemplate = document.querySelector("#popup-template").content;
let popupElement = popupTemplate
  .querySelector(".popup__container")
  .cloneNode(true);
const mediaQuery = window.matchMedia("(max-width: 796px)");

const initialCards = [
  {
    name: "Yosemite Valley",
    src: "./images/kirill-pershin-1088404-unsplash.png",
    alt: "Yosemite el capitan",
  },
  {
    name: "Lake Louise",
    src: "./images/unsplashtst/wil-stewart-T26KCgCPsCI-unsplash.jpg",
    alt: "Lake Louise",
  },
  {
    name: "Bald Mountains",
    src: "./images/unsplashtst/craig-strahorn--UmCb7gAAUI-unsplash.jpg",
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

function populate(cardsArr = initialCards) {
  cardsArr.forEach(function (card) {
    let cardElement = cardTemplate.querySelector(".card").cloneNode(true);
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
populate(initialCards);

function handleEditProfileBtn() {
  let profileName = document.querySelector(".profile__user-name").textContent;
  let profileAbout = document.querySelector(".profile__user-about").textContent;

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
  let formWidth = popupElement.offsetWidth;
  if (mediaQuery.matches) {
    buttonPopupClose.setAttribute("style", "margin: 0 0 20px 80vw;");
  } else {
    buttonPopupClose.setAttribute(
      "style",
      `margin-left: calc(${formWidth}px + 36px);`
    );
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
  let formHeading = popupElement.querySelector(".profile-edit__heading");
  let fieldProfileName = popupElement.querySelector(
    ".profile-edit__field_user_name"
  );
  let fieldProfileAbout = popupElement.querySelector(
    ".profile-edit__field_user_about"
  );

  formHeading.textContent = "New place";
  fieldProfileName.value = "Title";
  fieldProfileAbout.value = "Image link";

  popup.prepend(popupElement);
  let formWidth = popupElement.offsetWidth;
  if (mediaQuery.matches) {
    buttonPopupClose.setAttribute("style", "margin: 0 0 20px 80vw;");
  } else {
    buttonPopupClose.setAttribute(
      "style",
      `margin-left: calc(${formWidth}px + 36px);`
    );
  }

  function handleEditProfileSave(evt) {
    evt.preventDefault();
    let cardInput = [
      {
        name: fieldProfileName.value,
        src: fieldProfileAbout.value,
        alt: fieldProfileName.value,
      },
    ];
    populate(cardInput);
    popup.classList.remove("popup_active");
    popupElement.remove();
  }
  formEditProfile.addEventListener("submit", handleEditProfileSave);
}

function hanldeImgClick(evt) {
  const img = imgElement.querySelector(".img-popout__img");
  const cap = imgElement.querySelector(".img-popout__caption");

  img.setAttribute("src", evt.target.getAttribute("src"));
  cap.setAttribute("alt", evt.target.getAttribute("alt"));

  popup.classList.add("popup_active");
  popup.prepend(imgElement);
  let width = img.offsetWidth;
  buttonPopupClose.setAttribute(
    "style",
    `margin-left: calc(${width}px + 36px);`
  );
}

function handleEditProfileClose(evt) {
  popup.classList.remove("popup_active");
  if (!!popupElement) {
    popupElement.remove();
  }
  if (!!imgElement) {
    imgElement.remove();
  }
}

buttonEditProfile.addEventListener("click", handleEditProfileBtn);
buttonAddCard.addEventListener("click", handleAddCard);
buttonPopupClose.addEventListener("click", handleEditProfileClose);
