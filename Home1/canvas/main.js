'use strict';
const cvs = document.querySelector('#canvas');
const ctx = cvs.getContext("2d");

ctx.beginPath();
ctx.moveTo(100, 100);
ctx.stroke();
ctx.lineTo(200, 0);
ctx.lineTo(300, 100);
ctx.closePath();
ctx.fillStyle = 'yellow';
ctx.fill();

ctx.beginPath();
ctx.moveTo(120, 100);
ctx.stroke();
ctx.lineTo(120, 250);
ctx.lineTo(280, 250);
ctx.lineTo(280, 100);
ctx.closePath();
ctx.fillStyle = 'red';
ctx.fill();


ctx.arc(200, 170, 50, 0, Math.PI * 2);
ctx.fillStyle = 'green';
ctx.fill();

ctx.beginPath();
ctx.moveTo(200, 120);
ctx.lineTo(200, 220);
ctx.stroke();

ctx.beginPath();
ctx.moveTo(150, 175);
ctx.lineTo(250, 175);
ctx.stroke();