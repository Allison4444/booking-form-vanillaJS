import './index.css';
import Popup from '../components/Popup';
import Form from '../components/Form';
import FormValidator from '../components/FormValidator';
import { formValidationConfig } from '../utils/constants';

const formValidation = new FormValidator(formValidationConfig, '.form');
formValidation.enableValidation();

const popupWithSuccessInfo = new Popup('.page__popup-success');
popupWithSuccessInfo.setEventListeners();

const bookingForm = new Form({
  formSelector: '.form',
  checkValid: formValidation.resetValidation,
  openPopup: () => {
    popupWithSuccessInfo.open();
  }
});
bookingForm.setEventListeners();
bookingForm.setOptions();
bookingForm.setMinAndMaxDate();
