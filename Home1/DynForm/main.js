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
      }
      else {
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
      setRadio(newEl, obj, wrapF);
    }
    else {
      /*селект*/
      if (Object.values(obj).includes('combo')) {
        setSelect(newEl, obj, wrapF);
      }
    }
  }
  else {
    /*все остальное*/
    setAll(newEl, obj, wrapF)
  }
  /*Размеры текстареи*/
  if (newEl.classList.contains('area')) {
    newEl.style.width = '100%';
    newEl.parentElement.style.width = "100%";
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
/*простые*/
function setAll(inp, hash, parent) {
  Object.keys(hash).forEach(key => {
    if (key === 'kind') {
      if (hash[key] === 'longtext') {
        inp.type = "text";
        inp.style.width = '400px';
      }
      else if (hash[key] === 'number') {
        inp.type = 'number';
        inp.style.width = '50px';
      }
      else if (hash[key] === 'check') {
        inp.type = 'checkbox';
      }
    }
    else {
      inp = inp;
    }
    inp[key] = hash[key];
  })
  parent.append(inp);
  return parent;
}
/*радио кнопки*/
function setRadio(inp, hash, parent) {
  Object.keys(hash).forEach(key => {
    if (key === 'kind') {
      inp.type = hash[key];
    }
    else if (key === 'name') {
      inp[key] = hash[key];
    }
    else {
      hash[key].forEach(childObj => {
        let span = create('span');
        Object.keys(childObj).forEach(key => {
          if (key === 'value') {
            inp[key] = childObj[key];
            span.prepend(inp.cloneNode(false));
          }
          else {
            span.append(childObj[key]);
          }
          parent.append(span);
        });
      });
    }
  });
  return parent;
}
/*Рендер чилдов селекта*/
function setSelect(sel, hash, parent) {
  Object.keys(hash).forEach(key => {
    if (key === 'name') {
      sel[key] = hash[key];
    }
    if (Array.isArray(hash[key])) {
      Object.keys(hash[key]).forEach(arr => {
        let option = create('option');
        let childObj = hash[key][arr]
        Object.keys(childObj).forEach(key => {
          if (key === 'value') {
            option[key] = childObj[key]
          }
          else {
            option.textContent = childObj[key];
          }
        })
        sel.append(option.cloneNode(true));
      })
      parent.append(sel);
    }
  });
  return parent;
}