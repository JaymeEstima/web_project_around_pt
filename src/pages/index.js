import { validationConfig, initialCards } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForms.js";
import { UserInfo } from "../components/UserInfo.js";

// --- Elementos: Editar Perfil ---

const editPopup = document.querySelector("#edit-popup");
const editForm = editPopup.querySelector("#edit-profile-form");
const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.setEventListeners();

const nameInput = editForm.querySelector(".popup__input_type_name");
const descriptionInput = editForm.querySelector(
  ".popup__input_type_description",
);

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  descriptionSelector: ".profile__description",
});

const editButton = document.querySelector(".profile__edit-button");

function fillProfileForm() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  descriptionInput.value = userData.description;
}

function handleOpenEditModal() {
  fillProfileForm();
  editFormValidator.resetValidation();
  editFormPopup.open();
}

editButton.addEventListener("click", handleOpenEditModal);

const editFormPopup = new PopupWithForm("#edit-popup", handleProfileFormSubmit);

function handleProfileFormSubmit(formData) {
  userInfo.setUserInfo({
    name: formData.name,
    description: formData.description,
  });
  editFormPopup.close();
}

editFormPopup.setEventListeners();

// --- Elementos: Novo Local ---

const addCardButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector("#new-card-popup");
const addCardForm = addCardPopup.querySelector("#new-card-form");
const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.setEventListeners();

function handleOpenAddCardModal() {
  addCardFormValidator.resetValidation();
  addCardFormPopup.open();
}

addCardButton.addEventListener("click", handleOpenAddCardModal);

const addCardFormPopup = new PopupWithForm(
  "#new-card-popup",
  handleCardFormSubmit,
);

function handleCardFormSubmit(formData) {
  const cardElement = createCard({
    name: formData["place-name"],
    link: formData.link,
  });
  cardSection.addItem(cardElement);
  addCardFormPopup.close();
}

addCardFormPopup.setEventListeners();

// --- Elementos: Imagem ampliada ---

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function createCard({ name, link }) {
  const card = new Card({ name, link }, "#card-template", (name, link) =>
    imagePopup.open(name, link),
  );
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

cardSection.renderItems();
