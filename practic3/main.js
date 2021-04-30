'use strict';
const allTitle = document.querySelectorAll('.title');
const allTabsInfo = document.querySelectorAll('.tabInfo');
const formHr = document.forms.hr;
const saveHr = document.querySelector('#saveHr');
const getObj = document.querySelector('#getObj');
const closeModal = document.querySelector('.close');
const modal = document.querySelector('.modalChar');
const chaSret = document.querySelector('.charSet');
const changeModal = document.querySelector('#changeModal');
const selItem = document.querySelectorAll('.sel');
const smallForm = document.querySelectorAll('.smallForm');
const globalData = {
    hrData: [],
    filData: [],
    logData: [],
};

const char = {};

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
                    this.createList.call(val, par);
                } else {
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
    let newData = new Global(tempObj);
    globalData.hrData.push(newData);
    setTimeout(() => {
        formHr.reset();
        tempObj = {};
    }, 100);
});



getObj.addEventListener('click', () => globalData.hrData.forEach(el => el.createList(test)));




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
});
closeModal.addEventListener('click', () => modal.classList.remove('modalChar_active'));

smallForm.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
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