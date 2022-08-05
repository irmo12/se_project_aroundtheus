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
import { api } from "../scripts/utils/Api.js";
import { WarnPopup } from "../scripts/components/WarnPopup";

function createCard(card) {
  const cardElement = new Card(
    {
      data: card,
      handleImg: (card) => {
        popupImg.open(card);
      },
      handleDel: (id) => {
        delWarnPopup.open();
        delWarnPopup.setAction(() => {
          api
            .deleteCard(id)
            .then(cardElement.remove())
            .catch((err) => console.log(err));
        });
      },
    },
    "#card"
  );
  return cardElement.makeCard();
}

const gallerySection = new Section({
  renderer: (card) => {
    return createCard(card);
  },
  selector: ".gallery",
});

const popupImg = new PopupWithImages("#imgPopup");
popupImg.setEventListeners();

export const profilePicturePopup = new PopupWithForms({
  selector: "#avatar",
  handleSubmit: (link) => {
    link = link.imageLink;
    api
      .changeAvatar(link)
      .then((res) => {
        userInfo.setUserInfo(res);
      })
      .catch((err) => console.log(err));
  },
});
profilePicturePopup.setEventListeners();

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
    api
      .postNewCard(data)
      .then((res) => {
        gallerySection.addItem(res);
      })
      .catch((err) => console.log(err));
  },
});
addCard.setEventListeners();

export const delWarnPopup = new WarnPopup("#cardDelete");
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

api.getInitialData().then(([userData, cardsArray]) => {
  userInfo.setUserInfo(userData);
  gallerySection.renderAll(cardsArray);
});

btnProfilePicture.addEventListener("click", handleProfilePicture);

btnEditProfile.addEventListener("click", handleEditProfileBtn);

btnAddCard.addEventListener("click", handleAddCard);

function handleProfilePicture() {
  profilePicturePopup.open();
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
