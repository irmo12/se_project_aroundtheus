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
  btnProfilePicture,
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

export const changeProfilePicture = new PopupWithForms({
  selector: "#avatar",
  handleSubmit: () => {
    const link = changeProfilePicture.getInputValues().link;
    api.avatarChange(link);
    apiGetUserInfo();
  },
});
changeProfilePicture.setEventListeners();

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

function apiGetUserInfo() {
  api.getUserInfo().then((res) => {
    document.querySelector(".profile__picture").src = res.avatar;
    userInfo.setUserInfo(res);
  });
}

api.promiseAll().then((res) => {;
  document.querySelector(".profile__picture").src = res[0].avatar;
  userInfo.setUserInfo(res[0]);
  gallerySection.renderAll(res[1]);
});

btnProfilePicture.addEventListener("click", handleProfilePicture);

btnEditProfile.addEventListener("click", handleEditProfileBtn);

btnAddCard.addEventListener("click", handleAddCard);

function handleProfilePicture() {
  changeProfilePicture.open();
}

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
