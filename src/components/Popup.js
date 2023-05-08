export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._button = this._popup.querySelector('.button');
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._button.addEventListener('click', () => {
      this.close();
    })

    this._popup.addEventListener('click', (e) => {
      if (e.target === e.currentTarget) {
        this.close();
      }
    })
  }
}
