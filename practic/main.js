'use strict'
window.addEventListener('DOMContentLoaded', shop);

function shop() {
    const imgUrl = document.querySelector('#imgUrl');
    const price = document.querySelector('#price');
    const desk = document.querySelector('#desk');
    const id = document.querySelector('#id');
    const btn = document.querySelector('#btn');
    const btnСreate = document.querySelector('#btnCreate');
    const par = document.querySelector('.par');
    const allInput = document.querySelectorAll('.input');
    const addItem = document.querySelector('.allInput');
    const catalog = document.querySelector('.catalog')
    const headerCatalog = catalog.querySelector('.headerCatalog');
    const btnAdd = document.querySelector('#btnAdd');
    const closeAddMenu = document.querySelector('#closeAddMenu');
    const goToBasket = document.querySelector('#goToBasket');
    const basket = document.querySelector('.basket');
    const closeBasket = document.querySelector('.closeBasket');
    const message = document.querySelector('.message ');
    const basketPar = message.nextElementSibling;
    const total = basketPar.nextElementSibling;
    
    let totalPrice = 0;

    /*шаблон
    {
    imgUrl: "",
    price:  "",
    desk:   "",
    id :    "",
    }
    */


    let arr = [

        {
            imgUrl: "img/lgmw.jpg",
            price: "250$",
            desk: "Отличительная особенность микроволновок LG – удивительно точный подбор нужной мощности.",
            id: "mw01",
        },


        {
            imgUrl: "img/horizont.jpeg",
            price: '300$',
            desk: "LCD-телевизор с диагональю экрана 55 дюймов, Ultra HD разрешением и функцией SMART-TV",
            id: "tv01",
        },

        {
            imgUrl: "img/atlant.jpg",
            price: '500$',
            desk: "Однокамерный холодильник с дисплеем, электронное управление, зона свежести, класс A+",
            id: "fr01",
        },
        {
            imgUrl: "img/midea.jpeg",
            price: "150$",
            desk: "25-литров объёма. Нержавейка внутри и снаружи. Местный производитель и гарантия",
            id: "mw02",
        },
        {
            imgUrl: "img/frindesit.jpg",
            price: "500$",
            desk: "Мощность, оснащение, размер.Цена.",
            id: "fr02",
        }, {
            imgUrl: "img/tvsams.jpg",
            price: "800$",
            desk: "Мощность, оснащение, размер.Цена.",
            id: "tv02",
        },
    ];
    let basketArr = [];
    //События
    btn.addEventListener('click', createAndPush);
    btnAdd.addEventListener('click', openAddItem);
    closeAddMenu.addEventListener('click', closeAddItem);
    btnCreate.addEventListener('click', createCard);
    headerCatalog.addEventListener('click', sortCatalog);
    par.addEventListener('click', addInBasket);
    goToBasket.addEventListener('click', openBasket);
    closeBasket.addEventListener('click', exitBasket);


    function createAndPush() {
      let objVal = {};
      allInput.forEach(input => {
        objVal[input.id] = input.value;
      });
      Object.keys(objVal).some(el => {
        allInput.forEach(input => {
          if (!objVal[el]) {
            input.id === el && toggleClas(input, 'red');
            console.log('Заполните все поля')
          } else {
            input.id === el && toggleClas(input, 'red', false);
          }
        });
      });
      if(Object.values(objVal).every(val => val.length > 0)){
        arr.push(objVal);
        clearForm();
      }
    }


  function toggleClas(elem, name, toggle = true) {
     toggle ? elem.classList.add(name) : elem.classList.remove(name);
  }


    /*function createAndPush() {
        let obj = {}; // Доделать!!!!!
        obj.imgUrl =  imgUrl.value;
        obj.price = price.value + '$';
        obj.desk = desk.value;
        obj.id = id.value;
        console.log(obj)
        arr.push(obj);
        setTimeout(() => clearForm(), 1000);
    }*/

    function clearForm() {
        allInput.forEach(el => {
            el.value = ''
            el.classList.contains('required') && el.classList.remove('required');
        });
    }

    function openAddItem() {
        addItem.classList.add('allInputActive');
    }

    function closeAddItem() {
        addItem.classList.remove('allInputActive');
    }
    //рендер функция карточек на страницу
    function createCard() {
        arr.forEach(elem => createElem(elem, par));
        catalog.classList.add('catalogActive');
    }
    //функция создания карточки
    function createElem(el, parent) {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.id = el.id;
        let wrapperImg = document.createElement('div');
        wrapperImg.classList.add('wrapperImg');
        let img = document.createElement('img');
        img.src = el.imgUrl;
        let price = document.createElement('div');
        price.classList.add('price');
        price.textContent = el.price;
        let desk = document.createElement('p');
        desk.classList.add('desk');
        desk.textContent = el.desk
        let btnBasket = document.createElement('button');
        btnBasket.classList.add('btnBasket');
        btnBasket.textContent = 'В корзину'
        wrapperImg.append(img);
        card.append(wrapperImg);
        card.append(price);
        card.append(desk);
        card.append(btnBasket);
        parent.append(card);
    }
    //переменная  allCards  создана в локальной области видимости для, того чтобы получить NodeList после его рендеринга
    function sortCatalog(e, ) {
        let self = e.target;
        let allCards = document.querySelectorAll('.card');
        self.classList.contains('sortUp') && sortCol(par, allCards, 'data-id');
        self.classList.contains('sortLow') && sortCol(par, allCards, 'data-id', false);
        self.classList.contains('closeCatalog') && clearCatalog(allCards, 'catalogActive');
    }
    //функция сортировки HTML коллекции
    function sortCol(parent, collection, data, type = true) {
        let arr = [...collection];
        type ? arr.sort((a, b) => a.getAttribute(data).charCodeAt() - b.getAttribute(data).charCodeAt()) : arr.sort((a, b) => b.getAttribute(data).charCodeAt() - a.getAttribute(data).charCodeAt());
        let output = "";
        arr.forEach(el => output += el.outerHTML);
        return parent.innerHTML = output;
    }
    //функция очищающая каталог после его закрытия, для избнжания дублирования элементов
    function clearCatalog(collection, activeClass) {
        catalog.classList.remove(activeClass);
        setTimeout(() => collection.forEach(el => el.remove()), 1000);
    }
    //добавление товара в массив корзины
    function addInBasket(e) {
         e.target.classList.contains('btnBasket') 
        ? goToBasket.nextElementSibling.textContent = `: ${basketArr.length +1}`
        : false;
        let sKey = e.target.parentElement.classList.contains('card') && e.target.classList.contains('btnBasket') ? e.target.parentElement.dataset.id : false;
        if (sKey) {
            arr.forEach(obj => Object.values(obj).forEach(val => val === sKey ? basketArr.push(obj) : false));
            return basketArr;
        }
        return;
    }
    
    function openBasket(){
      catalog.classList.remove('catalogActive');
      basket.classList.add('basketActive');
      message.textContent = `${!!basketArr.length ? '' : 'Корзина пуста'}`;
      if(!!basketArr.length){  
        renderBasket();
        basketArr.forEach(el => totalPrice += parseInt(el.price.slice(0, -1)))
        total.textContent = totalPrice > 0 ? 'Общая сумма ' + totalPrice +  '$' : "";
      }
      
    }
    function exitBasket() {
      catalog.classList.add('catalogActive');
      basket.classList.remove('basketActive');
      let allCardsBasket = basketPar.querySelectorAll('.card');
     setTimeout(() => {
       allCardsBasket.forEach(el => 
        el.remove());
       totalPrice = 0;
     }, 1000);
  
    }
    
    function renderBasket(){
      basketArr.forEach(el => createElem(el, basketPar));
    }
}


// clearcatalog => exit basket 