'use strict'
const reg = document.querySelector('#reg');
const send = document.querySelector('#send');
const answer = document.querySelector('.answer')
const sign = ["+", "-", "*", "/", "=", "&divide;", "&times;", "."];

send.addEventListener('click', giveMeAnswer)

function giveMeAnswer() {
    let countOpen = countBracket(reg.value, '(');
    let countClose = countBracket(reg.value, ')');
    if (countOpen !== countClose) {
        return answer.textContent = 'Вы не верно ввели выражение(не хватает скобок)!!!!';
    }
    if (reg.value.length !== 0 && countOpen === countClose) {
        let regValue = reg.value.split('');
        regValue.filter(el => el !== " ");
        regValue.map((el, i) => el === '(' && !isNaN(regValue[i - 1]) ? regValue.splice(i - 1, 2, (regValue[i - 1] + '*' + el)) : el);
        regValue = regValue.join('');
        return answer.textContent = `Выражение равно ${bracket(regValue)}`;
    } else {
        return answer.textContent = 'Вы ничего не ввели!!!!';
    }
}
//функция для проверки скобок
function countBracket(str, bracket) {
    let counter = 0;
    str = str.split('');
    str.forEach(el => el === bracket && counter++);
    return counter;
}


function bracket(str) {
    if (str.includes('(')) {
        let openBracket = str.lastIndexOf('(');
        let closeBracket = str.indexOf(')');
        let solution = calculated(str.slice(openBracket + 1, closeBracket));
        str = str.split('');
        str.map((el, i) => i === openBracket ? str.splice(i, (closeBracket - openBracket + 1), solution) : el);
        str = str.join("");
        return bracket(str);
    } else {
        return calculated(str);
    }
    console.log(1)

    function calculated(reg) {
        reg = reg.split("");
        reg = creteArray(reg);
        searchDot(reg, ".");
        operation(reg, sign[3], sign[2]); //сразу "* и /"
        operation(reg, sign[1], sign[0]);
        return reg.toString();
        //функции
        //split строки
        function creteArray(arr) {
            let temp = "";
            let changeArr = [];
            arr.forEach(el => {
                if (isNaN(el)) {
                    if (temp.length > 0) {
                        changeArr.push(temp);
                        temp = "";
                    }
                    changeArr.push(el);
                } else {
                    temp += el;
                }
            });
            !!temp.length && changeArr.push(temp);
            changeArr.filter((el, i) => isNaN(changeArr[i]) && changeArr[i - 1] == '-' ? changeArr.splice(i, 1) : false);
            return concatMinus(changeArr);
        }
        //склеиваю минус с числом
        function concatMinus(arr) {
            arr.map((el, i) => el === "-" && arr.splice(i, 2, -arr[i + 1]));
            arr.map((el, i) => !isNaN(el) && !isNaN(arr[i - 1]) && arr.splice(i, 0, '+'));
            return arr;
        }

        function searchDot(arr, sym) {
            arr.map((el, i) => {
                el === sym ? el = arr.splice(i - 1, 3, (arr[i - 1] + arr[i] + arr[i + 1])) : false;
            });
        }

        function operation(arr, op1, op2 = op1) {
            arr.forEach(el => (el !== op1 || el !== op2) ? mathLogic(arr, op1, op2) : false);
        }
        //замена 3-х подряд идущих знаков в массиве на их решение
        function mathLogic(arr, op1, op2 = op1) {
            if (arr.length < 2) {
                return arr;
            }
            let replaceEl;
            arr.forEach((el, i) => {
                if (arr[i] === op1 || arr[i] === op2) {
                    replaceEl = arr.splice(i - 1, 3, equals(arr[i - 1], arr[i], arr[i + 1]));
                }
            })
        }
        //решение выражения
        function equals(num1, op, num2) {
            let newNum;
            if (op === '+') {
                newNum = parseFloat(num1) + parseFloat(num2);
            }
            if (op === '-') {
                newNum = parseFloat(num1) - parseFloat(num2);
            }
            if (op === '*') {
                newNum = parseFloat(num1) * parseFloat(num2);
            }
            if (op === '/') {
                newNum = (parseFloat(num1) / parseFloat(num2));
                if (newNum === Infinity) {
                    newNum = 0;
                } else {
                    newNum === Math.floor(newNum) ? Math.floor(newNum) : newNum.toFixed(3);
                }
            }
            return parseFloat(newNum)
        }

    }
}