import { options } from "../utils/constants";
import { createOption } from "../utils/utils";

export default class Form {
  constructor({ formSelector, checkValid, openPopup }) {
    this._form = document.querySelector(formSelector);
    this._dateInput = this._form.querySelector('.form__date-input');
    this._towerSelect = this._form.querySelector('#tower');
    this._floorSelect = this._form.querySelector('#floor');
    this._textarea = this._form.querySelector('.form__textarea');
    this._roomSelect = this._form.querySelector('#room');
    this._submitButton = this._form.querySelector('.form__button-submit');
    this._resetButton = this._form.querySelector('.form__button-reset');
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleReset = this._handleReset.bind(this);
    this._checkValid = checkValid.bind(this);
    this._openPopup = openPopup;
  }

  setOptions() {
    for (let i = 0; i < options.length; i++) {
      createOption(options[i].value, options[i].name, this._towerSelect);
    }

    for (let i = 3; i < 28; i++) {
      createOption(i, `Этаж ${i}`, this._floorSelect)
    }

    for (let i = 1; i < 11; i++) {
      createOption(i, `Переговорка ${i}`, this._roomSelect)
    }
  }

  setMinAndMaxDate() {
    // Устанавливаем завтрашнюю дату в качестве минимальной
    this._today = new Date().toISOString().split('T')[0];
    this._tomorrow = Date.parse(this._today) + 1000 * 60 * 60 * 24;
    this._tomorrowISO = new Date(this._tomorrow).toISOString().split('T')[0];
    this._dateInput.setAttribute('min', this._tomorrowISO);

    // Устанавливаем сегодняшнюю дату + 1 год от нее в качестве максимальной
    this._maxDate = new Date();
    this._maxDate.setFullYear(this._maxDate.getFullYear() + 1);
    this._maxDateISO = this._maxDate.toISOString().split("T")[0];
    this._dateInput.setAttribute('max', this._maxDateISO);
  }

  _handleSubmit(e) {
    e.preventDefault();

    this._formData = new FormData(this._form);
    this._formValues = Object.fromEntries(this._formData.entries());

    console.log(JSON.stringify(this._formValues));

    this._handleReset();

    this._openPopup();

    this._checkValid();
  }

  _handleReset() {
    this._form.reset();
  }

  setEventListeners() {
    this._submitButton.addEventListener('click', this._handleSubmit);
    this._resetButton.addEventListener('click', this._handleReset);

    this._textarea.addEventListener('input', () => {
      this._textarea.style.height = 'auto'
      this._scrollHeight = this._textarea.scrollHeight;
      this._textarea.style.height = this._scrollHeight + 'px'
    })
  }
}
