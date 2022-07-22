import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImages from "../scripts/components/PopupWithImages.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForms from "../scripts/components/PopupWithForms.js";
import {
  btnEditProfile,
  btnAddCard,
  settings,
} from "../scripts/utils/constants.js";
import { api } from "../scripts/components/Api.js";

function createCard(item) {
  const cardElement = new Card(
    { imgTitle: item.name, imgLink: item.link },
    "#card",
    (item) => {
      popupImg.open(item);
    }
  );
  return cardElement.makeCard();
}

const gallerySection = new Section({
  renderer: (item) => {
    return createCard(item);
  },
  selector: ".gallery",
});

const popupImg = new PopupWithImages("#imgPopup");
popupImg.setEventListeners();

export const editProfile = new PopupWithForms({
  selector: "#profilePopup",
  handleSubmit: () => {
    const data = editProfile.getInputValues();
    userInfo.setUserInfo(data);
    api.patchUserInfo(data)
    .then((res) => console.log(res));
    editProfile.close();
  },
});
editProfile.setEventListeners();

export const addCard = new PopupWithForms({
  selector: "#addCardPopup",
  handleSubmit: (data) => {
    gallerySection.addItem(data);
  },
});
addCard.setEventListeners();

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

api.getUserInfo()
.then((res) => {document.querySelector('.profile__picture').src = res.avatar;
userInfo.setUserInfo(res)});

api.getInitialCards().then((res) => gallerySection.renderAll(res.slice(0, 6)));

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

export { userInfo, formValidators };
