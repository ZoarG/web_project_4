const popupSelector = "popup_open";

export function openPopup(popup) {
  popup.classList.add(popupSelector);
  addKeyDownListener();
}

function addKeyDownListener() {
  document.addEventListener("keydown", handleKeyDown);
}

export function closePopup(popup) {
  popup.classList.remove(popupSelector);
  removeKeyDownListener();
}

function removeKeyDownListener() {
  document.removeEventListener("keydown", handleKeyDown);
}

function handleKeyDown(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(`.${popupSelector}`);
    closePopup(openedPopup);
  }
}

export const defaultFormConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input-error_open",
  errorClass: "popup__error_visible",
};
