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
import { WarnPopup } from "../scripts/components/WarnPopup";

function createCard(item) {
  const cardElement = new Card(
    {
      data: item,
      handleImg: (item) => {
        popupImg.open(item);
      },
      handleDel: (id) => {
        delWarnPopup.open(id);
      },
    },
    "#card"
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
    api.patchUserInfo(data);
    editProfile.close();
  },
});
editProfile.setEventListeners();

export const addCard = new PopupWithForms({
  selector: "#addCardPopup",
  handleSubmit: (data) => {
    api.postNewCard(data).then((res) => {
      gallerySection.addItem(res);
    });
  },
});
addCard.setEventListeners();

export const delWarnPopup = new WarnPopup({
  selector: "#cardDelete",
  handleSubmit: (id) => {
    api.deleteCard(id);
    document.getElementById(id).remove();
  },
});
delWarnPopup.setEventListeners();

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

api.getUserInfo().then((res) => {
  document.querySelector(".profile__picture").src = res.avatar;
  userInfo.setUserInfo(res);
});

api.getInitialCards().then((res) => gallerySection.renderAll(res));

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
