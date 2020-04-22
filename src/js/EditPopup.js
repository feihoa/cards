import {Popup} from "./Popup.js";

export class EditPopup extends Popup {
  constructor(elem) {
    super(elem);

  }
  setCurrentValue(name, about) {

    document.querySelector('#submitEdit').removeAttribute('disabled', true);
    document.querySelector('#submitEdit').classList.add('button__active');

    const errorInputUserNameEdit = document.querySelector('#error-inputUserNameEdit');
    const errorInputUserInfoEdit = document.querySelector('#error-inputUserInfoEdit');

    document.querySelector('#inputUserNameEdit').value = name;
    document.querySelector('#inputUserInfoEdit').value = about;

    errorInputUserNameEdit.textContent = '';
    errorInputUserInfoEdit.textContent = '';
  }
}

