// example5_script.js
// 以巢狀 for 產生 1~9 的乘法表
var start=prompt('輸入起始數:');
var end=prompt('輸入結束數:');
var startNum = parseInt(start, 10);
var endNum = parseInt(end, 10);

var output = '';
if(isNaN(startNum)||isNaN(endNum)||endNum>9||startNum<1||startNum>endNum){
    output='輸入錯誤!'
}else{
    for (var i = startNum; i <= endNum; i++) {
        for (var j = 1; j <= 9; j++) {
            output += i + 'x' + j + '=' + (i * j) + '\t';
        }
    output += '\n';
    }

}

document.getElementById('result').textContent = output;
