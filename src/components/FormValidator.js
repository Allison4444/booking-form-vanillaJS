export default class FormValidator {
  constructor(config, form) {
    this._config = config;
    this._form = document.querySelector(`${form}`);
    this._button = this._form.querySelector('.form__button-submit');
    this._inputList = Array.from(this._form.querySelectorAll(
      `${this._config.selectSelector},
      ${this._config.inputDateSelector},
      ${this._config.inputTimeSelector},
      ${this._config.textareaSelector}`
    ));
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._startTimeInput = this._form.querySelector(config.startTimeSelector);
    this._endTimeInput = this._form.querySelector(config.endTimeSelector);
  }

  // Забронировать  переговорную кмнату можно только с 09:00 до 21:00
  _isTimeValid(time) {
    this._hours = parseInt(time.split(':')[0]);
    this._minutes = parseInt(time.split(':')[1]);

    return this._hours >= 9 && this._hours < 21 || (this._hours === 21 && this._minutes === 0);
  }

  // Функция, которая проверяет что бы минимальное время бронирования было не меньше 1 часа и выбранный диапазон времени был с с 09:00 до 21:00
  _checkDateTimeValidity() {
    this._startTime = new Date(`2023-01-01T${this._startTimeInput.value}:00`);
    this._endTime = new Date(`2023-01-01T${this._endTimeInput.value}:00`);
    this._diffInMs = this._endTime - this._startTime;
    this._diffInHours = this._diffInMs / (1000 * 60 * 60);

    if ((this._diffInHours < 1) || (!this._isTimeValid(this._startTimeInput.value) || !this._isTimeValid(this._endTimeInput.value))) {
      this._showInputError(this._endTimeInput, 'Интервал времени должен быть не меньше 1 часа. Доступное время для бронирования: c 09:00 до 21:00');
      this._isDateTimeValid = false;
    } else {
      this._hideInputError(this._endTimeInput);
      this._isDateTimeValid = true;
    }
  }

  _showInputError(inputElement, errorMessage) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    this._errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    this._errorElement.classList.remove(this._errorClass);
    this._errorElement.textContent = '';
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }

    if (inputElement === this._startTimeInput || inputElement === this._endTimeInput) {
      this._checkDateTimeValidity();
    }
  }

  _toggleButtonState(buttonElement) {
    this._isValid = this._inputList.every((input) => input.validity.valid);
    if (this._isValid && this._isDateTimeValid) {
      buttonElement.classList.remove(this._inactiveButtonClass);
      buttonElement.disabled = false;
    } else {
      buttonElement.classList.add(this._inactiveButtonClass);
      buttonElement.disabled = true;
    }
  }

  _setEventListeners() {
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(this._buttonElement);
      });
    });

    this._toggleButtonState(this._buttonElement);
  }

  enableValidation() {
    this._setEventListeners();
  }

  resetValidation = () => {
    this._toggleButtonState(this._button);
  }
}


