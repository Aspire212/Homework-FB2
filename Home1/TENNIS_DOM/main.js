'use strict';
const app = document.querySelector('#app');
const field = document.createElement('div');
const ball = document.createElement('div');
const leftRc = document.createElement('div');
const rightRc = document.createElement('div');

ball.classList.add('ball');
leftRc.classList.add('leftRc');
rightRc.classList.add('rightRc');

const fieldStyle = {
    //border: '1px solid red',
    background: 'yellow',
    width: '600px',
    height: '400px',
    position: 'relative',
};

const ballStyle = {
    borderRadius: '50%',
    background: 'red',
    width: '20px',
    height: '20px',
    position: 'absolute',
    top: '190px',
    left: '290px',
};

class RcStyle {
    width = '20px';
    height = '120px';
    position = 'absolute';
    top = '140px';
    constructor(left, background) {
        this.left = left;
        this.background = background;
    }
};

const leftRcStyle = new RcStyle(0, 'green');
const rightRcStyle = new RcStyle('580px', 'lightblue');

const randomDiap = (n, m) => Math.floor(Math.random() * (m - n + 1)) + n


setStyle(fieldStyle, field);
setStyle(ballStyle, ball);
setStyle(leftRcStyle, leftRc);
setStyle(rightRcStyle, rightRc);

field.append(ball);
field.append(rightRc);
field.append(leftRc);
app.append(field);

const ballMove = {
    x : noZero(-2, 2),
    y : noZero(-2, 2),
    startX : 0,
    startY : 0,
    speed : randomDiap(7, 10),
}




let timer;
timer = setInterval(() => move(), ballMove.speed)

function move(){
    const dataBall = {
        top : ball.getBoundingClientRect().top,
        left : ball.getBoundingClientRect().left,
        size : ball.getBoundingClientRect().height,
    }
    if (dataBall.top + dataBall.size >= 400 || dataBall.top <= 0) {
        ballMove.y = -ballMove.y;
    }
    if (dataBall.left + dataBall.size >= 600 || 
    dataBall.left <= 0) {
        ballMove.x = -ballMove.x;
    }
    console.log(ball.offsetLeft)
    ballMove.startY += ballMove.y;
    ballMove.startX += ballMove.x;
    ball.style.transform = `translate(${ballMove.startX}px, ${ballMove.startY}px)`;
    
    

}

function setStyle(objStyle, parent) {
    return Object.keys(objStyle).forEach(prop => parent.style[prop] = objStyle[prop]);
}

function noZero(n, m) {
    let num = 0;
    while (num === 0) {
        num = randomDiap(n, m);
    }
    return num;
}