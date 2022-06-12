import { openPopup } from "../utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._cardSelector = cardSelector; //template selector
    this._isLiked = false;

    this._cardTemplate =
      this._cardSelector.content.querySelector(".elements__card");

    this._name = data.name;
    this._link = data.link;
    this._alt = `Picture of ${data.name}`;

    this._cardElement = this._cardTemplate.cloneNode(true);
  }

  _handleLikeButton = (evt) =>
    evt.target.classList.toggle("elements__button-like_active");

  _handleCardClick = () => {
    this._openImagePreview();
  };

  _openImagePreview = () => {
    const previewImage = document.querySelector(".popup_type-preview");
    const popupImage = previewImage.querySelector(".popup__image");
    const popupTitle = previewImage.querySelector(".popup__subtitle");
    popupImage.src = this._link;
    popupImage.alt = this._alt;
    popupTitle.textContent = this._name;
    openPopup(previewImage);
  };

  _setEventListeners() {
    this._cardTrashButtonElement.addEventListener("click", () =>
      this._cardElement.remove()
    );

    this._cardImageElement.addEventListener("click", () =>
      this._handleCardClick()
    );

    this._cardLikeButtonElement.addEventListener(
      "click",
      this._handleLikeButton
    );
  }

  generateCard() {
    this._cardTitleElement = this._cardElement.querySelector(
      ".elements__card-text"
    );
    this._cardImageElement =
      this._cardElement.querySelector(".elements__image");
    this._cardLikeButtonElement = this._cardElement.querySelector(
      ".elements__button-like"
    );
    this._cardTrashButtonElement = this._cardElement.querySelector(
      ".elements__button-delete"
    );

    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitleElement.textContent = this._name;

    this._setEventListeners();

    return this._cardElement;
  }

  _removeCard() {
    this.cardElement.remove();
    this.cardElement = null;
  }
}
