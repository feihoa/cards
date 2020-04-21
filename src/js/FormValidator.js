
class FormValidator {

  handleValidate(event) {
    this.event = event;
    this.resetError(event.target);
    this.validate(event.target);
    let errorMessage = '';

  }

  showErrorMessage(element) {
    this.errorMessage = this.handleValidate.errorMessage;
    this.element = element;

    if (element.value.length === 0) {
      this.errorMessage = 'Это обязательное поле';
    }
    else if (element.value.length === 1 && element.id !== document.querySelector('#inputLink').id && element.id !== document.querySelector('#inputLinkPhoto').id) {
      this.errorMessage = 'Должно быть от 2 до 30 символов';
    }
    else if ((element.id === document.querySelector('#inputLink').id ||  element.id === document.querySelector('#inputLinkPhoto').id) && !element.value.includes('//')) {
      this.errorMessage = 'Здесь должна быть ссылка';
    } else {
      this.errorMessage = '';
    }
  }
  // Состояние кнопки
  inputChecker(but) {
    this.but = but;
    if (but != undefined) {
      if (document.querySelector(`#error-inputName`).textContent == '' && document.querySelector(`#error-inputLink`).textContent == '' && document.querySelector(`#error-inputLinkPhoto`).textContent == '' &&
        document.querySelector(`#error-inputUserNameEdit`).textContent == '' && document.querySelector(`#error-inputUserInfoEdit`).textContent == '') {
        if ((but.id != document.querySelector('#popupSubmit').id && but.id != document.querySelector('#submitEditPhoto').id)  || (but.id == document.querySelector('#popupSubmit').id && document.querySelector('#inputLink').value != '' && document.querySelector('#inputName').value != '') ||
        (but.id == document.querySelector('#submitEditPhoto').id && document.querySelector('#inputLinkPhoto').value != '')) {

          but.removeAttribute('disabled');
          but.classList.add('button__active');
        }

      } else {

        but.setAttribute('disabled', true);
        but.classList.remove('button__active');

      }
    }
  }

  // Сброс
  resetPrevious() {
    const inputName = document.querySelector('#inputName')


    const errorElementN = document.querySelector(`#error-${inputName.id}`);
    const errorElementL = document.querySelector(`#error-${inputLink.id}`);

    document.querySelector('#inputLinkPhoto').value = "";
    document.querySelector('#error-inputLinkPhoto').textContent = "";


    const popupBut = document.querySelector('#popupSubmit');

    errorElementN.textContent = "";
    errorElementL.textContent = "";

    // Надо исправить: вы обращаетесь в классе к переменной объявленной глобально.
    // передайте переменную в качестве параметров в класс
    document.querySelector('#inputLink').value = "";
    document.querySelector('#inputName').value = "";

   document.querySelector('#submitEditPhoto').setAttribute('disabled', true);
   document.querySelector('#submitEditPhoto').classList.remove('button__active');


    // Надо исправить: вы обращаетесь в классе к переменной объявленной глобально.
    // передайте переменную в качестве параметров в класс
    popupBut.setAttribute('disabled', true);
    popupBut.classList.remove('button__active');

  }


  // Проверка введенных данных
  validate(element) {
    this.element = element;
    this.errorMessage = this.handleValidate.errorMessage;

    const errorElement = document.querySelector(`#error-${element.id}`);

    if (errorElement !== null) {
      this.inputChecker;

      if (!element.checkValidity()) {

        this.showErrorMessage(element)
        errorElement.textContent = this.errorMessage;
        return false;

      } else {
        errorElement.textContent = '';
        return true;

      }
    }

  }
  // Сброс сообщения об ошибке
  resetError(element) {
    this.errorMessage = this.handleValidate.errorMessage;

    element.textContent = '';
    this.errorMessage = '';
  }

  listeners() {
    document.forms.new.addEventListener("input", event => {
      this.handleValidate(event);
      this.inputChecker(document.querySelector('#popupSubmit'));

    });

    document.forms.edit.addEventListener("input", event => {
      this.handleValidate(event);
      this.inputChecker(document.querySelector('#submitEdit'));

    });

    document.forms.editPhoto.addEventListener("input", event => {
      this.handleValidate(event);
      this.inputChecker(document.querySelector('#submitEditPhoto'));

    });

  }
}


