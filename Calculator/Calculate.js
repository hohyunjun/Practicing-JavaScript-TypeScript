// 계산기의 결과값을 display 해주는 부분의 id와, 중간값을 display 해주는 부분의 id를 저장할 변수 선언.
// 이를 통해 아이디 값만 바꿔주면 다른 HTML 파일에서도 이 js 파일을 쓸 수 있다.
var displayId = 'display';
var midValueId = 'mid-value';

// html 폴더에서 script 태그를 head 부분에 놓아도 정상적으로 동작하도록 하기 위해, DOM이 로드 된 후 내부 함수가 수행되도록 수정.
document.addEventListener('DOMContentLoaded', function(){
  // 변수의 이름을 어떤 변수인지 쉽게 알아볼 수 있도록 수정
  document.getElementById(displayId).addEventListener('DOMSubtreeModified', function () { // 중간값 계산
    var displayText = this.innerText;
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
          modifyInnerText(midValueId, eval(document.getElementById(displayId).innerText));
        }
      }
    } else { // 식의 값이 NULL 이라면
      modifyInnerText(midValueId, '');
    }
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
  var displayText = document.getElementById(displayId).innerText;
  displayText = displayText.slice(0, displayText.length - 1);
  modifyInnerText(displayId, displayText);
}

function pressBtnClear() {
  modifyInnerText(displayId, '');
  modifyInnerText(midValueId, '');
}

// 아이디 값을 받아서 innerText를 수정해주는 함수 추가
function modifyInnerText(elementId, innerValue){
    document.getElementById(elementId).innerText = innerValue;
}

// 아이디 값을 받아서 innerText에 값을 더해주는 함수 추가
function addInnerText(elementId, innerValue) {
  document.getElementById(elementId).innerText += innerValue;
}