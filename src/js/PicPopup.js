import {Popup} from "./Popup.js";

export class PicPopup extends Popup {
    constructor(elem) {
      super(elem);
  
    }
    popupPicHandler(event) {
      this.event = event;
      
      const popupPicOpen = document.querySelector('#popupPicOpen')
  
      if (event.target.classList.contains('place-card__image')) {
        this.open();
        const popupLink = event.target.closest('.place-card__image').getAttribute('style');
  
        popupPicOpen.setAttribute('src', `${popupLink.replace('background-image: url(', '').replace(')', '')}`);
      }
  
    }
  }

