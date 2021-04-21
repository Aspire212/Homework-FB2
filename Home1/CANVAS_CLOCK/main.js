'use strict';
window.addEventListener('DOMContentLoaded', () => {
    moveClock();
    setInterval(() => {
    moveClock();
}, 1000);
});

function moveClock() {
    const cvs = document.querySelector('#cvs');
    const ctx = cvs.getContext('2d');
    const data = new Date();
    const clock = {
        color: {
            field: 'purple',
            arw: 'orange',
            secArw: 'red',
            hour: 'green',
            text: 'white'
        },
        font: '25px Sans-serif',
        radius: 200,
        hourDots: 12,
        minSec: 60,
        deg: 360,
        hourPos: 90,
        hourText: 10,
        translate: 40,
        angle: null,
        posDot: null,
        center: 200,
        hourSize: 35,
        cDot: 20,
        x: null,
        y: null,
        timePos: 150,
        secArwWidth: 2,
        secArwLen: 160,
        minArwWidth: 6,
        minArwLen: 120,
        hourArwWidth: 8,
        hourArwLen: 90,
        secAngle: 0,
        minAngle: 0,
        hourAngle: 0,
        sec: data.getSeconds(),
        min: data.getMinutes(),
        hour: data.getHours(),
        circle: 2 * Math.PI,
        zerosTime: (val) => val < 10 ? '0' + val : val,
        radian: (deg) => (Math.PI / 180) * deg,
    };

    clock.secAngle = clock.deg * (clock.sec / clock.minSec) - clock.hourPos;
    clock.minAngle = clock.deg * (clock.min / clock.minSec) + (clock.sec / clock.minSec) * (clock.minSec / 10) - clock.hourPos;
    clock.hourAngle = clock.deg * (clock.hour / clock.hourDots) + (clock.min / clock.minSec) * (clock.minSec / 2) - clock.hourPos;
    ctx.beginPath();
    ctx.arc(clock.center, clock.center, clock.radius, 0, clock.circle);
    ctx.fillStyle = clock.color.field;
    ctx.fill();

    for (let i = 0; i < clock.hourDots; i++) {
        clock.posDot = (i + 1) * clock.deg / clock.hourDots;
        clock.angle = clock.radian(clock.posDot) - clock.radian(clock.hourPos);
        clock.x = clock.center + (clock.radius - clock.translate) * Math.cos(clock.angle);
        clock.y = clock.center + (clock.radius - clock.translate) * Math.sin(clock.angle);
        ctx.beginPath();
        ctx.arc(clock.x, clock.y, clock.hourSize, 0, clock.circle);
        ctx.fillStyle = clock.color.hour;
        ctx.fill();
        ctx.font = clock.font;
        ctx.fillStyle = clock.color.text;
        ctx.fillText(`${i + 1}`, clock.x - clock.hourText, clock.y + clock.hourText);
        ctx.closePath();
    }

    paintArw(clock.minAngle, clock.minArwLen, clock.color.arw, clock.minArwWidth);
    paintArw(clock.hourAngle, clock.hourArwLen, clock.color.arw, clock.hourArwWidth);
    paintArw(clock.secAngle, clock.secArwLen, clock.color.secArw, clock.secArwWidth);
    ctx.fillStyle = clock.color.arw;
    ctx.arc(clock.center, clock.center, clock.cDot, 0, clock.circle);
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = clock.color.text;
    ctx.fillText(`${clock.zerosTime(clock.hour)}:${clock.zerosTime(clock.min)}:${clock.zerosTime(clock.sec)}`, clock.timePos, clock.timePos);

    function paintArw(deg, len, color, width) {
        clock.x = clock.center + Math.cos(clock.radian(deg)) * len;
        clock.y = clock.center + Math.sin(clock.radian(deg)) * len;
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        ctx.moveTo(clock.center, clock.center);
        ctx.lineTo(clock.x, clock.y);
        ctx.stroke();
        ctx.closePath();
    }
}
