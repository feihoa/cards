class Loader{
   
    changeStatus(button){
        this.button = button;
        this.button.textContent = 'Загрузка...';
    }
   
    changeStatusBack(button){
        this.button = button;

        this.button.textContent = 'Сохранить';
        document.querySelector('#popupSubmit').textContent = '+';
    }

}

