// lab_score_calculator.js
// 以 prompt 取得三科成績，計算平均與等第
//改為讀入 5 科成績，平均改以 5 科計算。
//加入不及格警示（任一科 < 60 在輸出加註「有不及格科目」）
function toNumber(str) {
  var n = parseFloat(str);
  return isNaN(n) ? null : n;
}

function gradeFrom(avg) {
  var g = 'F';
  if (avg >= 90) {
    g = 'A';
  } else if (avg >= 80) {
    g = 'B';
  } else if (avg >= 70) {
    g = 'C';
  } else if (avg >= 60) {
    g = 'D';
  } else {
    g = 'F';
  }
  return g;
}

var name = prompt('請輸入姓名：');
if (!name) {
  name = '同學';
}

var subjects=['國文','英文','數學','自然','社會'];
var scores=[];
for(var i=0;i<subjects.length;i++){
    var score=toNumber(prompt('輸入'+subjects[i]+'成績'));
    scores.push(score);
}

var text = '';
var sum=0;
var fail=false;
if (score===null) {
  text = '輸入有誤，請重新整理後再試。';
} else {
    for(var i=0;i<scores.length;i++){
        sum+=scores[i];
        if(scores[i]<60){
            fail=true;
        }
    }
  var avg = sum/scores.length;

  text = '姓名：' + name + '\n'
  for(var i=0;i<scores.length;i++){
        text+=subjects[i]+':'+scores[i]+'\n';
    }

    text+='平均：' + avg.toFixed(2) + '\n'
       + '等第：' + gradeFrom(avg);
    if(fail){
        text+='(備註:有不及格科目)';
    }
}

console.log(text);
document.getElementById('result').textContent = text;
