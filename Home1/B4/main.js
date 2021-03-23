"use strict"
/*Напишите функцию для оборачивания текста в тег, с которой можно было бы работать в следующем стиле:
  var wrapH1 = buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
var wrapP = buildWrapper("P"); // строим функцию для оборачивания текста в тег P
console.log(wrapH1("СТИХИ"));
// в консоль выводится строка "<H1>СТИХИ</H1>"
console.log(wrapP("Однажды в студёную зимнюю пору"));
// в консоль выводится строка "<P>Однажды в студёную зимнюю пору</P>"
Функция должна учитывать, что некоторые символы надо заменять на HTML - мнемоники(а именно - символы < > ' " &):
    console.log(wrapP("Вкусные M&M's"));
    // в консоль выводится строка "<P>Вкусные M&amp;M&apos;s</P>"*/
    
function buildWrapper(tag){
   return function build(text){
    text = [...text].map(el => el === '<' ? el = '&lt;' : el === '>' ? el = '&gt;' : el === '"' ? el = '&Prime;' : el === "'" ? el = '&prime;' : el === '&'? el = '&amp;' : el).join("");
     return `<${tag}>${text}</${tag}`
   }
}

var wrapH1 = buildWrapper("H1");
var wrapP = buildWrapper("P");
console.log(wrapH1("СТИХИ"));
console.log(wrapP("Однажды в студёную зимнюю пору"));