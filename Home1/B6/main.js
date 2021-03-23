
'use strict'

function formatNumber(num, std) {
  num = num.toFixed(std.substr(std.indexOf(".") + 1).length)
  let div = num.substr(num.indexOf("."))
  std = std.slice(0, std.indexOf('.')).split("").reverse();
  let temp = String(parseInt(num));
  temp = [...temp].reverse();
  for (let i = 0; i < std.length; i++) {
    if (std[i] === " ") {
      temp.splice(i, 0, " ");
    }
  }
  return String(temp.reverse().join("") + div).trim();
}
console.log(formatNumber(12345.368, "# ### ###.##"));
console.log(formatNumber(2.3, "# ### ###.##"));

