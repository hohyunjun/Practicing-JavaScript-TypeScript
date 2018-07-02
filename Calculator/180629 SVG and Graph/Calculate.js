// 계산기의 결과값을 display 해주는 부분의 id와, 중간값을 display 해주는 부분의 id를 저장할 변수 선언.
// 이를 통해 아이디 값만 바꿔주면 다른 HTML 파일에서도 이 js 파일을 쓸 수 있다.
var displayId = 'display';
var midValueId = 'mid-value';
var evalId = 'eval';
var barClassName = 'bar';
var resultValueQueue = [];
var defaultX = 120;
var defaultY = 380;
var graphCoeff = 3.3;


// html 폴더에서 script 태그를 head 부분에 놓아도 정상적으로 동작하도록 하기 위해, DOM이 로드 된 후 내부 함수가 수행되도록 수정.
document.addEventListener('DOMContentLoaded', function(){
  // 변수의 이름을 어떤 변수인지 쉽게 알아볼 수 있도록 수정
  // 중간값을 계산하는 event handler
  document.getElementById(displayId).addEventListener('DOMSubtreeModified', function () { // 중간값 계산
    var displayText = this.textContent;
    var countOperator = 0;
    if (displayText != "") { // 식의 값이 Null이 아닐 경우에
      // 식에 연산자가 없고 숫자만 있는 경우는 제외하기 위해 연산자 count
      for (var i = 0; i < displayText.length; i++) {
        if (displayText[i] == '+'
           || displayText[i] == '-'
           || displayText[i] == '*'
           || displayText[i] == '/'
           || displayText[i] == '%') {
          countOperator += 1;
          break;
        }
      }
      // 연산자 개수가 0이 아닐 경우만
      if (countOperator != 0) {
        var endOfDisplayText = displayText[displayText.length - 1];
        if (endOfDisplayText == '+'
           || endOfDisplayText == '-'
           || endOfDisplayText == '*'
           || endOfDisplayText == '/'
           || endOfDisplayText == '%') {
          modifyInnerText(midValueId, '');
        } else {
          modifyInnerText(midValueId, eval(this.textContent));
        }
      }
    } else { // 식의 값이 NULL 이라면
      modifyInnerText(midValueId, '');
    }
  });

  // evaluation 코드
  document.getElementById(evalId).addEventListener('click', function () {
    modifyInnerText(displayId, eval(document.getElementById(displayId).textContent));
  });  

  // 큐에 값을 집어넣기 위한 코드
  document.getElementById(evalId).addEventListener('click', function(){
    appendQueue(document.getElementById(displayId).textContent);
  });

  // 큐에 있는 값을 그래프에 나타내기 위한 코드
  document.getElementById(evalId).addEventListener('click', function(){
     representBar();
  });
});

// 입력으로 받는 operator 형태에 따라 다른 함수를 반환하는 Closure 추가
// 이 함수 하나로 +, - 등의 연산자와 숫자의 append 처리가 가능하다.
function makeAppendFunction(operator){
  var operator = operator;
  function appendOperator(){
    addInnerText(displayId, operator);
  }
  return appendOperator;
}

function pressBtnDelete() {
  var displayText = document.getElementById(displayId).textContent;
  displayText = displayText.slice(0, displayText.length - 1);
  modifyInnerText(displayId, displayText);
}

function pressBtnClear() {
  modifyInnerText(displayId, '');
  modifyInnerText(midValueId, '');
  // svg 좌표값 조정
  document.getElementById(displayId).setAttribute('x', defaultX);
}

// 아이디 값을 받아서 innerText를 수정해주는 함수 추가
function modifyInnerText(elementId, innerValue){
    // svg 좌표 수정
    if(innerValue != ''){
      document.getElementById(elementId).setAttribute('x', defaultX-(String(innerValue).length * 5) );
    }
    document.getElementById(elementId).textContent = innerValue;
    
}

// 아이디 값을 받아서 innerText에 값을 더해주는 함수 추가
function addInnerText(elementId, innerValue) {
  var originalX = document.getElementById(elementId).getAttribute('x');
  // 초기설정
  if(document.getElementById(elementId).textContent.length==0){
    document.getElementById(elementId).setAttribute('x', defaultX);
  }
  document.getElementById(elementId).textContent += innerValue;

  // 값이 길어짐에 따라 왼쪽으로 좌표 이동시켜주는 코드
  document.getElementById(elementId).setAttribute('x', originalX - 5);
}

// Queue에 evaluation 된 결과값을 저장하는 함수
function appendQueue(resultValue){
  // Queue 길이가 5보다 클 경우는 맨 앞의 값을 없애고 push
  if (resultValueQueue.length < 5) {
    resultValueQueue.push(resultValue);
  } else {
    resultValueQueue.shift();
    resultValueQueue.push(resultValue);
  }
}

// Queue에 있는 값을 그래프에 나타내기 위한 코드
function representBar(){
  var bars = document.getElementsByClassName(barClassName);
    
  for(var indexOfQueue=0; indexOfQueue<resultValueQueue.length; indexOfQueue++){
    //bars[indexOfQueue].animate({height:translateToHeight(resultValueQueue[indexOfQueue]), y:translateToY(resultValueQueue[indexOfQueue])}, 2000);
    bars[indexOfQueue].setAttribute('y', translateToY(resultValueQueue[indexOfQueue]));
    bars[indexOfQueue].setAttribute('height', translateToHeight(resultValueQueue[indexOfQueue]));
  }
  
}

// 계산된 값을 그래프에서 쓰일 bar chart의 높이값으로 변경해주는 함수
function translateToHeight(resultValue){
  return (graphCoeff)*resultValue;
}

// 계산된 값을 그래프에서 쓰일 좌표 y값으로 변경해주는 함수
function translateToY(resultValue){
  return defaultY - translateToHeight(resultValue);
}