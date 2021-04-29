'use strict';
const allTitle = document.querySelectorAll('.title');
const allTabsInfo = document.querySelectorAll('.tabInfo');
const formHr = document.forms.hr
const saveHr = document.querySelector('#saveHr');
const getObj = document.querySelector('#getObj');
const globalData = {
    hrData: [],
    filData: [],
    logData: [],
};
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
                    this.createList.call(val, par);
                }
                else {
                    li.textContent = val;
                }
                ul.append(li);
            }
        });
        return par.append(ul);
    }
}
saveHr.addEventListener('click', (e) => {
    e.preventDefault();
    let data = new FormData(formHr);
    let tempObj = {};
    data.forEach((value, name) => {
        tempObj[name] = value;
    });
    let newPers = new Global(tempObj);
    globalData.hrData.push(newPers);
    setTimeout(() => {
        formHr.reset();
        tempObj = {};
    }, 100);
});
getObj.onclick = () => globalData.hrData.forEach(el => el.createList(test))