'use strict';
const app = document.querySelector('#app');
const total = document.createElement('div')
const field = document.createElement('div');
const ball = document.createElement('div');
const leftRc = document.createElement('div');
const rightRc = document.createElement('div');
const btnPlay = document.createElement('button');
const randomDiap = (n, m) => Math.floor(Math.random() * (m - n + 1)) + n;

ball.classList.add('ball');
leftRc.classList.add('leftRc');
rightRc.classList.add('rightRc');

const totalStyle = {
    height: '100px',
    width: '600px',
    color: 'white',
    textAlign: 'center',
    lineHeight: '100px',
    fontSize: '50px',
    fontFamily: 'Arial sans-serif',
};

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
    overflow: 'hidden',
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
    width: '130px',
    height: '50px',
    fontSize: '30px',
    margin: '40px',
    padding: '2px',
};

const ballMove = {
    x: noZero(-1, 1),
    y: noZero(-1, 1),
    startX: 0,
    startY: 0,
    speed: randomDiap(7, 10),
};

const rocketMove = {
    leftY: 0,
    rightY: 0,
    speed: 5,
    rDown: true,
    lDown: true,
    rUp: true,
    lUp: true,
    rTimer: null,
    lTimer: null,
};

const game = {
    timer: null,
    scoreLeft: 0,
    scoreRight: 0,
};


const leftRcStyle = new RcStyle(0, 'green');
const rightRcStyle = new RcStyle('580px', 'blue');



setStyle(totalStyle, total);
setStyle(appStyle, app);
setStyle(fieldStyle, field);
setStyle(ballStyle, ball);
setStyle(leftRcStyle, leftRc);
setStyle(rightRcStyle, rightRc);
setStyle(btnStyle, btnPlay);

field.append(ball);
field.append(rightRc);
field.append(leftRc);
app.append(total);
app.append(field);
app.append(btnPlay);


total.textContent = `${game.scoreLeft} : ${game.scoreRight}`;
btnPlay.textContent = 'Играть!';



btnPlay.addEventListener('click', () => move());
window.addEventListener('keydown', (e) => moveRc(e));

function move() {
    if (game.timer) {
        clearInterval(game.timer)
        clear();
    }
    game.timer = setInterval(() => {
        const data = {
            x: ball.getBoundingClientRect().x,
            y: ball.getBoundingClientRect().y,
            top: ball.getBoundingClientRect().top - field.getBoundingClientRect().top,
            left: ball.getBoundingClientRect().left - field.getBoundingClientRect().left,
            size: ball.getBoundingClientRect().height,
            leftX: leftRc.getBoundingClientRect().x,
            leftY: leftRc.getBoundingClientRect().y,
            rightX: rightRc.getBoundingClientRect().x,
            rightY: rightRc.getBoundingClientRect().y,
            width: rightRc.getBoundingClientRect().width,
            height: rightRc.getBoundingClientRect().height,
        }
        if (data.top + data.size >= field.offsetHeight ||
            data.top <= 0) {
            ballMove.y = -ballMove.y;
        }
        if (data.left + data.size >= field.offsetWidth ||
            data.left <= 0) {
            data.left <= 0 ? game.scoreRight++ : game.scoreLeft++;
            clearInterval(game.timer);
            total.textContent = `${game.scoreLeft} : ${game.scoreRight}`;
            setTimeout(() => clear(), 2000);
            return
        }
        if (data.x === data.rightX - data.width) {
            if (data.y >= data.rightY &&
                data.y <= data.rightY + data.height) {
                ballMove.x = -ballMove.x;
            }
        }
        if (data.x === data.leftX + data.width) {

            if (data.y >= data.leftY &&
                data.y <= data.leftY + data.height) {
                ballMove.x = -ballMove.x;
            }
        }
        ballMove.startY += ballMove.y;
        ballMove.startX += ballMove.x;
        ball.style.transform = `translate(${ballMove.startX}px, ${ballMove.startY}px)`;
    }, ballMove.speed);
}

function moveRc(e) {
    if (e.repeat) {
        return;
    }
    switch (e.key) {
        case 'Control':
            if (!rocketMove.lUp) {
                rocketMove.lUp = true;
            }
            if (rocketMove.lDown) {
                rocketMove.lTimer = setInterval(() => {
                    leftRc.style.transform = `translateY(${rocketMove.leftY++}px)`;
                    if (rocketMove.leftY > +leftRc.style.top.slice(0, -2)) {
                        rocketMove.lDown = false;
                        clearInterval(rocketMove.lTimer);
                    }
                }, rocketMove.speed);
            }
            break;
        case 'Shift':
            if (!rocketMove.lDown) {
                rocketMove.lDown = true;
            }
            if (rocketMove.lUp) {
                rocketMove.lTimer = setInterval(() => {
                    leftRc.style.transform = `translateY(${rocketMove.leftY--}px)`;
                    if (rocketMove.leftY < -(+leftRc.style.top.slice(0, -2))) {
                        rocketMove.lUp = false;
                        clearInterval(rocketMove.lTimer);
                    }
                }, rocketMove.speed);
            }
            break;
        case 'ArrowDown':
            if (!rocketMove.rUp) {
                rocketMove.rUp = true;
            }
            if (rocketMove.rDown) {
                rocketMove.rTimer = setInterval(() => {
                    rightRc.style.transform = `translateY(${rocketMove.rightY++}px)`;
                    if (rocketMove.rightY > +rightRc.style.top.slice(0, -2)) {
                        rocketMove.rDown = false;
                        clearInterval(rocketMove.rTimer);
                    }
                }, rocketMove.speed);
            }
            break;
        case 'ArrowUp':
            if (!rocketMove.rDown) {
                rocketMove.rDown = true;
            }
            if (rocketMove.rUp) {
                rocketMove.rTimer = setInterval(() => {
                    rightRc.style.transform = `translateY(${rocketMove.rightY--}px)`;
                    if (rocketMove.rightY < -(+rightRc.style.top.slice(0, -2))) {
                        rocketMove.rUp = false;
                        clearInterval(rocketMove.rTimer);
                    }
                }, rocketMove.speed);
            }
            break;
    }

    window.addEventListener('keyup', (e) => {
        if (e.key === 'Control' ||
            e.key === 'Shift') {
            clearInterval(rocketMove.lTimer);
        }
        if (e.key === 'ArrowUp' ||
            e.key === 'ArrowDown') {
            clearInterval(rocketMove.rTimer);
        }

    });

}

function clear() {
    ballMove.startX = 0;
    ballMove.startY = 0;
    ballMove.x = noZero(-1, 1);
    ballMove.y = noZero(-1, 1);
    ballMove.speed = randomDiap(6, 18);
    ball.style.transform = 'translate(0, 0)';
    leftRc.style.transform = 'translate(0, 0)';
    rightRc.style.transform = 'translate(0, 0)';
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