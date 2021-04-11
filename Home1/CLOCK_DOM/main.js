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
        let chield = document.createElement('div');
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
    const timeAngle = {
        sec: data.getSeconds(),
        min: data.getMinutes(),
        hour: data.getHours(),
        secDeg: null,
        minDeg: null,
        hourDeg: null,
        zerosTime: (val) => val < 10 ? '0' + val : val,
    }
    timeAngle.secDeg = 360 / 60 * timeAngle.sec;
    timeAngle.minDeg = 360 / 60 * timeAngle.min + 6 / 60 * timeAngle.sec;
    timeAngle.hourDeg = 360 / 12 * timeAngle.hour + 30 / 60 * timeAngle.min + 0.5 / 60 * timeAngle.sec;
    secArw.style.transform = `rotateZ(${timeAngle.secDeg}deg)`;
    minArw.style.transform = `rotateZ(${timeAngle.minDeg}deg)`;
    hourArw.style.transform = `rotateZ(${timeAngle.hourDeg}deg)`;
    return `${timeAngle.zerosTime(timeAngle.hour)}:${timeAngle.zerosTime(timeAngle.min)}:${timeAngle.zerosTime(timeAngle.sec)}`;
}
/*
  radius - 40% родителя,
  hourDots - 12 часовы точек,
  deg - 360 круг в градусах,
  hourPos - 90 для начала круга с 12 часоав,
  translate - 50 смещение элемента на 50%
  от своей оси
  angle - угол вычисляющийся в цикле,
  posDot позиция элемента в градусах
  x - будущее значение left
  y- будущее значение top
  radian - перевод градусов  в радианы
*/