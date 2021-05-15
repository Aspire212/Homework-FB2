'use strict'
const addName = document.querySelector('#addName');
const alcohol = document.querySelector('#alcoholic');
const recipe = document.querySelector('#recipe');
const searchName = document.querySelector('#searchName');
const list = document.querySelector('.list');
const searchRecipe = document.querySelector('.searchRecipe');
const deleteName = document.querySelector('#deleteName');
const message = document.querySelector('.message');


function clearForm() {
    addName.value = "";
    alcohol.value = "Нет";
    recipe.value = "";
}
class HashStorageFunc {
    constructor() {}
    addValue(key, value) {
        return this[key] = value;
    }
    getValue(key) {
        return this[key];
    }
    deleteValue(key) {
        return delete this[key];
    }
    getKeys() {
        return Object.keys(this);
    }
}

const drinkStorage = new HashStorageFunc();

addItem.onclick = () => {
    if (addName.value !== "") {
        const valobj = {
            'Алкогольный': alcohol.value,
            'Рецепт приготовления': recipe.value,
        }
        drinkStorage.addValue(addName.value, valobj);
        localStorage.setItem('drinkStorage', JSON.stringify(drinkStorage));
        clearForm();
        addName.placeholder = "";
    } else {
        clearForm();
        addName.placeholder = "Поле не может быть пустым";
    }
}

searchList.onclick = () => {
    let temp = JSON.parse(localStorage.getItem('drinkStorage'))
        //console.log(val)
    Object.keys(temp).forEach(drink => {
        if (drink === searchName.value) {
            Object.keys(temp[drink]).forEach(key => {
                let li = document.createElement('li');
                console.log(`${key} : ${temp[drink][key]} `)
                li.textContent = `${key} : ${temp[drink][key]} `;
                console.log(searchRecipe)
                searchRecipe.append(li);
            })
        } else {
            searchRecipe.innerHTML = undefined;
        }
    });
}

listItem.onclick = () => {
    if (localStorage.length < 1) {
        list.innerHTML = 'В каталоге нет рецептов!'
    } else {
        list.innerHTML = "";
        console.log(localStorage.getItem('drinkStorage'))
        let temp = JSON.parse(localStorage.getItem('drinkStorage'))
        Object.keys(temp).forEach(el => {
            let li = document.createElement('li');
            li.innerHTML = el;
            list.append(li);
        });
    }
}

deleteItem.onclick = () => {
    let temp = JSON.parse(localStorage.getItem('drinkStorage'))
    if (!temp.hasOwnProperty(deleteName.value)) {
        deleteName.value = '';
        message.innerHTML = false;
    } else {
        Object.keys(temp).map(el => el !== deleteName.value)
        deleteName.value = '';
        message.innerHTML = true;
    }
}