const showInputError = (input, formElement, settings) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  input.classList.add(settings.errorClass);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(settings.inputErrorClass);
};

const hideInputError = (input, formElement, settings) => {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  input.classList.remove(settings.errorClass);
  errorElement.textContent = "";
  errorElement.classList.remove(settings.inputErrorClass);
};

const checkInputValidity = (formElement, input, settings) => {
  if (input.validity.valid) {
    hideInputError(input, formElement, settings);
  } else {
    showInputError(input, formElement, settings);
  }
};

const hasValidInput = (addPopupInput) => {
  return addPopupInput.every((input) => input.validity.valid);
};

export const toggleButton = (addPopupInput, button, settings) => {
  console.log(hasValidInput(addPopupInput));
  if (hasValidInput(addPopupInput)) {
    button.disabled = false;
    button.classList.remove(settings.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(settings.inactiveButtonClass);
  }
};

const setEventListeners = (formElement, settings) => {
  const inputList = [...formElement.querySelectorAll(settings.inputSelector)];
  const submitButton = formElement.querySelector(settings.submitButtonSelector);
  inputList.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(formElement, input, settings);
      toggleButton(inputList, submitButton, settings);
    });
  });
};

const enableValidation = (settings) => {
  const formList = [...document.querySelectorAll(settings.formSelector)];
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => evt.preventDefault());
    setEventListeners(formElement, settings);
  });
};

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input-error_open",
  errorClass: "popup__error_visible",
});
