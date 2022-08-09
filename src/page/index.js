import "./index.css";
import FormValidator from "../scripts/components/FormValidator.js";
import Card from "../scripts/components/Card.js";
import Section from "../scripts/components/Section.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import {
  btnEditProfile,
  btnAddCard,
  btnProfilePicture,
  settings,
  MEID,
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
      handleLike: () => {
        if (cardElement._isLiked()) {
          api
            .removeLike(cardElement._id)
            .then((response) => cardElement.updateLikes(response.likes.length))
            .catch(console.error);
        } else {
          api
            .addLike(cardElement._id)
            .then((response) => cardElement.updateLikes(response.likes.length))
            .catch(console.error);
        }
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

const popupImg = new PopupWithImage("#imgPopup");
popupImg.setEventListeners();

export const profilePicturePopup = new PopupWithForm({
  selector: "#avatar",
  handleSubmit: (link) => {
    profilePicturePopup.showLoading();
    api
      .changeAvatar(link.link)
      .then((res) => {
        userInfo.setUserInfo(res);
        profilePicturePopup.close();
      })
      .catch((err) => console.log(err))
      .finally(profilePicturePopup.hideLoading());
  },
  loadingBtnText: "Saving...",
});
profilePicturePopup.setEventListeners();

export const editProfile = new PopupWithForm({
  selector: "#profilePopup",
  handleSubmit: (data) => {
    editProfile.showLoading();
    api
      .patchUserInfo(data)
      .then((res) => {
        userInfo.setUserInfo(res);
        editProfile.close();
      })
      .catch((err) => console.log(err))
      .finally(editProfile.hideLoading());
  },
  loadingBtnText: "Saving...",
});
editProfile.setEventListeners();

export const addCard = new PopupWithForm({
  selector: "#addCardPopup",
  handleSubmit: (data) => {
    addCard.showLoading();
    api
      .postNewCard({ name: data.title, link: data.imgLink })
      .then((res) => {
        gallerySection.addItem(res);
        addCard.close();
      })
      .catch((err) => console.log(err))
      .finally(addCard.hideLoading());
  },
  loadingBtnText: "Saving...",
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
  MEID.self = userData._id;
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
