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
    name: "Yosemite Valley",
    src: yosemite,
    alt: "Yosemite el capitan",
  },
  {
    name: "Lake Louise",
    src: lLouise,
    alt: "Lake Louise",
  },
  {
    name: "Bald Mountains",
    src: bMountains,
    alt: "Bald Mountains",
  },
  {
    name: "Latemar",
    src: latemar,
    alt: "Latemar",
  },
  {
    name: "Vanoise National Park",
    src: vanoise,
    alt: "Vanoise National Park",
  },
  {
    name: "Lago di Braies",
    src: cactus,
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
