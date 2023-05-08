const formValidationConfig = {
  formSelector: '.form',
  selectSelector: '.form__select',
  inputDateSelector: '.form__date-input',
  inputTimeSelector: '.form__time-input',
  textareaSelector: '.form__textarea',
  submitButtonSelector: '.form__button-submit',
  startTimeSelector: '#start-time',
  endTimeSelector: '#end-time',
  dateTimeErrorSelector: '.date-time-error',
  inactiveButtonClass: 'button_disabled',
  inputErrorClass: 'form_type_error',
  errorClass: 'form__error_visible'
};

const options = [
  { value: 'A', name: 'Башня А' },
  { value: 'B', name: 'Башня Б' }
];

export { formValidationConfig, options }
