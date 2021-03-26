'use strict'
const par = document.querySelector('#par');

const img = document.querySelector('#img');
let scale = 1;
let deg = 0;
document.addEventListener('keydown', function(e) {
    console.log(e.keyCode)
    if (e.keyCode === 38) {
        //up
        img.style.transform = `scale(${scale += .1})  rotate(${deg}deg)`;

    }
    if (e.keyCode === 37) {
        //left
        img.style.transform = `scale(${scale}) rotate(${deg -= 1}deg)`;
    }

    if (e.keyCode === 40) {
        //down
        img.style.transform = `scale(${scale -= .1})  rotate(${deg}deg)`;
    }

    if (e.keyCode === 39) {
        //right
        img.style.transform = `scale(${scale}) rotate(${deg+= 1}deg)`;
    }

})