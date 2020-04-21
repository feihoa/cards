class Card {
  constructor(cardName, cardImage) {
    this.cardName = cardName;
    this.cardImage = cardImage;

  }

  like(event, api) {
    if (event.target.classList.contains('place-card__like-icon')) {
      if(!event.target.classList.contains('place-card__like-icon_liked')){
        const card = event.target.closest('.place-card');

        api.likeCard(card.id)
        .then((data)  => {return card.querySelector('.place-card__like-number').textContent  = data.likes.length} );
                event.target.classList.add('place-card__like-icon_liked')

    }else{

      const card = event.target.closest('.place-card');
      api.deleteLike(card.id)
      .then((data)  => {return card.querySelector('.place-card__like-number').textContent  = data.likes.length} );
      event.target.classList.remove('place-card__like-icon_liked')
      
     }
    } 
  }

  remove(event, api) {
    if (event.target.classList.contains('place-card__delete-icon')) {

      if (window.confirm("Вы действительно хотите удалить эту карточку?")) { 

        const card = event.target.closest('.place-card');
        api.deleteCard(card.id)
        .then(document.querySelector('#placesList').removeChild(card));
      }
    }
  }

  create(cardNameValue, cardImageValue, cardLike, canDel, id) {

    this.cardLike = cardLike;
    this.canDel = canDel;
    this.id = id;

    let del = '';
    let liked = '';

    if(canDel){
      del = '<button class="place-card__delete-icon"></button>';
    };

    cardLike.forEach(function (elem) {
      if (elem._id == '981c6a4012de8f86661526e3'){
        liked = 'place-card__like-icon_liked';

      };
  });
  
    return `<div class="place-card" id=${id}>
    <div class="place-card__image" style="background-image: url(${cardImageValue})">
    ${del}
    </div>
    <div class="place-card__description">
      <h3 class="place-card__name">${cardNameValue}</h3>
      <div class="place-card__like-box">
      <button class="place-card__like-icon ${liked}"></button>
      <span class="place-card__like-number">${cardLike.length}</span>
      </div>
    </div>
  </div>
  `
  }
}

