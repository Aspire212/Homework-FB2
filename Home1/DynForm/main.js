"use strict";
const formDef1 = [{
  label: 'Название сайта:',
  kind: 'longtext',
  name: 'sitename'
}, {
  label: 'URL сайта:',
  kind: 'longtext',
  name: 'siteurl'
}, {
  label: 'Посетителей в сутки:',
  kind: 'number',
  name: 'visitors'
}, {
  label: 'E-mail для связи:',
  kind: 'shorttext',
  name: 'email'
}, {
  label: 'Рубрика каталога:',
  kind: 'combo',
  name: 'division',
  variants: [{
    text: 'здоровье',
    value: 1
  }, {
    text: 'домашний уют',
    value: 2
  }, {
    text: 'бытовая техника',
    value: 3
  }]
}, {
  label: 'Размещение:',
  kind: 'radio',
  name: 'payment',
  variants: [{
    text: 'бесплатное',
    value: 1
  }, {
    text: 'платное',
    value: 2
  }, {
    text: 'VIP',
    value: 3
  }]
}, {
  label: 'Разрешить отзывы:',
  kind: 'check',
  name: 'voteùs'
}, {
  label: 'Описание сайта:',
  kind: 'memo',
  name: 'description'
}, {
  label: 'Опубликовать:',
  kind: 'submit'
}, ];
const formDef2 = [{
  label: 'Фамилия:',
  kind: 'longtext',
  name: 'lastname'
}, {
  label: 'Имя:',
  kind: 'longtext',
  name: 'firstname'
}, {
  label: 'Отчество:',
  kind: 'longtext',
  name: 'secondname'
}, {
  label: 'Возраст:',
  kind: 'number',
  name: 'age'
}, {
  label: 'Зарегистрироваться:',
  kind: 'submit'
}, ];
const app = document.querySelector('#app');
const formTag = "<form>";
dynForm(formDef1, formTag, app);
dynForm(formDef2, formTag, app);

function dynForm(arr, tag, par) {
  let formPar = document.createElement(tag.slice(1, -1));
  formPar.action = "https://fe.it-academy.by/TestForm.php";
  formPar.method = "post";
  formPar.style.cssText = "border-bottom: 1px solid black; padding: 0 0 10px 0; margin: 10px auto";
  arr.forEach(obj => {
    dynamicCreate(obj, formPar)
  });
  par.append(formPar);
}

function dynamicCreate(obj, par) {
  let newLabel = create('label');
  newLabel.style.cssText = 'display: flex; align-items: center; flex-wrap: wrap; margin: 10px auto;';
  /*кнопка*/
  if (Object.values(obj).includes('submit')) {
    let submit = formElement(obj);
    Object.keys(obj).forEach(key => {
      if (key === 'kind') {
        submit.type = obj[key];
      } else {
        submit.value = obj[key].slice(0, -1);
      }
    });
    newLabel.append(submit);
    par.append(newLabel);
    return;
  }
  let wrapT = create('div');
  wrapT.style.width = '200px';
  let wrapF = create('div');
  wrapF.style.cssText = 'margin-left: 10 px; display: flex; justify-content: flex-start;';
  wrapT.textContent = obj.label;
  newLabel.append(wrapT);
  newLabel.append(wrapF);
  delete obj.label;
  let newEl = formElement(obj);
  let option = create('option');
  if (obj.hasOwnProperty('variants')) {
    /*Радио кнопки*/
    if (Object.values(obj).includes('radio')) {
      Object.keys(obj).forEach(key => {
        if (key === 'kind') {
          newEl.type = obj[key]
        } else if (key === 'name') {
          newEl[key] = obj[key];
        } else {
          obj[key].forEach(childObj => {
            let span = create('span');
            Object.keys(childObj).forEach(key => {
              if (key === 'value') {
                newEl[key] = childObj[key];
                span.prepend(newEl.cloneNode(false));
              } else {
                span.append(childObj[key]);
              }
              wrapF.append(span);
            });
          });
        }
      });
    } else {
      /*селект*/
      if (Object.values(obj).includes('combo')) {
        Object.keys(obj).forEach(key => {
          if (key === 'name') {
            newEl[key] = obj[key];
          }
          if (Array.isArray(obj[key])) {
            Object.keys(obj[key]).forEach(arr => {
              let option = create('option');
              let childObj = obj[key][arr]
              Object.keys(childObj).forEach(key => {
                if (key === 'value') {
                  option[key] = childObj[key]
                } else {
                  option.textContent = childObj[key];
                }
              })
              newEl.append(option.cloneNode(true));
            })
            wrapF.append(newEl);
          }
        })
      }
    }
  } else {
    /*все остальное*/
    Object.keys(obj).forEach(key => {
      if (key === 'kind') {
        if (obj[key] === 'longtext') {
          newEl.type = "text";
          newEl.style.width = '400px';
        } else if (obj[key] === 'number') {
          newEl.type = 'number';
          newEl.style.width = '50px';
        } else if (obj[key] === 'check') {
          newEl.type = 'checkbox';
        }
      } else {
        newEl = newEl;
      }
      newEl[key] = obj[key];
    })
    wrapF.append(newEl);
    if (newEl.classList.contains('area')) {
      newEl.style.width = '100%';
      newEl.parentElement.style.width = "100%";
    }
  }
  par.append(newLabel);
}

function formElement(obj, el = null) {
  Object.keys(obj).forEach(key => {
    if (key === 'kind') {
      switch (obj[key]) {
        case 'combo':
          el = create('select');
          break;
        case 'memo':
          el = create('textarea');
          el.classList.add('area');
          break;
        default:
          el = create('input');
          break;
      }
    }
  });
  return el;
}

function create(el) {
  return document.createElement(el);
}