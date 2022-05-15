import { toggleButton } from "./modules/validation.js";

const profileInfo = document.querySelector(".profile__info");
const profileName = profileInfo.querySelector(".profile__header");
const profileProfession = profileInfo.querySelector(".profile__profession");

const popupList = document.querySelectorAll(".popup");

const profileForm = document.forms.profileForm;
const profilePopup = document.querySelector(".popup_type_profile");
const editProfileButton = document.querySelector(".profile__button");
// const saveProfileButton = profilePopup.querySelector(".popup__save");
const closePopupButton = profilePopup.querySelector(".popup__close");
const inputNameField = profilePopup.querySelector(".popup__input_type_name");
const inputProfessionField = profilePopup.querySelector(
  ".popup__input_type_profession"
);
const popupSelector = "popup_open";

function openPopup(popup) {
  popup.classList.add(popupSelector);
  addKeyDownListener();
}

function closePopup(popup) {
  popup.classList.remove(popupSelector);
  removeKeyDownListener();
}

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
closePopupButton.addEventListener("click", () => closePopup(profilePopup));

function handleKeyDown(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(`.${popupSelector}`);
    closePopup(openedPopup);
  }
}

function addKeyDownListener() {
  document.addEventListener("keydown", handleKeyDown);
}

function removeKeyDownListener() {
  document.removeEventListener("keydown", handleKeyDown);
}

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.matches(".popup")) {
      const Popup = document.querySelector(`.${popupSelector}`);
      closePopup(Popup);
    }
  });
});

const formCards = document.querySelector(".popup__form_cards");
const cardTemplateBase = document.querySelector("#card-template").content;
const cardTemplate = cardTemplateBase.querySelector(".elements__card");
const previewImage = document.querySelector(".popup_type-preview");
const cardPopup = document.querySelector(".popup_type_add-card");
const addCardButton = document.querySelector(".add-button");
const previewButtonClose = document.querySelector(
  ".popup__close.popup__close_preview"
);
const addButtonClose = document.querySelector(".popup__close.popup__close_add");
const inputIntoTitle = document.querySelector(".popup__input_type_title");
const inputIntoImage = document.querySelector(".popup__input_type_link");

const elementsList = document.querySelector(".elements__cards");
const addPopupInputs = cardPopup;
const inactiveButtonClass = "popup__save_disabled";
const newCardSubmitButton = document.querySelector(
  "form[name='addCards'] .popup__save"
);

previewButtonClose.addEventListener("click", () => closePopup(previewImage));
addButtonClose.addEventListener("click", () => closePopup(cardPopup));

function createCardElement(card) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardName = cardElement.querySelector(".elements__card-text");
  const likeButton = cardElement.querySelector(".elements__button-like");
  const deleteButton = cardElement.querySelector(".elements__button-delete");

  const { name, link } = card;
  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = card.name;

  cardImage.addEventListener("click", () => openImagePreview(card));

  function activateLikeButton(evt) {
    const likeButton = evt.target;
    likeButton.classList.toggle("elements__button-like_active");
  }

  likeButton.addEventListener("click", activateLikeButton);

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  return cardElement;
}

function renderCard(card, wrapper) {
  wrapper.prepend(card);
}

initialCards.forEach((card) => {
  const newCard = createCardElement(card);
  renderCard(newCard, elementsList);
});

formCards.addEventListener("submit", (evt) => {
  const card = {
    name: inputIntoTitle.value,
    link: inputIntoImage.value,
  };
  renderCard(createCardElement(card), elementsList);
  evt.preventDefault();
  closePopup(cardPopup);
  toggleButton(addPopupInputs, newCardSubmitButton, { inactiveButtonClass });
  formCards.reset();
});

const openImagePreview = (card) => {
  openPopup(previewImage);
  const popupImage = previewImage.querySelector(".popup__image");
  const popupTitle = previewImage.querySelector(".popup__subtitle");
  popupImage.src = card.link;
  popupImage.alt = card.name;
  popupTitle.textContent = card.name;
};

addCardButton.addEventListener("click", () => {
  openPopup(cardPopup);
});
