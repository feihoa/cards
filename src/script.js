
import {Api} from "./js/Api.js";
import {Card} from "./js/Card.js";
import {CardList} from "./js/CardList.js";
import {EditPopup} from "./js/EditPopup.js";
import {FormValidator} from "./js/FormValidator.js";
import {Loader} from "./js/Loader.js";
import {PicPopup} from "./js/PicPopup.js";
import {Popup} from "./js/Popup.js";
import {UserInfo} from "./js/UserInfo.js";


export const mainFunc = (function ()  {

  const api = new Api({
    baseUrl: NODE_ENV === 'development' ? 'http://praktikum.tk/cohort9' : 'https://praktikum.tk/cohort9',
    headers: {
      authorization: '548c5797-a590-40d0-8f9e-48d758ca9ae7',
      'Content-Type': 'application/json'
    }
  });

const card = new Card();
const popup = new Popup(document.querySelector('#formCard'));
const popupPhoto = new Popup(document.querySelector('#photoEdit'));

const picPopup = new PicPopup(document.querySelector('#popupPic'));

const validator = new FormValidator(event);
const editPopup = new EditPopup(document.querySelector('#formEdit'));
const cardList = new CardList(document.querySelector('.places-list'), card);
const userInfo =  new UserInfo();
const loader = new Loader();


api.getUserInfo()
.then ((data) => {

  userInfo.setUserInfo(data.name, data.about);
  userInfo.setUserInfoAvatar(data.avatar);


  document.querySelector('#userInfoName').textContent = userInfo.updateUserInfo().name;
  document.querySelector('#userInfoJob').textContent = userInfo.updateUserInfo().about;
  document.querySelector('#userInfoPic').setAttribute('style', ` background-image: url("${userInfo.updateUserInfoAvatar().avatar}")`);

})

api.getInitialCards()
.then((data) => {
  cardList.render(data)
});



cardList.listeners(api);




document.querySelector('#userInfoButton').addEventListener("click", function () {
  loader.changeStatusBack(document.querySelector('#submitEdit'));

  validator.resetPrevious();
  popup.open();
  validator.listeners();

});



document.querySelector('#userInfoPic').addEventListener("click", function () {
  loader.changeStatusBack(document.querySelector('#submitEditPhoto'));

  validator.resetPrevious();

  popupPhoto.open();
  validator.listeners();
});

document.querySelector('#placesList').addEventListener('click', function () {
  picPopup.popupPicHandler(event);
});

document.querySelector('#userInfoEditButton').addEventListener("click", function () {
  loader.changeStatusBack(document.querySelector('#submitEdit'));

  editPopup.setCurrentValue(userInfo.updateUserInfo().name, userInfo.updateUserInfo().about);
  editPopup.open();
  validator.listeners();

});



document.querySelector('#popupCloseCard').addEventListener("click", function () {
  popup.close()
});

document.querySelector('#closeEditPhoto').addEventListener("click", function () {
  popupPhoto.close()
});

document.querySelector('#popupClosePic').addEventListener("click", function () {
  picPopup.close();
});

document.querySelector('#closeEdit').addEventListener("click", function () {
   editPopup.close()
});



document.forms.edit.addEventListener("submit", function (event) {
  event.preventDefault();

  loader.changeStatus(document.querySelector('#submitEdit'));

  userInfo.setUserInfo(document.querySelector('#inputUserNameEdit'), document.querySelector('#inputUserInfoEdit'));


  api.editProfile(userInfo.updateUserInfo().name, userInfo.updateUserInfo().about)
  .then ((data) => {
    userInfo.setUserInfo(data.name, data.about);

    document.querySelector('#userInfoName').textContent = userInfo.updateUserInfo().name;
    document.querySelector('#userInfoJob').textContent = userInfo.updateUserInfo().about;
    editPopup.close();

  });
});


document.forms.new.addEventListener('submit', function (event) {
   event.preventDefault();
   loader.changeStatus(document.querySelector('#popupSubmit'));

  api.addCard(document.forms.new.elements.inputName.value, document.forms.new.elements.inputLink.value)
   .then((data) => {cardList.addCard(data.name, data.link, data.likes, true, data._id);
  popup.close();

  })

});


document.forms.editPhoto.addEventListener('submit', function (event) {
  event.preventDefault();
  loader.changeStatus(document.querySelector('#submitEditPhoto'));


  userInfo.setUserInfoAvatar(document.querySelector('#inputLinkPhoto').value);

  api.updateAvatar(userInfo.updateUserInfoAvatar().avatar)
  .then((data) => {
    userInfo.setUserInfoAvatar(data.avatar);


    document.querySelector('#userInfoPic').setAttribute('style', ` background-image: url("${userInfo.updateUserInfoAvatar().avatar}")`);
    popupPhoto.close();
  });
});

}());







 /**
 * Здравствуйте.
 * Вы молодцы, что распределили код по классам, у каждого класса должна быть своя
 * обязанность. Класс должен отвечать за одно действие
 *
 * Можно лучше: Старайтесь задавать переменным более понятные названия, чтобы по названию было понятно
 * за что отвечает та или иная переменная, это важно для понимания того за что отвечает переменная.
 *
 * ====================
 *
 * Сейчас у вас добавился новый класс(модуль), неважно, и ваша задача не создавать жесткую связь с другими классами внутри классов
 * Соответственно вам надо пулучать новые карточки, а получать вы можете только передавая сам класс в другие классы, как некое хранилице
  * о котором ничего другие классы не знают.
 * Как пример не более:
 *
 * // Объявляете новый класс
 * const card = new Card(); // это для того чтобы вызывая методы лайка, дизлайка
 *
 *  при инициализации класса CardList вы передаёте в качестве параметров класс card
 *  const cardList = new CardList(document.querySelector(".places-list"), card); // это для того чтобы вызывая методы добавления карточек
 *
 *  Тоже самое с классом Popup, но там только при изменении профиля, функционал добавления  карточки через Popup остаётся
 *  при условии использования класса Card
 *
 * Что надо исправить:
 *
 * - Убрать жесткую связь между классами. Объявление одного класса в другом классе является плохой практикой
 *   программирование. Такие классы тяжело поддерживать. Нельзя удалить и заменить один класс на другой не изменив
 *   часть архитектуры.
 *   Представьте, что ваш класс(CardList) допустим принтер, который печатает бумагу. Вы берёте какие то заготовленные рисунки ( initialCards)
 *   и хотите их нанести на бумагу класс (Card). Вы можете поменять принтер, можете поменять и вставить другую бумагу или какой либо другой рисунок.
 *   Принтер(CardList), бумага(Card) и рисунки( initialCards) ничего не знают друг о друге. Можно поменять любое компонент и ничего не должно поломаться
 *   По такому принципу должен работать любой класс.
 *
 * - Надо исправить: вы обращаетесь в классе к переменным объявленным глобально,
 *   так делать нельзя. Вы можете передать эту переменную в качестве параметров в класс, а потом уже обращаться к ней
 *   Стремитесь к тому чтобы класс у вас был самодостаточным, и не зависел от глобальных переменных или классов
 *   объявленных глобально, а только от тех данных которые были переданны через параметры.
 *   Обращаясь в классе к переменным или функциям объявленым глобально, вы нарушаете один из основных признаков ООП инкапсуляция
 *
 *
 * * Надо исправить: Обращаться в классе на прямую к глобальным переменым,
 * что является очень плохой практикой и грубейшим нарушением ООП
 * Лучшим решением является передачи переменной через метод, в качестве параметров, или при инициализации класса,
 * но если вы будете передавать при инициализации класса, тогда надо лучше передавать как объект
 * На самом деле объявлять переменные вне класса, работая в рамках ООП, тоже плохая практика
 * Класс должен быть самодостаточным и обладать всеми своиствами которые необходимы для работы класса
 *
 * Приведу пример, если же вы всё же объявили переменную вне класса
   const myValue = 'какое значение которое надо передать в класса';
   // Дальше идёт наш класс
   class MyClass {
      constructor(object){
      // здесь мы передаём параметр при инициализации класса
       this.value = object.value;
      }
      setValue(name){
      // здесь мы тоже передаём параметр , но просто перезаписываем переменную, если есть такая необходимость
         this.value = name
      }
     }
   // на практике это выглядит так
    const myExClass = new MyClass({value:myValue})
    // здесь мы перезаписываем нашу переменную.
     myExClass.setValue(name);

    // По сути это является инкапсуляция в ООП. Мы не имеем прямого доступа к  this.value, значение срыто в классе
    // если ваш класс возьмёт другой разработчик к себе в проект и захочет переиспользовать, у него не возникнет проблем
    // или ошибок
     *



 *
 * - Добавьте script.js  который у вас будет как связующий между классами и в
 *  котором по результату должно получиться примерно такое:
         const container = document.querySelector('.places-list');// место куда записывать карточки
         const cards = []; // массив с карточками
         const card = new Card();
         const validation = new FormValidator(words);
         const cardList = new CardList(card);
         cardList.render(container, cards);

         const popupCard = new PopupCard(validation);
         const popupProfile = new PopupProfile(validation);
         const popupImage = new PopupImage();


 *
 * Важный момент :
 * работа принимается только при исправлении всех "Надо исправить" и полностью рабочем функционале
 * Перед тем как отправить работу на приёмку, проверьте на ошибки в консоли, и весь функционал
 *
 *
 */

/**
 * переменная  formEdit в классе UserInfo тоже глобальная, надо убрать
 *
 *
 */

/**
 * Здравствуйте
 * Я видимо пропустил ещё переменную inputUserNameEdit в классе  EditPopup, исправьте пожалуйста до 9 спринта
 * Очень плохо что вы не видите такие переменные и обращаетесь к ним.
 * Работа принимается.
 *
 */

 /**---------------------------------------------------------------------------------------------------------------------------------------------------------
  * ---------------------------------------------------------------------------------------------------------------------------------------------------------


  ***REVIEW** По заданию 9. Резюме.
   Требуемый функционал по взаимодействию с сервером работает.

   Что сделано хорошо.

   1. Методы класса Api имеют правильную структуру - они только отправляют запрос к серверу и возвращают ответ от него (либо объект ошибки).
   2. Обработка ответов от сервера происходит вне  модуля класса Api, в методах then возвращённых из методов Api промисов.
   3. При сабмите формы профиля, информация на странице обновляется только после получения ответа от сервера и из объекта ответа
   сервера. Форма закрывается после обработки ответа от сервера.
   4. Работает дополнительный функционал.


   Что надо исправить.

   I. Устранить лишние обращения к серверу.

   Лишнее обращение происходит в частности и потому, что Вы вызываете метод Api, например, editProfile, в script.js, а затем при обработке
   его результата  в методе then вызываете метод userInfo.setUserInfo, где так же обращаетесь к серверу.

   Поэтому предлагаю следующую схему исправления указанной выше ошибки:

   а) Обращения к серверу делать только в модуле script.js и только с помощью методов класса Api. Данные, возвращённые в результате этих запросов,
   обрабатывать в методе then, вызывая в нём методы других классов проекта, но в которых уже не будет обращения к серверу.

   б). Преобразовать методы класса UserInfo - убрать из них обращение к серверу. Кроме устранения лишних обращений к серверу, это
   обеспечит выполнение принципа ООП об единственной ответственности методов класса UserInfo:

   - метод setUserInfo должен сохранять в свойствах класса актуальную информацию о профиле (name, about) и больше ничем заниматься не должен,
    то есть у setUserInfo должны быть параметры name, about - setUserInfo(name, about); (Предлагаю не вводить в setUserInfo параметр avatar,
    вопрос об обработке свойства avatar из объекта, полученного от сервера, и внедрению фото на страницу при загрузке, решите, пожалуйста,
    на своё усмотрение - возможно, в тот же класс UserInfo нужно ввести специальные методы для обработки аватара и вызывать их там где нужно,
    и когда нужно).

    - метод updateUserInfo должен брать эти свойства и возвращать их, например, как свойства объекта, для того, чтобы эта информация
   была использована там, где надо, и когда надо. У updateUserInfo может не быть никаких параметров:

   updateUserInfo() {
       return {
            name: this.name,
            about: this.about
       }
    }

   в) Теперь рассмотрим вопрос откуда и в каких случаях метод класса UserInfo setUserInfo должен брать актуальную информацию о пользователе,
   чтобы сохранить её в свойствах класса, то есть где он должен вызываться:

      1. setUserInfo должен вызываться при загрузке страницы при получении с сервера данных о пользователе, то есть в script.js так:

      api.getUserInfo()
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about)
           .
           .
           .

      });

      2. setUserInfo должен вызываться в слушателе сабмита формы профиля, я думаю, два раза:
      сначала до обращения  к серверу, чтобы сохранить в свойствах класса информацию о профиле, полученную из полей формы профиля,
      чтобы её можно было передать в параметры запроса методом PATCH;
      затем после обращения к серверу, чтобы сохранить в свойствах класса поля name и about объекта, который вернул сервер в результате
      запроса методом PATCH.


    г)  Теперь рассмотрим вопрос где и в каких случаях метод класса UserInfo updateUserInfo должен вызываться, чтобы вернуть актуальную информацию
    о пользователе, чтобы её можно было использовать каким-либо образом:

      1. updateUserInfo должен вызываться при загрузке страницы при получении с сервера данных о пользователе, после метода userInfo.setUserInfo,
      то есть в script.js так:

      api.getUserInfo()
      .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        userInfo.updateUserInfo();

        внедрение на страницу актуальных данных об имени и деятельности профиля из объекта,
        который вернул метод userInfo.updateUserInfo;

        обработка данных об аватаре, полученных с сервера и внедрение на страницу фото аватара;

      });

      2. updateUserInfo должен вызываться в слушателе сабмита формы профиля, я думаю, так:
      сначала при обращении к серверу, чтобы венрнуть информацию о профиле, полученную из полей формы профиля методом setUserInfo,
      чтобы её можно было передать в параметры запроса методом PATCH;
      затем после обращения к серверу, чтобы венрнуть информацию о профиле, сохранённую методом setUserInfo, чтобы её можно было внедрить
      в элементы страницы.

      Таким образом, слушатель события submit формы профиля должен примерно выглядеть так:

      document.forms.edit.addEventListener("submit", function (event) {
         event.preventDefault();
         loader.changeStatus(document.querySelector('#submitEdit'));
         userInfo.setUserInfo(document.querySelector('#inputUserNameEdit'), document.querySelector('#inputUserInfoEdit'));
         api.editProfile(userInfo.updateUserInfo().name, userInfo.updateUserInfo().about)
          .then((data) => {
            userInfo.setUserInfo(data.name, data.about);
            userInfo.updateUserInfo();

            внедрение на страницу актуальных данных об имени и деятельности профиля из объекта,
            который вернул метод userInfo.updateUserInfo;

            закрытие формы профиля;
          });
      });


      3. updateUserInfo должен обязательно вызываться в слушателе открытия формы профиля, чтобы возвращаемый им объект
       с актуальными данными об имени и деятельности профиля, мог быть внедрён в поля формы профиля.


  II. По такому же образу и подобию, как расписано выше, сделать и рендер на страницу карточек при загрузке страницы:

     а) Обращения к серверу для получения массива карточек делать только в модуле script.js и только с помощью метода класса Api.
      Данные, возвращённые в результате этого запроса обрабатывать в методе then, вызывая в нём метод render класса CardList, но в котором
      уже не будет обращения к серверу.

     б) Преобразовать метод render - убрать из него обращение к серверу, это обеспечит выполнение принципа ООП об единственной ответственности метода.
  *
  *
  *
  *  P.S. Прошу отнестись к моему развёрнутому ревью творчески, так как трудно описать что-то по преобразованию чужого кода без какких-либо неточностей,
  * но Вы знаете свой код, поэтому, я думаю, вникнув в идеи, которые, я как ревьюер предлагаю Вам осуществить, Вы сможете применить эти необходимые идеи
  * к преобразованию своего кода, и это будет вполне выполнимо и Вы получите красивый работающий проект.
  *
  *
  *
  *__________________________________________________________________________________________________________________________________________________
  *
  * **REVIEW2** По заданию 9. Резюме2.
  *
  * Что стало хорошо.
  * 1. Вы преобразовали структуру методов, обрабатывающих ответы от сервера, теперь она стала правильной.
  *
  * 2. Форма профиля при открытии во всех случаях имеет валидный вид.
  *
  * Что можно лучше.
  * 1. Лучше для обновления данных name и about о пользователе вне класса UserInfo использовать метод UserInfo updateUserInfo,
  * для чего он и предназначен, а не просто свойства name и about класса.
  *
  * 2. Для возвращения и обновления аватара вне класса UserInfo ввести специальный метод, а из updateUserInfo возвращение
  * аватара убрать.
  *
  * Что нужно исправить.
  * 1. Не создавать в слушателях событий "submit" форм новых экземпляров классов (подробные комментарии смотрите в этих слушателях).
  *
  *
  *
  * **REVIEW3** По заданию 9. Резюме3.
  *
  * Хорошая работа.
  *
  * Критические ошибки по заданию 9 исправлены. Рекомендации выполнены.
  *
  *
  * Что можно лучше.
  *
  *1. Не рекомендуется осуществлять в классах поиск элементов размётки с помощью querySelector в document. Это делает класс очень зависимым от
  * существующей размётки. Если размётка изменится, даже незначительно, например в ней появится ещё элемент с таким же селектором,
  * то проект может начать работать неправильно, и в очень большом проекте будет непросто найти причину неправильной работы.
  * Самое большее, что допускается в классах - искать элементы с помощью querySelector не в document, а в контейнере элементов, который
  * в класс передаётся через параметр класса. Например, Вы передаёте в конструктор класса параметр form, тогда в form Вы можете находить поля ввода,
  * элементы с сообщениями об ошибках и т.д., т.е. вместо document.querySelector(...) Вы сможете написать form.querySelector(...).
  *
  * 2. Не допускается повторно определять элементы размётки в классах, когда Вы их уже определили в точке входа проекта script.js.
  * Такие элементы надо передавать в конструктор класса как параметры.
  *
  *Задание принято.
  *
  *
  */



