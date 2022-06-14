import Card from "./modules/card.js";
import { openPopup, closePopup, defaultFormConfig } from "./utils.js";
import { initialCards } from "./modules/cards.js";
import FormValidator from "./modules/formValidator.js";

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__header");
const profileProfession = profileInfo.querySelector(".profile__profession");

const popupList = document.querySelectorAll(".popup");

const profileForm = document.forms.profileForm;
const profilePopup = document.querySelector(".popup_type_profile");
const editProfileButton = document.querySelector(".profile__button");

const inputNameField = profilePopup.querySelector(".popup__input_type_name");
const inputProfessionField = profilePopup.querySelector(
  ".popup__input_type_profession"
);

const formCards = document.querySelector(".popup__form_cards");
const cardTemplate = document.querySelector("#card-template");

const cardPopup = document.querySelector(".popup_type_add-card");
const addCardButton = document.querySelector(".add-button");

const inputIntoTitle = document.querySelector(".popup__input_type_title");
const inputIntoImage = document.querySelector(".popup__input_type_link");

const elementsList = document.querySelector(".elements__cards");
//const addPopupInputs = [...cardPopup.querySelectorAll(".popup__input")];
const closeButtons = document.querySelectorAll(".popup__close");
const popupProfileForm = document.querySelector(".popup__form_edit");
const profileEditFormValidator = document.querySelector(".popup_type_add-card");

function openProfilePopup() {
  openPopup(profilePopup);
  inputNameField.value = profileName.textContent;
  inputProfessionField.value = profileProfession.textContent;
}

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputNameField.value;
  profileProfession.textContent = inputProfessionField.value;
  closePopup(profilePopup);
}

editProfileButton.addEventListener("click", openProfilePopup);
profileForm.addEventListener("submit", handleProfileFormSubmit);

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

function renderCard(data, wrapper) {
  const cardElement = new Card(data, cardTemplate);
  wrapper.prepend(cardElement.generateCard());
}

initialCards.forEach((card) => {
  renderCard(card, elementsList);
});

formCards.addEventListener("submit", (evt) => {
  const card = {
    name: inputIntoTitle.value,
    link: inputIntoImage.value,
  };
  renderCard(card, elementsList);
  evt.preventDefault();
  closePopup(cardPopup);
  addCardForm.resetValidation();
});

addCardButton.addEventListener("click", () => {
  openPopup(cardPopup);
});

closeButtons.forEach((button) => {
  // find the closest popup
  const popup = button.closest(".popup");
  // set the listener
  button.addEventListener("click", () => closePopup(popup));
});

//validation

const profileEditForm = new FormValidator(defaultFormConfig, popupProfileForm);
profileEditForm.enableValidation();
const addCardForm = new FormValidator(
  defaultFormConfig,
  profileEditFormValidator
);
addCardForm.enableValidation();
