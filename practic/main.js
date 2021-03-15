'use strict'
const imgUrl = document.querySelector('#imgUrl');
const price = document.querySelector('#price');
const desk = document.querySelector('#desk');
const id = document.querySelector('#id');
const btn = document.querySelector('#btn');
const btnСreate = document.querySelector('#btnCreate');
const par = document.querySelector('.par');
const allInput = document.querySelectorAll('input');
let arr = [];
let counter = 0;


const Horizont = {
    imgUrl: "img/horizont.jpeg",
    price: '300$',
    desk: "LCD-телевизор с диагональю экрана 55 дюймов, Ultra HD разрешением и функцией SMART-TV",
    id: 'tv01'
}

const Atlant = {
    imgUrl: "img/atlant.jpeg",
    price: '500$',
    desk: "Двухкамерный холодильник с дисплеем, электронное управление, зона свежести, класс A+",
    id: 'fr01'
}

arr.push(Horizont)
arr.push(Atlant)

btn.addEventListener('click', createAndPush);
btnCreate.addEventListener('click', createCard)

function createAndPush(e) {
    let el = {}; // Добавить условие если есть пуст ое поле>
    el.imgUrl = imgUrl.value;
    el.price = price.value;
    el.desk = desk.value;
    el.id = id.value;
    arr.push(el)
    setTimeout(() => clearForm(), 1000);
}

function clearForm() {
    allInput.forEach(el => el.value = '')
}

function createCard() {

    arr.forEach(el => createElem(el))
}

function createElem(el) {
    console.log(par.cloneNode)
    let card = document.createElement('div');
    card.classList.add('card');
    card.dataset.id = arr[counter].id

    let img = document.createElement('img');
    img.src = el.imgUrl;
    img.textContent = el.imgUrl
    let price = document.createElement('div');
    price.classList.add('price');
    price.textContent = el.price;

    let desk = document.createElement('div');
    desk.classList.add('desk');
    desk.textContent = el.desk
    card.append(img);
    card.append(price);
    card.append(desk);
    par.append(card);
}