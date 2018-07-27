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
var isResult = false;
var svgNameSpace = 'http://www.w3.org/2000/svg';

// html 폴더에서 script 태그를 head 부분에 놓아도 정상적으로 동작하도록 하기 위해, DOM이 로드 된 후 내부 함수가 수행되도록 수정.
document.addEventListener('DOMContentLoaded', function(){
  
  makeDisplaySVG();
  makeButtonSVG();
  makeGraphSVG();

  // 변수의 이름을 어떤 변수인지 쉽게 알아볼 수 있도록 수정
  // 중간값을 계산하는 event handler
  document.getElementById(displayId).addEventListener('DOMSubtreeModified', function () { // 중간값 계산
    changeMidValue(this);
  });

  // evaluation 코드
  document.getElementById(evalId).addEventListener('click', function () {
    modifyInnerText(displayId, eval(document.getElementById(displayId).textContent));
    isResult = true;
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

// display svg를 만드는 함수
function makeDisplaySVG(){
  var displaySVG = createSVG('svg');
  var displayAttr = {
    'width': '240',
    'height': '80'
  }
  setAttributes(displaySVG, displayAttr);
  var displayRect = createSVG('rect');
  var rectAttr = {
    'rx': '10',
    'ry': '10',
    'width': '240',
    'height': '80',
    'style': 'fill:black;'
  }
  setAttributes(displayRect, rectAttr);
  displaySVG.appendChild(displayRect);
  var displayDiv = document.getElementsByClassName('resultdisplay');
  displayDiv[0].appendChild(displaySVG);

  var displayText = createSVG('text');
  var displayTextAttr = {
    'id': 'display',
    'font-size': '16',
    'x': '120',
    'y': '40'
  }
  setAttributes(displayText, displayTextAttr);
  displaySVG.appendChild(displayText);

  var midValueText = createSVG('text');
  var midValueTextAttr = {
    'id': 'mid-value',
    'font-size': '16',
    'x': '120',
    'y': '60'
  }
  setAttributes(midValueText, midValueTextAttr);
  displaySVG.appendChild(midValueText);
}

// buttonSVG를 만드는 함수
function makeButtonSVG(){
  // button들을 넣을 svg 선언
  var buttonsDiv = document.getElementsByClassName('buttons');
  var buttonSVG = createSVG('svg');
  var buttonSVGAttr = {
    'width' : '250',
    'height' : '150'
  }
  setAttributes(buttonSVG, buttonSVGAttr);

  var buttonRects = [];
  var buttonTexts = [];

  //숫자먼저 만들고
  buttonRects.push(makeButtonNumbersRect('5', '5', '7'));
  buttonRects.push(makeButtonNumbersRect('66', '5', '8'));
  buttonRects.push(makeButtonNumbersRect('127', '5', '9'));
  buttonRects.push(makeButtonNumbersRect('5','34','4'));
  buttonRects.push(makeButtonNumbersRect('66', '34', '5'));
  buttonRects.push(makeButtonNumbersRect('127', '34', '6'));
  buttonRects.push(makeButtonNumbersRect('5', '63', '1'));
  buttonRects.push(makeButtonNumbersRect('66', '63', '2'));
  buttonRects.push(makeButtonNumbersRect('127', '63', '3'));
  buttonRects.push(makeButtonNumbersRect('5', '92', '0'));
  var btnDot = makeButtonNumbersRect('127','92','.');
  btnDot.setAttribute('onclick','makeAppendFunction(".")()');
  buttonRects.push(btnDot);

  //Operators 만들고
  var btnPlus = makeButtonOperatorsRect('188','5','+');
  btnPlus.setAttribute('onclick','makeAppendFunction("+")()');
  buttonRects.push(btnPlus);
  var btnMinus = makeButtonOperatorsRect('188', '34', "-");
  btnMinus.setAttribute('onclick', 'makeAppendFunction("-")()');
  buttonRects.push(btnMinus);
  var btnMultiply = makeButtonOperatorsRect('188', '63', "*");
  btnMultiply.setAttribute('onclick', 'makeAppendFunction("*")()');
  buttonRects.push(btnMultiply);
  var btnModular = makeButtonOperatorsRect('66','92','%');
  btnModular.setAttribute('onclick','makeAppendFunction("%")()');
  buttonRects.push(btnModular);
  var btnDivision = makeButtonOperatorsRect('188', '92', "/");
  btnDivision.setAttribute('onclick', 'makeAppendFunction("/")()');
  buttonRects.push(btnDivision);
  var btnDel = makeButtonOperatorsRect('5','121','del');
  btnDel.setAttribute('onclick','pressBtnDelete()');
  buttonRects.push(btnDel);
  var btnClr = makeButtonOperatorsRect('66', '121', 'clr');
  btnClr.setAttribute('onclick', 'pressBtnClear()');
  buttonRects.push(btnClr);
  var btnEval = makeButtonOperatorsRect('127','121','=');
  btnEval.removeAttribute('onclick');
  btnEval.setAttribute('width','116');
  btnEval.setAttribute('id', 'eval');
  buttonRects.push(btnEval);

  // text 만들기
  buttonTexts.push(makeButtonText('28','23','7'));
  buttonTexts.push(makeButtonText('89', '23', '8'));
  buttonTexts.push(makeButtonText('150', '23', '9'));
  buttonTexts.push(makeButtonText('211', '23', '+'));
  buttonTexts.push(makeButtonText('28', '52', '4'));
  buttonTexts.push(makeButtonText('89', '52', '5'));
  buttonTexts.push(makeButtonText('150', '52', '6'));
  buttonTexts.push(makeButtonText('211', '52', '-'));
  buttonTexts.push(makeButtonText('28', '81', '1'));
  buttonTexts.push(makeButtonText('89', '81', '2'));
  buttonTexts.push(makeButtonText('150', '81', '3'));
  buttonTexts.push(makeButtonText('211', '81', '*'));
  buttonTexts.push(makeButtonText('28', '110', '0'));
  buttonTexts.push(makeButtonText('89', '110', '%'));
  buttonTexts.push(makeButtonText('153', '110', '.'));
  buttonTexts.push(makeButtonText('211', '110', '/'));
  buttonTexts.push(makeButtonText('28', '110', '0'));
  var textDel = makeButtonText('33','139','del');
  textDel.setAttribute('text-anchor','middle');
  buttonTexts.push(textDel);
  var textClr = makeButtonText('94', '139', 'clear');
  textClr.setAttribute('text-anchor', 'middle');
  buttonTexts.push(textClr);
  var textEval = makeButtonText('182', '132.5', '=');
  textEval.setAttribute('text-anchor', 'middle');
  textEval.setAttribute('alignment-baseline', 'middle');
  buttonTexts.push(textEval);

  // buttonRects에 들어있는 rect들을 SVG에 append
  for(var indexOfbuttonRects=0; indexOfbuttonRects<buttonRects.length; indexOfbuttonRects++){
    buttonSVG.appendChild(buttonRects[indexOfbuttonRects]);
  }
  // buttonTexts에 들어있는 text들을 SVG에 append
  for (var indexOfbuttonTexts = 0; indexOfbuttonTexts < buttonTexts.length; indexOfbuttonTexts++) {
    buttonSVG.appendChild(buttonTexts[indexOfbuttonTexts]);
  }
  buttonsDiv[0].appendChild(buttonSVG);
}

// 버튼 rect를 만드는 함수
function makeButtonNumbersRect(x,y,buttonfor){
  var buttonRect = createSVG('rect');
  var buttonRectAttr = {
    'class': 'numbers',
    'onclick': 'makeAppendFunction(' + buttonfor + ')()',
    'x': x,
    'y': y,
    'rx': '5',
    'ry': '5',
    'width': '55',
    'height': '23'
  }
  setAttributes(buttonRect, buttonRectAttr);
  return buttonRect;
}

// 버튼 rect operator를 만드는 함수
function makeButtonOperatorsRect(x, y, buttonfor) {
  var buttonRect = createSVG('rect');
  var buttonRectAttr = {
    'class': 'operators',
    'onclick': 'makeAppendFunction(' + buttonfor + ')()',
    'x': x,
    'y': y,
    'rx': '5',
    'ry': '5',
    'width': '55',
    'height': '23'
  }
  setAttributes(buttonRect, buttonRectAttr);
  return buttonRect;
}

// 버튼 text를 만드는 함수
function makeButtonText(x,y,textfor){
  var buttonText = createSVG('text');
  var buttonTextAttr = {
    'font-size' : '16',
    'x' : x,
    'y' : y,
    'pointer-events' : 'none'
  }
  setAttributes(buttonText, buttonTextAttr);
  buttonText.textContent = textfor;
  return buttonText;
}

// 그래프의 SVG를 만드는 함수
function makeGraphSVG(){
  var graphDiv = document.getElementsByClassName('graph');
  var graphSVG = createSVG('svg');
  var graphSVGAttr = {
    'width': '770',
    'height': '450'
  }
  setAttributes(graphSVG, graphSVGAttr);

  var graphGroups = [];

  // group 별로 하나씩, 일단 axis group 부터
  var pathGroup = createSVG('g');
  pathGroup.setAttribute('class', 'axis');
  var path = createSVG('path');
  var pathAttribute = {
    'd' : 'M100 30 L100 380 L740 380',
    'stroke' : 'black',
    'fill' : 'none'
  }
  setAttributes(path,pathAttribute);
  pathGroup.appendChild(path);
  graphGroups.push(pathGroup);

  // 두번째 Group x-labels
  var xLabelsGroup = createSVG('g');
  xLabelsGroup.setAttribute('class','labels x-labels');
  xLabelsGroup.appendChild(makeGraphText('140','400','First'));
  xLabelsGroup.appendChild(makeGraphText('257.5', '400', 'Second'));
  xLabelsGroup.appendChild(makeGraphText('395', '400', 'Third'));
  xLabelsGroup.appendChild(makeGraphText('532.5', '400', 'Fourth'));
  xLabelsGroup.appendChild(makeGraphText('670', '400', 'Fifth'));
  var graphXLabelTitle = makeGraphText('350', '430', 'Caculate Sequence');
  graphXLabelTitle.setAttribute('class', 'label-title');
  xLabelsGroup.appendChild(graphXLabelTitle);
  graphGroups.push(xLabelsGroup);

  // 세번재 Group y-labels
  var yLabelsGroup = createSVG('g');
  yLabelsGroup.setAttribute('class', 'labels y-labels');
  yLabelsGroup.appendChild(makeGraphText('50','50','100'));
  yLabelsGroup.appendChild(makeGraphText('60', '116', '80'));
  yLabelsGroup.appendChild(makeGraphText('60', '182', '60'));
  yLabelsGroup.appendChild(makeGraphText('60', '248', '40'));
  yLabelsGroup.appendChild(makeGraphText('60', '314', '20'));
  yLabelsGroup.appendChild(makeGraphText('70', '380', '0'));
  var graphYLabelTitle = makeGraphText('0','220','Result');
  graphYLabelTitle.setAttribute('class','label-title');
  yLabelsGroup.appendChild(graphYLabelTitle);
  yLabelsGroup.appendChild(makeGraphLine('50'));
  yLabelsGroup.appendChild(makeGraphLine('116'));
  yLabelsGroup.appendChild(makeGraphLine('182'));
  yLabelsGroup.appendChild(makeGraphLine('248'));
  yLabelsGroup.appendChild(makeGraphLine('314'));
  graphGroups.push(yLabelsGroup);

  // 네번째 Group Data
  var dataGroup = createSVG('g');
  dataGroup.setAttribute('class','data');
  dataGroup.appendChild(makeGraphRect('130'));
  dataGroup.appendChild(makeGraphRect('257.5'));
  dataGroup.appendChild(makeGraphRect('390'));
  dataGroup.appendChild(makeGraphRect('532.5'));
  dataGroup.appendChild(makeGraphRect('662'));
  dataGroup.appendChild(makeGraphCircle('150'));
  dataGroup.appendChild(makeGraphCircle('277.5'));
  dataGroup.appendChild(makeGraphCircle('410'));
  dataGroup.appendChild(makeGraphCircle('552.5'));
  dataGroup.appendChild(makeGraphCircle('682'));

  graphGroups.push(dataGroup);

  for(var indexOfGraphGroups=0; indexOfGraphGroups < graphGroups.length; indexOfGraphGroups++){
    graphSVG.appendChild(graphGroups[indexOfGraphGroups]);
  }
  graphDiv[0].appendChild(graphSVG);
}

// Graph의 Text를 만들어주는 함수
function makeGraphText(x, y, graphTextContent){
  var graphText = createSVG('text');
  var graphTextAttribute = {
    'x' : x,
    'y' : y,
  }
  setAttributes(graphText, graphTextAttribute);
  graphText.textContent = graphTextContent;

  return graphText;
}

// Graph의 line을 만들어주는 함수
function makeGraphLine(y){
  var graphLine = createSVG('line');
  var graphLineAttribute = {
    'x1' : '100',
    'y1' : y,
    'x2' : '740',
    'y2' : y,
    'stroke' : 'black',
    'stroke-dasharray' : '5,5'
  }
  setAttributes(graphLine, graphLineAttribute);
  return graphLine;
}

// Graph의 직사각형을 만드는 함수
function makeGraphRect(x){
  var graphRect = createSVG('rect');
  var graphRectAttribute = {
    'class' : 'bar',
    'x' : x,
    'y' : '380',
    'width' : '40',
    'height' : '0',
    'stroke' : 'black'
  }
  setAttributes(graphRect, graphRectAttribute);
  return graphRect;
}

// Graph의 원을 만드는 함수
function makeGraphCircle(cx){
  var graphCircle = createSVG('circle');
  var graphCircleAttribute = {
    'cx' : cx,
    'cy' : '380',
    'r' : '4'
  }
  setAttributes(graphCircle, graphCircleAttribute);
  return graphCircle;
}

// SVG tag를 동적으로 생성해주는 함수
function createSVG(tagname){
  return document.createElementNS(svgNameSpace, tagname);
}

// SVG tag의 attribute를 설정해주는 함수
function setAttributes(element, attrs){
  for(var key in attrs){
    element.setAttribute(key, attrs[key]);
  }
}
// 입력으로 받는 operator 형태에 따라 다른 함수를 반환하는 Closure 추가
// 이 함수 하나로 +, - 등의 연산자와 숫자의 append 처리가 가능하다.
function makeAppendFunction(char){
  var char = char;
  function appendchar(){
    // 결과값일 경우, 연산자가 오면 이어서 연산자를 append, 숫자가 오면 새로운 식의 시작으로 인식
    if(isResult){
      if(char == '+' || char == '-' || char == '*' || char =='/' || char == '%'){
        addInnerText(displayId, char);
        isResult = false;
      }else{
        modifyInnerText(displayId, char);
        isResult = false; 
      }
    }else{
      addInnerText(displayId, char);
    }
  }
  return appendchar;
}

function changeMidValue(displayId){
  var displayText = displayId.textContent;
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
        modifyInnerText(midValueId, eval(displayId.textContent));
      }
    }else{
      modifyInnerText(midValueId, '');
    }
  } else { // 식의 값이 NULL 이라면
    modifyInnerText(midValueId, '');
  }
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
    bars[indexOfQueue].setAttribute('y', translateToY(resultValueQueue[indexOfQueue]));
    bars[indexOfQueue].setAttribute('height', translateToHeight(resultValueQueue[indexOfQueue]));
  }
}

// 계산된 값을 그래프에서 쓰일 bar chart의 높이값으로 변경해주는 함수
function translateToHeight(resultValue){
  if(resultValue >= 110){
    return (graphCoeff) * 110;
  }
  return (graphCoeff)*resultValue;
}

// 계산된 값을 그래프에서 쓰일 좌표 y값으로 변경해주는 함수
function translateToY(resultValue){
  if(resultValue >= 110){
    return defaultY - translateToHeight(110);
  }
  return defaultY - translateToHeight(resultValue);
}