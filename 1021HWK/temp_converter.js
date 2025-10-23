function cToF(c) {
  return c * 9 / 5 + 32;
}

function fToC(f) {
  return (f - 32) * 5 / 9;
}

function parseInput(input) {
  if (!input) return null;
  input = input.trim().toUpperCase();
  var unit = input.slice(-1);//取出字串的最後一個字元
  var temp = parseFloat(input.slice(0, -1));
  if (isNaN(temp) || (unit !== 'C' && unit !== 'F')) return null;
  return { temp, unit };
}

function convertTemp() {
  var input = prompt("請輸入溫度與單位（例如：36C 或 98F）：");
  var data = parseInput(input);
  if (!data) {
    return "輸入格式錯誤，請輸入類似 36C 或 98F";
  }
  var { temp, unit } = data;
  if (unit === 'C') {
    var f = cToF(temp);
    return `${temp}°C 轉換為 ${f.toFixed(2)}°F`;
  } else {
    var c = fToC(temp);
    return `${temp}°F 轉換為 ${c.toFixed(2)}°C`;
  }
}

var output = convertTemp();
alert(output);
document.getElementById('result').textContent = output;
