class Api {
    constructor(options) {
      this.options = options;
    }
  
    getInitialCards() {
      return  fetch( this.options.baseUrl + '/cards', {
          headers : this.options.headers,
        })
      .then((res) => {
          if (res.ok) {
            return res.json();
          }
      
              return Promise.reject(` ${res.status}`);
        })
        .then((data) => {  
          return data;
        })                  
        .catch((err) => {
          console.log(err); 
        })

    }
 

    getUserInfo(){
      return  fetch(this.options.baseUrl + '/users/me', {
        headers : this.options.headers,
      })
      .then((res) => {
          if (res.ok) {
            return res.json();
          }
      
              return Promise.reject(` ${res.status}`);
        })
        .then((data) => {

          return data;
        })                  
        .catch((err) => {
          console.log(err); 
        });

    }

    editProfile(name, about){
      this.name = name.value;
      this.about = about.value;

    return fetch(this.options.baseUrl + '/users/me', {
          method: 'PATCH',
          body: JSON.stringify({
            name: `${this.name}`,
            about: `${this.about}`
          }),
          headers: 
              this.options.headers,
      })
      .then((res) => {
          if (res.ok) {
            return res.json();
          }
      
              return Promise.reject(` ${res.status}`);
        })
        .then((data) => {

          return data;
        })                  
        .catch((err) => {
          console.log(err); 
        })
    }

    addCard(name, link){
        this.name = name;
        this.link = link;
      return  fetch(this.options.baseUrl + '/cards', {
            method: 'POST',
            body: JSON.stringify({
              name: `${this.name}`,
              link: `${this.link}`
            }),
            headers: 
                this.options.headers,
        })
            .then((res) => {
                if (res.ok) {
                  return res.json();
                }
            
                    return Promise.reject(` ${res.status}`);
              })
              .then((data) => {
                return data;
              })                  
              .catch((err) => {
                console.log(err); 
              })
            
    };
   
    
    deleteCard(id){
        this.id = id;
      return  fetch(this.options.baseUrl + '/cards/' + id, {
            method: 'DELETE',
            headers:  
                this.options.headers,
        })
        .then((res) => {
            if (res.ok) {
              return res.json();
            }
        
                return Promise.reject(` ${res.status}`);
          })
          .then((data) => {
            return data;
          })                  
          .catch((err) => {
            console.log(err); 
          });  
        
    }
    likeCard(id){
      return  fetch(this.options.baseUrl + '/cards/like/' + id, {
            method: 'PUT',
            headers:  
                this.options.headers,
        })
        .then((res) => {
            if (res.ok) {
              return res.json();
            }
        
                return Promise.reject(` ${res.status}`);
          })
          .then((data) => {
            return data;
          })                  
          .catch((err) => {
            console.log(err); 
          });  
        
    }
    deleteLike(id){
        return  fetch(this.options.baseUrl + '/cards/like/' + id, {
              method: 'DELETE',
              headers:  
                  this.options.headers,
          })
          .then((res) => {
              if (res.ok) {
                return res.json();
              }
          
                  return Promise.reject(` ${res.status}`);
            })
            .then((data) => {
              return data;
            })                  
            .catch((err) => {
              console.log(err); 
            });  
          
      }
    updateAvatar(link){
      this.link = link;
      return  fetch(this.options.baseUrl + '/users/me/avatar', {
        method: 'PATCH',
        body: JSON.stringify({
          avatar: `${this.link}`,
        }),
        headers: 
            this.options.headers,
    })
      .then((res) => {
          if (res.ok) {
            return res.json();
          }
      
              return Promise.reject(` ${res.status}`);
        })
        .then((data) => {
          return data;
        })                  
        .catch((err) => {
          console.log(err); 
        })
    }
  
    // другие методы работы с API
  }

