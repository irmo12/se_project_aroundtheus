import { fillCardForm, fillProfileInfo, fillProfileForm } from '../index.js'

function openPopup(selector) {
    document.querySelector(`${selector}`).classList.add("popup_active");
    document.addEventListener("keydown", handlecloseByEscape);
  }
  
  function closePopup() {
    document.querySelector('.popup_active').classList.remove("popup_active");
    document.removeEventListener("keydown", handlecloseByEscape);
  }
  
    function handleEditProfileSave(evt) {
    evt.preventDefault();
    fillProfileInfo();
    closePopup();
  }
  

function handleEditProfileBtn() {
    fillProfileForm();
    openPopup('#profilePopup');
  }

function handleAddCard() {
    addCardPopup.querySelector(settings.formSelector).reset();
    openPopup('#addCardPopup');
  }

function handlecloseByEscape(evt) {
    if (evt.key === "Escape") {
      closePopup();
    }
  }

  function handleAddCardSubmit(evt) {
    evt.preventDefault();
    fillCardForm();
    closePopup();
    evt.target.reset();
  }
  
  export { openPopup, closePopup, fillProfileInfo, handleEditProfileSave, handleEditProfileBtn, handleAddCard, handleAddCardSubmit };