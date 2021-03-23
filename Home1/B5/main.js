'use strict'

function buildWrapper(tag) {
  return function build(text, atr, strAtr = "") {
    text = [...text].map(el => el === '<' ? el = '&lt;' : el === '>' ? el = '&gt;' : el === '"' ? el = '&Prime;' : el === "'" ? el = '&prime;' : el === '&' ? el = '&amp;' : el).join("");
    if (atr) {
      Object.keys(atr).forEach(key => strAtr += `${key}="${atr[key]}" `);
      return `<${tag} ${strAtr}>${text}</${tag}`;
    }
    return `<${tag}>${text}</${tag}`;
  }
}
var wrapH1 = buildWrapper("H1");
var wrapP = buildWrapper("P");
console.log(wrapH1("СТИХИ"));
console.log(wrapP("Однажды в студёную зимнюю пору"));
console.log(wrapP("Однажды в студёную зимнюю пору", {
  lang: "ru"
}));
console.log(wrapP("Однажды в <студёную> зимнюю пору"));
console.log(wrapH1("СТИХИ", {
  align: "center",
  title: "M&M's"
}));