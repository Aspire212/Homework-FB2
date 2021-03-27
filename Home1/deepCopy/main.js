'use strict'

let bcr = {a: {b:2, d: {e: 18, g: [1, 2, 3]}}, c:4, f: [1, 2, [18, 22]]}



/*function deepCopy(obj) {
  let newObj = {};
  const copyArr = (arr) => {
    let newArr = [];
    arr.forEach((el, i) => el instanceof Object ? newArr[i] = copyArr(el) : newArr[i] = el);
    return newArr;
  }
  for (let key in obj) {
    if (obj[key] instanceof Object && !Array.isArray(obj[key])) {
      newObj[key] = deepCopy(obj[key]);
      continue;
    } else if (obj[key] instanceof Object && Array.isArray(obj[key])) {
      newObj[key] = copyArr(obj[key]);
      continue;
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}*/
//уменьшил код, исправил копирование функции
function deepCopy(obj, newObj = {}) {
  for (let key in obj) {
    if (obj[key] instanceof Object && !(obj[key] instanceof Function)) {
      newObj[key] = Array.isArray(obj[key]) ? deepCopy(obj[key], []) : newObj[key] = deepCopy(obj[key]);
      continue;
    } else {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}


let nO = deepCopy(bcr);
nO.f[2][0] = 88;
nO.a.d.e = 1000;
nO.a.d.g[1] = "tratata";
console.log(bcr, 'bcr');
console.log(nO);
