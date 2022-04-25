const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-btn");
const profilePopup = document.querySelector("#profilePopup");
const addCardPopup = document.querySelector("#addCardPopup");
const imgPopup = document.querySelector('#imgPopup')
const gallery = document.querySelector(".gallery");
const cardTemplate = document.querySelector("#card").content;
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

function openPopup(id) {
  id.classList.add("popup_active");
}

function closePopup(id) {
  id.classList.remove("popup_active");
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

function createCard(card) {
    const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
    const cardImg = cardElement.querySelector(".card__img");
    const cardTitle = cardElement.querySelector(".card__caption");
    const btnLike = cardElement.querySelector(".card__like-btn");
    const btnTrash = cardElement.querySelector(".card__trash");

    cardImg.setAttribute("src", card.src);
    cardImg.setAttribute("alt", card.alt);
    cardTitle.textContent = card.name;    
  
    btnLike.addEventListener("click", handleLikeBtn(evt));
    cardImg.addEventListener("click", hanldeImgClick(evt));
    btnTrash.addEventListener("click", handleTrashBtn (evt));
    return cardElement;
}

function renderCard(card) {
  cardElement = createCard(card);
  gallery.prepend(cardElement);
}

function renderCards(cardsArr = initialCards) {
  cardsArr.forEach(renderCard (card));
}

function handleLikeBtn (evt) {
  evt.target.classList.tevtoggle("card__like-btn_active");
}

function handleTrashBtn(evt) {
  evt.target.closest(".card").remove();
}

function fillCardForm(); {
  const fieldPlaceTitle = addCardPopup.querySelector('input[name='Title']');
  const fieldPlaceLink = addCardPopup.querySelector(".popup-edit__field_place_link");
 
  const cardInput = [
      {
        name: fieldPlaceTitle.value,
        src: fieldPlaceLink.value,
        alt: fieldPlaceTitle.value,
      }
    ];
  renderCard(cardInput);
}
  
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  fillCardForm();
  closePopup(addCardPopup);

}









cardImg.addEventListener("click", hanldeImgClick);
  
  



function handleEditProfileBtn() {
  
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

function handleAddCardBtn() {
  openPopup(addCardPopup);
}




  
formEditProfile.addEventListener("submit", handleEditProfileSave);


function hanldeImgClick(evt) {
  

  const img = imgElement.querySelector(".img-popout__img");
  const cap = imgElement.querySelector(".img-popout__caption");

  img.setAttribute("src", evt.target.getAttribute("src"));
  cap.textContent = evt.target.getAttribute("alt");

  popup.prepend(imgElement);
  popupOpen();

  
}

buttonEditProfile.addEventListener("click", handleEditProfileBtn);
buttonAddCard.addEventListener("click", handleAddCard);
buttonPopupClose.addEventListener("click", popupClose);

renderCards(initialCards);