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
  initialCards,
  settings,
} from "../scripts/utils/constants.js";

const gallerySection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = new Card(
        { imgTitle: item.imgTitle, imgLink: item.imgLink },
        "#card",
        (item) => {
          popupImg.open(item);
        }
      );
      return cardElement.makeCard();
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
    gallerySection.addItem(data);
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

export { userInfo, formValidators };
