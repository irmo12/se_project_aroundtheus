import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImages from "../scripts/components/PopupwithImages.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForms from "../scripts/components/PopupWithForms.js";

const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-btn");

const profilePopup = document.querySelector("#profilePopup");
const addCardPopup = document.querySelector("#addCardPopup");
const imgPopup = document.querySelector("#imgPopup");

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

const gallerySection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(
        { name: item.name, source: item.src },
        "#card",
        (item) => {
          popupImg.open(item);
        }
      );
      gallerySection.addItem(cardElement.makeCard());
    },
  },
  ".gallery"
);
gallerySection.renderAll();

const popupImg = new PopupWithImages("#imgPopup");

export const editProfile = new PopupWithForms({
  selector: "#profilePopup",
  handleSubmit: () => {
    userInfo.setUserInfo(editProfile._getInputValues());
    editProfile.close();
  },
});

export const addCard = new PopupWithForms({
  selector: "#addCardPopup",
  handleSubmit: (data) => {
    const newCard = new Card(
      { name: data.imgTitle, source: data.imgLink },
      "#card",
      (item) => {
        popupImg.open(item);
      }
    );
    gallerySection.addItem(newCard.makeCard());
  },
});

const userInfo = new UserInfo({
  nameSelector: ".profile__user-name",
  jobSelector: ".profile__user-about",
});

const formValidators = {};
const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

btnEditProfile.addEventListener("click", handleEditProfileBtn);

btnAddCard.addEventListener("click", handleAddCard);

function handleEditProfileBtn() {
  const data = userInfo.getUserInfo();
  editProfile.open(data);
  formValidators["editProfileForm"].resetValidation();
}

function handleAddCard() {
  formValidators["addCardForm"].resetValidation();
  addCard.open();
}

export {
  userInfo,
  settings,
  addCardPopup,
  profilePopup,
  imgPopup,
  formValidators,
};
