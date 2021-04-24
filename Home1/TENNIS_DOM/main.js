'use strict';
const app = document.querySelector('#app');
const field = document.createElement('div');
const ball = document.createElement('div');
const leftRc = document.createElement('div');
const rightRc = document.createElement('div');
const btnPlay = document.createElement('button');

btnPlay.textContent = 'Играть!';

ball.classList.add('ball');
leftRc.classList.add('leftRc');
rightRc.classList.add('rightRc');

const appStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
};

const fieldStyle = {
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

const btnStyle = {
    width: '120px',
    height: '50px',
    fontSize: '30px',
    margin: '40px',
};


const leftRcStyle = new RcStyle(0, 'green');
const rightRcStyle = new RcStyle('580px', 'lightblue');

const randomDiap = (n, m) => Math.floor(Math.random() * (m - n + 1)) + n;

setStyle(appStyle, app);
setStyle(fieldStyle, field);
setStyle(ballStyle, ball);
setStyle(leftRcStyle, leftRc);
setStyle(rightRcStyle, rightRc);
setStyle(btnStyle, btnPlay);

field.append(ball);
field.append(rightRc);
field.append(leftRc);
app.append(field);
app.append(btnPlay);

const ballMove = {
    x: noZero(-2, 2),
    y: noZero(-2, 2),
    startX: 0,
    startY: 0,
    speed: randomDiap(8, 10),
}

const rocketMove = {
    leftY: 0,
    rightY: 0,
    runLR: false,
    runRR: false,
}

let timer;

btnPlay.addEventListener('click', () => timer = setInterval(() => move(), ballMove.speed));
window.addEventListener('keydown', (e) => moveRc(e));

function moveRc(e) {
    let lTimer;
    switch (e.key) {
        case 'Control':
            rocketMove.runLR = !rocketMove.runLR;
            window.addEventListener('keyup', (e) => {
                if (e.key === 'Control') {
                    clearInterval(lTimer);
                    rocketMove.runLR = !rocketMove.runLR;
                }
            });

            if (rocketMove.runLR) {
                lTimer = setInterval(() => {
                    leftRc.style.transform = `translateY(${rocketMove.rightY++}px)`;
                }, 1000 / 60);
            }
            break;
        case 'Shift':
            rocketMove.runLR = !rocketMove.runLR;
            moveRocket(rocketMove.runLR, leftRc, rocketMove.leftY, 'Shift');
            break;
        case 'ArrowUp':
            rocketMove.runRR = !rocketMove.runRR;
            moveRocket(rocketMove.runRR, rightRc, rocketMove.rightY, 'ArrowUp');
            break;
        case 'ArrowDown':
            rocketMove.runRR = !rocketMove.runRR;
            moveRocket(rocketMove.runRR, rightRc, rocketMove.rightY, 'ArrowDown', false);
            break;

    }

}

/*function moveRocket(run, rc, y, key, upDown = true) {
    run = !run;
            window.addEventListener('keyup', (e) => {
                if (e.key === key) {
                    clearInterval(lTimer);
                    run = !run;
                }
            });

            if (run) {
                lTimer = setInterval(() => {
                    leftRc.style.transform = `translateY(${rocketMove.rightY++}px)`;
                }, 1000 / 60);
            }
}*/

function move() {
    const dataBall = {
        top: ball.getBoundingClientRect().top - field.getBoundingClientRect().top,
        left: ball.getBoundingClientRect().left - field.getBoundingClientRect().left,
        size: ball.getBoundingClientRect().height,
    }
    if (dataBall.top + dataBall.size >= field.offsetHeight ||
        dataBall.top <= 0) {
        ballMove.y = -ballMove.y;
    }
    if (dataBall.left + dataBall.size >= field.offsetWidth ||
        dataBall.left <= 0) {
        ballMove.x = -ballMove.x;
    }
    ballMove.startY += ballMove.y;
    ballMove.startX += ballMove.x;
    ball.style.transform = `translate(${ballMove.startX}px, ${ballMove.startY}px)`
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