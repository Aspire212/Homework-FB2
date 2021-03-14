'use strict'
let reg = "2+2+(3+1+(2-1*(6/2)))"
const sign = ["+", "-", "*", "/", "=", "&divide;", "&times;", "."];
reg = reg.split("").filter(el => el !== " ").join("");

console.log(reg)


//функция чтобы добраться до самых глубоких скоок  

// переделать  через lastIndexOf 
/*function brekit(str) {
    let sub = str;
    if (!sub.substr(1).includes("(")) {
        let newStr = sub.slice(1, sub.indexOf(")"));
        let oldStr = sub.slice(0, sub.indexOf(")") + 1);
        return reg.replace(oldStr, calculated(newStr));
    } else {
        return brekit(sub.substr(1));
    }
} */

function bracket(str) {
    if (str.includes('(')) {
        let openBracket = str.lastIndexOf('(');
        let closeBracket = str.indexOf(')');
        let solution = calculated(str.slice(openBracket + 1, closeBracket))
        console.log();
        str = str.split('');
        str.map((el, i) => i === openBracket ? str.splice(i, (closeBracket - openBracket + 1), solution) : el)
        str = str.join("")
        return bracket(str)
    }
    else{
      return calculated(str)
    }

}


    function calculated(reg) {
        reg = reg.split("")
        reg = creteArray(reg)
        searchDot(reg, ".");
        //минус ф-ция

        //reg = reg.map(el => isNaN(el) ? el : +el)
        // преобр

        operation(reg, sign[3], sign[2]); //сразу "* и /"
        operation(reg, sign[1], sign[0])

        return reg.toString()


        //функции

        //split строки
        function creteArray(arr) {
            let temp = ""
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
            changeArr.filter((el, i) => changeArr[i] == '+' && changeArr[i + 1] == '-' ? changeArr.splice(i, 1) : false)
            return concatMinus(changeArr);
        }

        function concatMinus(arr) {
            arr.map((el, i) => {
                if (el === "-" && arr[i - 1] !== '+') {
                    arr.splice(i, 2, (-arr[i + 1]));
                    i !== 0 && arr.splice(i, 0, '+');
                }
            });
            //console.log(arr, 'chan')
            return arr;
        }
        //-------------
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




console.log(bracket(reg))



/*function repl(str) {
    return str.split("").some(el => el !== "(") ? calculated(str) : repl(brekit(str))

}*/


//вставить все функцми