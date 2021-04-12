"use strict";
const app = document.querySelector('#app');
builder(app);

function builder(parent) {
    const field = document.createElement('div');
    field.style.cssText = 'height: 400px; width: 400px; border-radius: 50%; background: blueviolet; margin : 0 auto; position: relative;';
    const clock = {
        radius: 40,
        hourDots: 12,
        deg: 360,
        hourPos: 90,
        translate: 50,
        angle: null,
        posDot: null,
        x: null,
        y: null,
        radian: (deg) => (Math.PI / 180) * deg,
    }
    for (let i = 0; i < clock.hourDots; i++) {
        const chield = document.createElement('div');
        chield.textContent = i + 1;
        chield.style.cssText = 'width: 35px; height: 35px; border-radius: 50% ; background: #C7C7C1; position: absolute; top: 50%; left: 50%;transform: translate(-50%, -50%); text-align: center;bline-height: 35px; font-size: 25px;';
        field.append(chield);
    }
    field.childNodes.forEach((el, i) => {
        clock.posDot = (i + 1) * clock.deg / clock.hourDots;
        clock.angle = clock.radian(clock.posDot) - clock.radian(clock.hourPos);
        clock.x = clock.radius * Math.cos(clock.angle);
        clock.y = clock.radius * Math.sin(clock.angle);
        el.textContent = i + 1;
        el.style.left = clock.translate + clock.x + '%';
        el.style.top = clock.translate + clock.y + '%';
    });
    const secondsArrow = document.createElement('div');
    const minutesArrow = document.createElement('div');
    const hoursArrow = document.createElement('div');
    const time = document.createElement('div');
    secondsArrow.style.cssText = 'position: absolute; top: 10px; left: 199px; width: 2px; height: 190px; background: yellow; transform-origin: 50% 100% ;';
    minutesArrow.style.cssText = 'position: absolute; top: 50px; left: 198px; width: 4px; height: 150px; background: yellow; transform-origin: 50% 100% ;';
    hoursArrow.style.cssText = 'position: absolute; top: 70px; left: 197px; width: 6px; height: 130px; background: yellow; transform-origin: 50% 100% ;';
    time.style.cssText = 'position: absolute; top: 100px; left: 100px; width: 200px; height: 60px; text-align: center; line-height: 60px; font-size: 20px;';
    field.append(secondsArrow);
    field.append(minutesArrow);
    field.append(hoursArrow);
    field.append(time);
    time.textContent = curientTime(hoursArrow, minutesArrow, secondsArrow);
    setInterval(() => time.textContent = curientTime(hoursArrow, minutesArrow, secondsArrow), 1000);
    return parent.append(field);
}

function curientTime(hourArw, minArw, secArw) {
    const data = new Date();
    const time = {
        deg: 360,
        pm: 12,
        angleHour: 30,
        angleMin: 0.5,
        minSec: 60,
        xVar: 6,
        secDeg: null,
        minDeg: null,
        hourDeg: null,
        sec: data.getSeconds(),
        hour: data.getHours(),
        min: data.getMinutes(),
        zerosTime: (val) => val < 10 ? '0' + val : val,
    }
    time.secDeg = time.deg / time.minSec * time.sec;
    time.minDeg = time.deg / time.minSec * time.min + time.xVar / time.minSec * time.sec;
    time.hourDeg = time.deg / time.pm * time.hour + time.angleHour / time.minSec * time.min + time.angleMin / time.minSec * time.sec;
    secArw.style.transform = `rotateZ(${time.secDeg}deg)`;
    minArw.style.transform = `rotateZ(${time.minDeg}deg)`;
    hourArw.style.transform = `rotateZ(${time.hourDeg}deg)`;
    return `${time.zerosTime(time.hour)}:${time.zerosTime(time.min)}:${time.zerosTime(time.sec)}`;
}