"use strict"

function buildWrapper(tag) {
  return function build(text) {
    text = [...text].map(el => el === '<' ? el = '&lt;' : el === '>' ? el = '&gt;' : el === '"' ? el = '&Prime;' : el === "'" ? el = '&prime;' : el === '&' ? el = '&amp;' : el).join("");
    return `<${tag}>${text}</${tag}`
  }
}
var wrapH1 = buildWrapper("H1");
var wrapP = buildWrapper("P");
console.log(wrapH1("СТИХИ"));
console.log(wrapP("Однажды в студёную зимнюю пору"));