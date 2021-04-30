'use strict';
const parent = document.querySelector('#parent');
const allImg = document.querySelectorAll('#parent div');
let mouseOn = false;
let coords = {
    x: null,
    y: null,
    xM: null,
    yM: null
}
allImg.forEach(img => {
    img.addEventListener('mousedown', function(e) {
        mouseOn = true;
        coords.x = e.screenX
        coords.y = e.screenY
        console.log(coords)
        this.style.cursor = 'pointer';

        if (mouseOn) {
            img.addEventListener('mousemove', function(e) {
                console.log(coords)
                coords.xM = e.screenX
                coords.yM = e.screenY
                console.log(coords)
                this.style.cursor = 'pointer';
                this.style.transform = `translate(${coords.x - coords.xM}px, ${coords.y - coords.yM})`
            });

        }
        img.addEventListener('mouseup', function(e) {
            mouseOn = false;
        })
    });
});