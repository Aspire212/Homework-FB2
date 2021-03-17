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


    function createAndPush() {
        let obj = {}; // Доделать!!!!!

        obj.imgUrl = imgUrl.value;
        obj.price = price.value;
        obj.desk = desk.value;
        obj.id = id.value;
        Object.values(obj)//!
        arr.push(obj);
        setTimeout(() => clearForm(), 1000);
    }

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
        arr.forEach(elem => createElem(elem));
        catalog.classList.add('catalogActive');
    }
    //функция создания карточки
    function createElem(el) {
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
        par.append(card);
    }
    //переменная  allCards  создана в локальной области видимости для, того чтобы получить NodeList после его рендеринга
    function sortCatalog(e) {
        let self = e.target;
        const allCards = document.querySelectorAll('.card');
        self.classList.contains('sortUp') && sortCol(par, allCards, 'data-id');
        self.classList.contains('sortLow') && sortCol(par, allCards, 'data-id', false);
        self.classList.contains('closeCatalog') && clearCatalog(allCards);
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
    function clearCatalog(collection) {
        const allCards = document.querySelectorAll('.card')
        catalog.classList.remove('catalogActive');
        collection.forEach(el => el.remove());
    }
    //добавление товара в массив корзины
    function addInBasket(e) {
      let sKey = e.target.parentElement.classList.contains('card') ? e.target.dataset.key : false;
      if (sKey) {
        arr.forEach(obj => Object.values(obj).forEach(val => val === sKey ? basketArr.push(obj) : false));
        return basketArr;
      }
      return;
    }

}