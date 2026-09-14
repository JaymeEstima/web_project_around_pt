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

// --- Funções reutilizáveis de modal ---

function handleEscKey(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    if (openedPopup) {
      closeModal(openedPopup);
    }
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscKey);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscKey);
}

function handleOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

// --- Elementos: Editar Perfil ---

const editPopup = document.querySelector("#edit-popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const editForm = editPopup.querySelector("#edit-profile-form");
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
  resetValidation(editForm, validationConfig);
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
const addCardPopupCloseButton = addCardPopup.querySelector(".popup__close");
const addCardForm = addCardPopup.querySelector("#new-card-form");
const placeNameInput = addCardForm.querySelector(
  ".popup__input_type_card-name"
);
const linkInput = addCardForm.querySelector(".popup__input_type_url");

function handleOpenAddCardModal() {
  addCardForm.reset();
  resetValidation(addCardForm, validationConfig);
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

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

imagePopupCloseButton.addEventListener("click", function () {
  closeModal(imagePopup);
});

// --- Cartões ---

const cardsList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

function handleLikeButtonClick(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteButtonClick(event) {
  const cardElement = event.target.closest(".card");
  cardElement.remove();
}

function getCardElement({ name, link }) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  likeButton.addEventListener("click", handleLikeButtonClick);
  deleteButton.addEventListener("click", handleDeleteButtonClick);
  cardImage.addEventListener("click", function () {
    handleImageClick(name, link);
  });

  return cardElement;
}

function renderCard(name, link, container) {
  const cardElement = getCardElement({ name, link });
  container.prepend(cardElement);
}

initialCards.forEach((card) => {
  renderCard(card.name, card.link, cardsList);
});

const popupList = Array.from(document.querySelectorAll(".popup"));

popupList.forEach((popup) => {
  popup.addEventListener("mousedown", handleOverlayClick);
});
