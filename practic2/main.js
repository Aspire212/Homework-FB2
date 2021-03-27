'use strict'
const par = document.querySelector('#par');
const img = document.querySelector('#img');

let scale = 1;
let deg = 0;

document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
        case 38:
            img.style.transform = `scale(${scale += .1})  rotate(${deg}deg)`;
            break;
        case 37:
            img.style.transform = `scale(${scale}) rotate(${deg -= 1}deg)`;
            break;
        case 40:
            img.style.transform = `scale(${scale -= .1})  rotate(${deg}deg)`;
            break;
        case 39:
            img.style.transform = `scale(${scale}) rotate(${deg+= 1}deg)`;
            break;
    }
});