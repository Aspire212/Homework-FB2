"use strict";

const field = document.querySelector('.field');
const square = document.querySelector('.square');

const game = {
    x: 0,
    y: 0,
    start: 32,
    up: 38,
    low: 40,
    left: 37,
    right: 39,
    fps: 1000 / 60,
    play: false,
    timer: null,
    fW: field.offsetWidth,
    fH: field.offsetHeight,
    sW: square.offsetWidth,
    sH: square.offsetHeight,
}

window.addEventListener('keyup', function(e) {
    let btn = e.keyCode;
    console.log(btn, game.start)
    if (btn === game.start) {
        if (game.timer) {
            game.x = 0;
            game.y = 0;
            square.style.border = "none";
            square.textContent = null;
            square.style.left = game.x;
            square.style.top = game.y;
            clearInterval(game.timer);
        }
        game.timer = setInterval(() => move(btn), game.fps);
        game.play = true;
    }
    if (btn === game.low && game.play) {
        clearInterval(game.timer);
        game.timer = setInterval(() => move(btn), game.fps);
    } else if (btn === game.right && game.play) {
        clearInterval(game.timer);
        game.timer = setInterval(() => move(btn), game.fps);
    } else if (btn === game.up && game.play) {
        clearInterval(game.timer);
        game.timer = setInterval(() => move(btn), game.fps);
    } else if (btn === game.left && game.play) {
        clearInterval(game.timer);
        game.timer = setInterval(() => move(btn), game.fps);
    }
});


function move(id) {
    switch (id) {
        case game.start:
            square.style.left = `${game.x++}px`;
            if (game.x >= game.fW - game.sW) {
                console.log(game.x);
                game.play = false;
                clearInterval(game.timer)
            }
            break;
        case game.up:
            square.style.top = `${game.y--}px`;
            if (game.y <= 0) {
                console.log(game.y)
                game.play = false;
                clearInterval(game.timer);
            }
            break;
        case game.right:
            square.style.left = `${game.x++}px`;
            if (game.x >= game.fW - game.sW) {
                console.log(game.x);
                game.play = false;
                clearInterval(game.timer);
            }
            break;
        case game.low:
            square.style.top = `${game.y++}px`;
            if (game.y >= game.fH - game.sH) {
                console.log(game.y);
                game.play = false;
                clearInterval(game.timer);
            }
            break;
        case game.left:
            square.style.left = `${game.x--}px`;
            if (game.x <= 0) {
                game.play = false;
                clearTimeout(game.timer);
            }
            break;
    }
    if (!game.play) {
        square.style.border = "2px solid red";
        square.textContent = 'game over'
    }

}