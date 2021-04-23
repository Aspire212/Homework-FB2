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
    border: '1px solid red',
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
    top: 'calc(50% - 10px)',
    left: 'calc(50% - 10px)',
};

class RcStyle {
    width = '20px';
    height = '120px';
    position = 'absolute';
    top = 'calc(50% - 40px)';
    constructor(left, background) {
        this.left = left;
        this.background = background;
    }
};

const leftRcStyle = new RcStyle(0, 'green');
const rightRcStyle = new RcStyle('calc(100% - 20px)', 'lightblue');

setStyle(fieldStyle, field);
setStyle(ballStyle, ball);
setStyle(leftRcStyle, leftRc);
setStyle(rightRcStyle, rightRc);

field.append(ball);
field.append(rightRc);
field.append(leftRc);
app.append(field);

const ballMove = {
    x: null,
    y: null,
}





function setStyle(obj, parent) {
    return Object.keys(obj).forEach(key => parent.style[key] = obj[key]);
}