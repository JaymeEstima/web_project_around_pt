const initialCards = [ 
    {
        name: "Yosemite Valley",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg"
    },
    {
        name: "Lago Louise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg"
    },
    {
        name: "Montanhas Carecas",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg"
    },
    {
        name: "Parque Nacional da Vanoise",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg"
    }
];

initialCards.forEach((card) => {
    console.log(card.name);
});

function openModal(modal){
    modal.classList.add("popup_is-opened");
}

function closeModal(modal){
    modal.classList.remove("popup_is-opened");
}

const editPopup = document.querySelector("#edit-popup");
const editPopupCloseButton = editPopup.querySelector(".popup__close");
const editForm = editPopup.querySelector("#edit-profile-form");
const nameInput = editForm.querySelector(".popup__input_type_name");
const descriptionInput = editForm.querySelector(".popup__input_type_description");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const editButton = document.querySelector(".profile__edit-button");

function fillProfileForm(){
    nameInput.value = profileTitle.textContent;
    descriptionInput.value = profileDescription.textContent;
}

function handleOpenEditModal() {
    fillProfileForm();
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