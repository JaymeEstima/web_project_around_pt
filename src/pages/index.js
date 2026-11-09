import { validationConfig } from "../utils/constants.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForms.js";
import { UserInfo } from "../components/UserInfo.js";
import { api } from "../components/Api.js";
import { PopupWithConfirmation } from "../components/PopupWithConfirmation.js";

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
const profileAvatar = document.querySelector(".profile__image");

const avatarForm = document.querySelector("#avatar-form");

const avatarFormValidator = new FormValidator(
  validationConfig,
  avatarForm,
);

avatarFormValidator.setEventListeners();

const avatarFormPopup = new PopupWithForm(
  "#avatar-popup",
  handleAvatarFormSubmit,
);

avatarFormPopup.setEventListeners();

function handleAvatarFormSubmit(formData) {
  api
    .setUserAvatar({ avatar: formData.avatar })
    .then((userData) => {
      profileAvatar.src = userData.avatar;
      avatarFormPopup.close();
    })
    .catch((error) => {
      console.error("Erro ao atualizar o avatar:", error);
    });
}

profileAvatar.addEventListener("click", () => {
  avatarFormValidator.resetValidation();
  avatarFormPopup.open();
});

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
  api.setUserInfo({
    name: formData.name,
    about: formData.description,
  })
    .then((userData) => {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
      });

      editFormPopup.close();
    })
    .catch((error) => {
      console.error("Erro ao atualizar o perfil:", error);
    });
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
  api.addCard({
      name: formData["place-name"],
      link: formData.link,
    })
    .then((cardData) => {
      const cardElement = createCard(cardData);
      cardSection.addItem(cardElement);

      addCardFormPopup.close();
    })
    .catch((error) => {
      console.error("Erro ao adicionar cartão:", error);
    });
}


addCardFormPopup.setEventListeners();

// --- Elementos: Imagem ampliada ---

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

const deleteCardPopup = new PopupWithConfirmation("#delete-card-popup");
deleteCardPopup.setEventListeners();

let currentUserId;

function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    (name, link) => imagePopup.open(name, link),
    (cardId, cardElement) => {
      deleteCardPopup.setSubmitAction(() => {
        api
          .deleteCard(cardId)
          .then(() => {
            cardElement.remove();
            deleteCardPopup.close();
          })
          .catch((error) => {
            console.error("Erro ao excluir cartão:", error);
          });
      });

      deleteCardPopup.open();
    },
    (cardId, isLiked, updateCard) => {
      api
        .changeLikeCardStatus(cardId, isLiked)
        .then((updatedCard) => {
          updateCard(updatedCard);
        })
        .catch((error) => {
          console.error("Erro ao atualizar curtida:", error);
        });
    },
    currentUserId,
  );

  return card.generateCard();
}


const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardSection.addItem(cardElement);
    },
  },
  ".cards__list",
);

api.getAppInfo()
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      description: userData.about,
    });

    profileAvatar.src = userData.avatar;
    currentUserId = userData._id;

    cardSection.renderItems(cardsData);
  })

  .catch((error) => {
    console.error("Erro ao carregar os dados:", error);
  });

