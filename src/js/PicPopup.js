class PicPopup extends Popup {
    constructor(elem) {
      super(elem);
  
    }
    popupPicHandler(event) {
      this.event = event;
      
      const popupPicOpen = document.querySelector('#popupPicOpen')
  
      if (event.target.classList.contains('place-card__image')) {
        // Надо исправить: вы обращаетесь в классе к переменной объявленной глобально.
        // передайте переменную в качестве параметров в класс 
        this.open();
        const popupLink = event.target.closest('.place-card__image').getAttribute('style');
  
        popupPicOpen.setAttribute('src', `${popupLink.replace('background-image: url(', '').replace(')', '')}`);
      }
  
    }
  }

