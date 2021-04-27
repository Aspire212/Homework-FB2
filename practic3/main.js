'use strict';
const allTitle = document.querySelectorAll('.title');
const allTabsInfo = document.querySelectorAll('.tabInfo');

const formHr = document.forms.hr
const saveHr = document.querySelector('#save');
const getObj = document.querySelector('#getObj');
const globalData = {
    hrData: [],
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






class HR {
    constructor(pers) {
        Object.keys(pers).forEach(key => {
            this[key] = pers[key];
        });
    }
    createList(par) {
        let ul = document.createElement('ul')
        Object.values(this).forEach(val => {
            if (val.length > 0) {
                let li = document.createElement('li');
                li.textContent = val;
                ul.append(li);
            }
        });
        return par.append(ul);
    }
}

saveHr.addEventListener('click', (e) => {
    e.preventDefault();
    let tempObj = {};
    for (let input of formHr) {
        if (input.name) {
            if (input.type === 'checkbox') {
                input.value === '' ? input.value = 'Женат / замужем' : input.value = 'Не женат / не замужем'
            }
            tempObj[input.name] = input.value;
        }
        setTimeout(() => {
            input.value = "";
            tempObj = {};

        }, 100);
    }
    const newPers = new HR(tempObj);
    globalData.hrData.push(newPers);
});

getObj.onclick = () => globalData.hrData.forEach(el => el.createList(test))