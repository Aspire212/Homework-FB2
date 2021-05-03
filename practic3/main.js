'use strict';
const allTitle = document.querySelectorAll('.title');
const allTabsInfo = document.querySelectorAll('.tabInfo');
const save = document.querySelectorAll('.save');
const getObj = document.querySelector('#getObj');
const closeModal = document.querySelector('.close');
const modal = document.querySelector('.modalChar');
const chaSret = document.querySelector('.charSet');
const changeModal = document.querySelector('#changeModal');
const selItem = document.querySelectorAll('.sel');
const smallForm = document.querySelectorAll('.smallForm');
const sumPrice = document.querySelector('#sumPrice'); //для слежки
const quantity = document.querySelector("quantity");
const getInfoBtn = document.querySelectorAll('.getInfo button');

const globalData = {
    hrData: [],
    filData: [],
    logData: [],
};
const charTemp = [];
/*
    Tabs
*/
allTitle.forEach(title => {
    title.addEventListener('click', function(e) {
        if (!this.classList.contains('titleActive')) {
            clearClass(allTitle, 'titleActive');
            this.classList.add('titleActive');
        }
        if (this.classList.contains('titleActive')) {
            allTabsInfo.forEach(info => {
                if (this.dataset.tabs === info.dataset.tabs) {
                    clearClass(allTabsInfo, 'infoActive');
                    info.classList.add('infoActive');
                }
            });
        }
    });
});

function clearClass(arr, active) {
    arr.forEach(el => {
        if (el.classList.contains(active)) {
            el.classList.remove(active);
        }
    });
}
/*
    Tabs
*/
class Global {
    constructor(pers) {
        Object.keys(pers).forEach(key => {
            this[key] = pers[key];
        });
    }

    createList(par) {
        let ul = document.createElement('ul')
        Object.values(this).forEach(val => {
            if (val.length > 0 || val instanceof Object) {
                let li = document.createElement('li');
                if (val instanceof Object) {
                    li.textContent = 'Характеристики:';
                    this.createList.call(val, li);
                } else {
                    li.textContent = val;
                }
                ul.append(li);
            }
        });
        return par.append(ul);
    }
}

save.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        let par = this.parentElement;
        pushData(par, globalData[par.name]);
        if (par.name === "filData" &&
            charTemp.length > 0) {
            let lastEl = globalData[par.name].length - 1;
            globalData[par.name][lastEl].char = charTemp[0]
        }
    });
});

getInfoBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        globalData[btn.dataset.name].forEach(data => data.createList(btn.parentElement));
    });
});

/*
    MODAL
*/
changeModal.addEventListener('change', () => {
    selItem.forEach(div => {
        div.style.zIndex = 0;
        if (div.dataset.section === changeModal.value) {
            div.style.zIndex = 1;
        }
    });
});
chaSret.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modalChar_active');
    charTemp.pop();
});
closeModal.addEventListener('click', () => modal.classList.remove('modalChar_active'));
smallForm.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        pushData(this.parentElement, charTemp);
        setTimeout(() => modal.classList.remove('modalChar_active'), 200);
    });
});
/*
    MODAL
*/
function pushData(formName, arrName) {
    let data = new FormData(formName);
    let tempObj = {};
    data.forEach((value, name) => {
        tempObj[name] = value;
    });
    let newData = new Global(tempObj);
    arrName.push(newData);
    setTimeout(() => {
        formName.reset();
        tempObj = {};
    }, 100);
}

getObj.addEventListener('click', () => console.log(globalData));