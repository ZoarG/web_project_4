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
  inputSelector: ".form__input",
  submitButtonSelector: ".form__submit-button",
  inactiveButtonClass: "button_blocked",
  inputErrorClass: "form__input-error",
  errorClass: "form__input-error_visible",
};
