function promptGuess() {
  var input = prompt('請猜一個 1 到 100 的數字（輸入取消可結束）:');
  if (input === null) return null;
  var num = parseInt(input, 10);
  if (isNaN(num) || num < 1 || num > 100) {
    alert('請輸入有效的 1-100 整數');
    return promptGuess(); // 遞迴直到有效輸入或取消
  }
  return num;
}

function guessNumberGame() {
  var answer = Math.floor(Math.random() * 100) + 1;
  var count = 0;
  var message = '';

  while (true) {
    var guess = promptGuess();
    if (guess === null) {
      message += '遊戲已結束。\n';
      break;
    }
    count++;
    if (guess === answer) {
      message += `恭喜猜對了！答案是 ${answer}。\n你總共猜了 ${count} 次。`;
      break;
    } else if (guess < answer) {
      alert('再大一點');
    } else {
      alert('再小一點');
    }
  }
  return message;
}

var resultText = guessNumberGame();
alert(resultText);
document.getElementById('result').textContent = resultText;
