import yosemite from "../../images/kirill-pershin-1088404-unsplash.png";
import lLouise from "../../images/kirill-pershin-1404681-unsplash.png";
import bMountains from "../../images/kirill-pershin-1556355-unsplash.png";
import latemar from "../../images/peter-steiner-FrqiXDxxOGs-unsplash.jpg";
import vanoise from "../../images/freysteinn-g-jonsson-Ebk1MBerpwo-unsplash.jpg";
import cactus from "../../images/jeremy-alford-WhbLmhaiu_w-unsplash.jpg";

const btnEditProfile = document.querySelector(".profile__edit-button");
const btnAddCard = document.querySelector(".profile__add-btn");

const initialCards = [
  {
    imgTitle: "Yosemite Valley",
    imgLink: yosemite,
    alt: "Yosemite el capitan",
  },
  {
    imgTitle: "Lake Louise",
    imgLink: lLouise,
    alt: "Lake Louise",
  },
  {
    imgTitle: "Bald Mountains",
    imgLink: bMountains,
    alt: "Bald Mountains",
  },
  {
    imgTitle: "Latemar",
    imgLink: latemar,
    alt: "Latemar",
  },
  {
    imgTitle: "Vanoise National Park",
    imgLink: vanoise,
    alt: "Vanoise National Park",
  },
  {
    imgTitle: "Lago di Braies",
    imgLink: cactus,
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

export { btnEditProfile, btnAddCard, initialCards, settings };
