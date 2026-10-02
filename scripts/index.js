import { openModal, closeModal, handleOverlayClick } from "./utils.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];


// --- Elementos: Editar Perfil ---

const editPopup = document.querySelector("#edit-popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const editForm = editPopup.querySelector("#edit-profile-form");
const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.setEventListeners();

const nameInput = editForm.querySelector(".popup__input_type_name");
const descriptionInput = editForm.querySelector(
  ".popup__input_type_description"
);

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");

function fillProfileForm() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
  fillProfileForm();
  editFormValidator.resetValidation();
  openModal(editPopup);
}

editButton.addEventListener("click", handleOpenEditModal);

editPopupCloseButton.addEventListener("click", function () {
  closeModal(editPopup);
});

function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(editPopup);
}

editForm.addEventListener("submit", handleProfileFormSubmit);

// --- Elementos: Novo Local ---

const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#new-card-popup");
const addCardForm = addCardPopup.querySelector("#new-card-form");
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.setEventListeners();

const addCardPopupCloseButton = addCardPopup.querySelector(".popup__close");
const placeNameInput = addCardForm.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = addCardForm.querySelector(".popup__input_type_url");

function handleOpenAddCardModal() {
  addCardForm.reset();
  addCardFormValidator.resetValidation();
  openModal(addCardPopup);
}

addCardButton.addEventListener("click", handleOpenAddCardModal);

addCardPopupCloseButton.addEventListener("click", function () {
  closeModal(addCardPopup);
});

function handleCardFormSubmit(event) {
  event.preventDefault();
  renderCard(placeNameInput.value, linkInput.value, cardsList);
  closeModal(addCardPopup);
  addCardForm.reset();
}

addCardForm.addEventListener("submit", handleCardFormSubmit);

// --- Elementos: Imagem ampliada ---

const imagePopup = document.querySelector("#image-popup");
const imagePopupCloseButton = imagePopup.querySelector(".popup__close");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const cardsList = document.querySelector(".cards__list");

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

imagePopupCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

function renderCard(name, link, container) {
  const cardElement = new Card({ name, link }, "#card-template", handleImageClick).generateCard();
  container.prepend(cardElement);
} 

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

const popupList = Array.from(document.querySelectorAll(".popup"));

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClick);
});
