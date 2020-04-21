class CardList {
    constructor(container, card) {
        this.card = card;
        this.container = container;

    }

    addCard(cardName, cardImage, cardLike, canDel, id) {

        this.container.insertAdjacentHTML('beforeend', this.card.create(cardName, cardImage, cardLike, canDel, id));
    }
    listeners(api) {
        this.container.addEventListener('click', event => {
            
            this.card.like(event, api);
        });

        this.container.addEventListener('click', event => {
            this.card.remove(event, api)
        });
    }

    render(data) {
        this.data = data;
        let id ;
       return  data.forEach(elem => {
            let canDel;
            id = elem._id;
            if (elem.owner._id == '981c6a4012de8f86661526e3'){
                canDel = true;
            }else{
                canDel = false;
            }

            this.addCard(elem.name, elem.link, elem.likes, canDel, elem._id); 
        })
    }
} 
