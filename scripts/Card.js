export class Card {
  constructor({ name, link }, templateSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }
  
    _getTemplate() {
        const cardTemplate = document
        .querySelector(this._templateSelector)
        .content.querySelector(".card")
        .cloneNode(true); 
        return cardTemplate;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._cardImage = this._element.querySelector(".card__image");
        this._cardTitle = this._element.querySelector(".card__title");
        this._likeButton = this._element.querySelector(".card__like-button");
        this._deleteButton = this._element.querySelector(".card__delete-button");

        this._cardImage.src = this._link;
        this._cardImage.alt = this._name;
        this._cardTitle.textContent = this._name;

        this._setEventListeners();
        return this._element;
    }

    _handleLikeButtonClick() {
        this._likeButton.classList.toggle("card__like-button_is-active");
    }

    _handleDeleteButtonClick() {
        this._element.remove();
    }

    _setEventListeners() {
        this._likeButton.addEventListener("click", () => this._handleLikeButtonClick());
        this._deleteButton.addEventListener("click", () => this._handleDeleteButtonClick());
        this._cardImage.addEventListener("click", () => this._handleImageClick(this._name, this._link));
    }
}
