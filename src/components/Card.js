export class Card {
  constructor(
    { name, link, _id, isLiked, owner },
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    currentUserId,
  ) {
    this._name = name;
    this._link = link;
    this._id = _id;
    this._isLiked = isLiked;
    this._ownerId = owner;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._currentUserId = currentUserId;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _renderLikeState() {
    this._likeButton.classList.toggle(
      "card__like-button_is-active",
      this._isLiked,
    );
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

    this._renderLikeState();

    if (this._ownerId !== this._currentUserId) {
      this._deleteButton.remove();
    }

    this._setEventListeners();
    return this._element;
  }

  _handleLikeButtonClick() {
    this._handleLikeClick(this._id, !this._isLiked, (updatedCard) => {
      this._isLiked = updatedCard.isLiked;
      this._renderLikeState();
    });
  }

  _handleDeleteButtonClick() {
    this._handleDeleteClick(this._id, this._element);
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () =>
      this._handleLikeButtonClick(),
    );
    this._deleteButton.addEventListener("click", () =>
      this._handleDeleteButtonClick(),
    );
    this._cardImage.addEventListener("click", () =>
      this._handleCardClick(this._name, this._link),
    );
  }
}
