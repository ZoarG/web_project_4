class FormValidator {
  constructor(config, formElement) {
    this._config = { ...config };

    this._element = formElement;

    this._buttonElement = this._element.querySelector(
      this._config.submitButtonSelector
    );
    this._inputList = Array.from(
      this._element.querySelectorAll(this._config.inputSelector)
    );
  }

  _toggleButton() {
    if (this._hasValidInputs()) {
      this._buttonElement.disabled = false;
      this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    } else {
      this._buttonElement.disabled = true;
      this._buttonElement.classList.add(this._config.inactiveButtonClass);
    }
  }

  _hasValidInputs() {
    return this._inputList.every((input) => input.validity.valid === true);
  }

  _setEventListeners = () => {
    this._toggleButton();

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        console.log(input);
        this._сheckInputValidity(input);
        this._toggleButton();
      });
    });
  };

  _showInputError = (input) => {
    const errorElement = this._element.querySelector(`#${input.id}-error`);
    errorElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  _hideInputError = (input) => {
    const errorElement = this._element.querySelector(`#${input.id}-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);
    input.classList.remove(this._config.inputErrorClass);
  };

  _сheckInputValidity = (input) => {
    if (input.validity.valid) {
      this._hideInputError(input);
    } else {
      this._showInputError(input);
    }
  };

  enableValidation() {
    this._element.addEventListener("submit", (event) => {
      event.preventDefault();
    });

    this._setEventListeners();
  }

  _resetValidation() {
    this._element.reset();
    this._inputList.forEach((input) => {
      this._hideInputError(input);
    });
    this._toggleButton();
  }
}

export default FormValidator;
