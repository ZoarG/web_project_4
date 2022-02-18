const profile = document.querySelector(".profile");
const profileInfo = document.querySelector(".profile__header");
const profileName = profileInfo.querySelector(".profile__title");
const profileProfession = document.querySelector(".profile__subtitle");
const profileForm = document.forms.profileForm;
const profilePopup = document.querySelector(".popup_type_profile");
const editButton = document.querySelector(".profile__edit-button");
const saveButton = profilePopup.querySelector(".popup__save");
const closeButton = profilePopup.querySelector(".popup__close");
let inputName = profilePopup.querySelector(".popup__input_type_name");
let inputProfession = profilePopup.querySelector(
  ".popup__input_type_profession"
);

function openPopup(popup) {
  popup.classList.add("popup_open");
}

function closePopup(popup) {
  popup.classList.remove("popup_open");
}

function formLoadUp() {
  openPopup(profilePopup);
  inputName.value = profileName.textContent;
  inputProfession.value = profileProfession.textContent;
}

function formSubmitHandle(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileProfession.textContent = inputProfession.value;
  closePopup(profilePopup);
}

editButton.addEventListener("click", formLoadUp);
profileForm.addEventListener("submit", formSubmitHandle);
closeButton.addEventListener("click", () => closePopup(profilePopup));
