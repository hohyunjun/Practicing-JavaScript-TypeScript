"use strict";
var displayId = 'display';
var midValueId = 'mid-value';
var evalId = 'eval';
var barClassName = 'bar';
var resultValueQueue = [];
var defaultX = 120;
var defaultBarY = 380;
var defaultBarWidth = 40;
var graphCoeff = 3.3;
var isResult = false;
var svgNameSpace = 'http://www.w3.org/2000/svg';
var barChart;
document.addEventListener('DOMContentLoaded', function () {
    makeDisplaySVG();
    makeButtonSVG();
    makeGraphSVG();
    document.getElementById(displayId).addEventListener('DOMSubtreeModified', function () {
        changeMidValue(this);
    });
    document.getElementById(evalId).addEventListener('click', function () {
        modifyInnerText(displayId, eval(document.getElementById(displayId).textContent));
        isResult = true;
        appendQueue(Number(document.getElementById(displayId).textContent));
        representBar();
    });
});
function makeDisplaySVG() {
    var displaySVG = createSVG('svg');
    var displayAttr = {
        'width': '240',
        'height': '80'
    };
    setAttributes(displaySVG, displayAttr);
    var displayRect = createSVG('rect');
    var rectAttr = {
        'rx': '10',
        'ry': '10',
        'width': '240',
        'height': '80',
        'style': 'fill:black;'
    };
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
    };
    setAttributes(displayText, displayTextAttr);
    displaySVG.appendChild(displayText);
    var midValueText = createSVG('text');
    var midValueTextAttr = {
        'id': 'mid-value',
        'font-size': '16',
        'x': '120',
        'y': '60'
    };
    setAttributes(midValueText, midValueTextAttr);
    displaySVG.appendChild(midValueText);
}
function makeButtonSVG() {
    var buttonsDiv = document.getElementsByClassName('buttons');
    var buttonSVG = createSVG('svg');
    var buttonSVGAttr = {
        'width': '250',
        'height': '150'
    };
    setAttributes(buttonSVG, buttonSVGAttr);
    var buttonRects = [];
    var buttonTexts = [];
    buttonRects.push(makeButtonNumbersRect('5', '5', '7'));
    buttonRects.push(makeButtonNumbersRect('66', '5', '8'));
    buttonRects.push(makeButtonNumbersRect('127', '5', '9'));
    buttonRects.push(makeButtonNumbersRect('5', '34', '4'));
    buttonRects.push(makeButtonNumbersRect('66', '34', '5'));
    buttonRects.push(makeButtonNumbersRect('127', '34', '6'));
    buttonRects.push(makeButtonNumbersRect('5', '63', '1'));
    buttonRects.push(makeButtonNumbersRect('66', '63', '2'));
    buttonRects.push(makeButtonNumbersRect('127', '63', '3'));
    buttonRects.push(makeButtonNumbersRect('5', '92', '0'));
    var btnDot = makeButtonNumbersRect('127', '92', '.');
    btnDot.setAttribute('onclick', 'makeAppendFunction(".")()');
    buttonRects.push(btnDot);
    var btnPlus = makeButtonOperatorsRect('188', '5', '+');
    btnPlus.setAttribute('onclick', 'makeAppendFunction("+")()');
    buttonRects.push(btnPlus);
    var btnMinus = makeButtonOperatorsRect('188', '34', "-");
    btnMinus.setAttribute('onclick', 'makeAppendFunction("-")()');
    buttonRects.push(btnMinus);
    var btnMultiply = makeButtonOperatorsRect('188', '63', "*");
    btnMultiply.setAttribute('onclick', 'makeAppendFunction("*")()');
    buttonRects.push(btnMultiply);
    var btnModular = makeButtonOperatorsRect('66', '92', '%');
    btnModular.setAttribute('onclick', 'makeAppendFunction("%")()');
    buttonRects.push(btnModular);
    var btnDivision = makeButtonOperatorsRect('188', '92', "/");
    btnDivision.setAttribute('onclick', 'makeAppendFunction("/")()');
    buttonRects.push(btnDivision);
    var btnDel = makeButtonOperatorsRect('5', '121', 'del');
    btnDel.setAttribute('onclick', 'pressBtnDelete()');
    buttonRects.push(btnDel);
    var btnClr = makeButtonOperatorsRect('66', '121', 'clr');
    btnClr.setAttribute('onclick', 'pressBtnClear()');
    buttonRects.push(btnClr);
    var btnEval = makeButtonOperatorsRect('127', '121', '=');
    btnEval.removeAttribute('onclick');
    btnEval.setAttribute('width', '116');
    btnEval.setAttribute('id', 'eval');
    buttonRects.push(btnEval);
    buttonTexts.push(makeButtonText('28', '23', '7'));
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
    var textDel = makeButtonText('33', '139', 'del');
    textDel.setAttribute('text-anchor', 'middle');
    buttonTexts.push(textDel);
    var textClr = makeButtonText('94', '139', 'clear');
    textClr.setAttribute('text-anchor', 'middle');
    buttonTexts.push(textClr);
    var textEval = makeButtonText('182', '132.5', '=');
    textEval.setAttribute('text-anchor', 'middle');
    textEval.setAttribute('alignment-baseline', 'middle');
    buttonTexts.push(textEval);
    for (var indexOfbuttonRects = 0; indexOfbuttonRects < buttonRects.length; indexOfbuttonRects++) {
        buttonSVG.appendChild(buttonRects[indexOfbuttonRects]);
    }
    for (var indexOfbuttonTexts = 0; indexOfbuttonTexts < buttonTexts.length; indexOfbuttonTexts++) {
        buttonSVG.appendChild(buttonTexts[indexOfbuttonTexts]);
    }
    buttonsDiv[0].appendChild(buttonSVG);
}
function makeButtonNumbersRect(x, y, buttonfor) {
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
    };
    setAttributes(buttonRect, buttonRectAttr);
    return buttonRect;
}
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
    };
    setAttributes(buttonRect, buttonRectAttr);
    return buttonRect;
}
function makeButtonText(x, y, textfor) {
    var buttonText = createSVG('text');
    var buttonTextAttr = {
        'font-size': '16',
        'x': x,
        'y': y,
        'pointer-events': 'none'
    };
    setAttributes(buttonText, buttonTextAttr);
    buttonText.textContent = textfor;
    return buttonText;
}
function makeGraphSVG() {
    var graphDiv = document.getElementsByClassName('graph');
    var graphSVG = createSVG('svg');
    var graphSVGAttr = {
        'width': '770',
        'height': '450'
    };
    setAttributes(graphSVG, graphSVGAttr);
    var graphGroups = [];
    var pathGroup = createSVG('g');
    pathGroup.setAttribute('class', 'axis');
    var path = createSVG('path');
    var pathAttribute = {
        'd': 'M100 30 L100 380 L740 380',
        'stroke': 'black',
        'fill': 'none'
    };
    setAttributes(path, pathAttribute);
    pathGroup.appendChild(path);
    graphGroups.push(pathGroup);
    var xLabelsGroup = createSVG('g');
    xLabelsGroup.setAttribute('class', 'labels x-labels');
    xLabelsGroup.appendChild(makeGraphText('140', '400', 'First'));
    xLabelsGroup.appendChild(makeGraphText('257.5', '400', 'Second'));
    xLabelsGroup.appendChild(makeGraphText('395', '400', 'Third'));
    xLabelsGroup.appendChild(makeGraphText('532.5', '400', 'Fourth'));
    xLabelsGroup.appendChild(makeGraphText('670', '400', 'Fifth'));
    var graphXLabelTitle = makeGraphText('350', '430', 'Calculate Sequence');
    graphXLabelTitle.setAttribute('class', 'label-title');
    xLabelsGroup.appendChild(graphXLabelTitle);
    graphGroups.push(xLabelsGroup);
    var yLabelsGroup = createSVG('g');
    yLabelsGroup.setAttribute('class', 'labels y-labels');
    yLabelsGroup.appendChild(makeGraphText('50', '50', '100'));
    yLabelsGroup.appendChild(makeGraphText('60', '116', '80'));
    yLabelsGroup.appendChild(makeGraphText('60', '182', '60'));
    yLabelsGroup.appendChild(makeGraphText('60', '248', '40'));
    yLabelsGroup.appendChild(makeGraphText('60', '314', '20'));
    yLabelsGroup.appendChild(makeGraphText('70', '380', '0'));
    var graphYLabelTitle = makeGraphText('0', '220', 'Result');
    graphYLabelTitle.setAttribute('class', 'label-title');
    yLabelsGroup.appendChild(graphYLabelTitle);
    yLabelsGroup.appendChild(makeGraphLine('50'));
    yLabelsGroup.appendChild(makeGraphLine('116'));
    yLabelsGroup.appendChild(makeGraphLine('182'));
    yLabelsGroup.appendChild(makeGraphLine('248'));
    yLabelsGroup.appendChild(makeGraphLine('314'));
    graphGroups.push(yLabelsGroup);
    var dataGroup = createSVG('g');
    dataGroup.setAttribute('class', 'data');
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
    for (var indexOfGraphGroups = 0; indexOfGraphGroups < graphGroups.length; indexOfGraphGroups++) {
        graphSVG.appendChild(graphGroups[indexOfGraphGroups]);
    }
    graphDiv[0].appendChild(graphSVG);
}
function makeGraphText(x, y, graphTextContent) {
    var graphText = createSVG('text');
    var graphTextAttribute = {
        'x': x,
        'y': y,
    };
    setAttributes(graphText, graphTextAttribute);
    graphText.textContent = graphTextContent;
    return graphText;
}
function makeGraphLine(y) {
    var graphLine = createSVG('line');
    var graphLineAttribute = {
        'x1': '100',
        'y1': y,
        'x2': '740',
        'y2': y,
        'stroke': 'black',
        'stroke-dasharray': '5,5'
    };
    setAttributes(graphLine, graphLineAttribute);
    return graphLine;
}
function makeGraphRect(x) {
    var graphRect = createSVG('rect');
    var graphRectAttribute = {
        'class': 'bar',
        'x': x,
        'y': '380',
        'width': '40',
        'height': '0',
        'stroke': 'black'
    };
    setAttributes(graphRect, graphRectAttribute);
    return graphRect;
}
function makeGraphCircle(cx) {
    var graphCircle = createSVG('circle');
    var graphCircleAttribute = {
        'cx': cx,
        'cy': '380',
        'r': '4'
    };
    setAttributes(graphCircle, graphCircleAttribute);
    return graphCircle;
}
function createSVG(tagname) {
    return document.createElementNS(svgNameSpace, tagname);
}
function setAttributes(element, attrs) {
    for (var key in attrs) {
        element.setAttribute(key, String(attrs[key]));
    }
}
function makeAppendFunction(char) {
    var char = char;
    function appendchar() {
        if (isResult) {
            if (char == '+' || char == '-' || char == '*' || char == '/' || char == '%') {
                addInnerText(displayId, char);
                isResult = false;
            }
            else {
                modifyInnerText(displayId, char);
                isResult = false;
            }
        }
        else {
            addInnerText(displayId, char);
        }
    }
    return appendchar;
}
function changeMidValue(displayId) {
    var displayText = displayId.textContent;
    var countOperator = 0;
    if (displayText != "") {
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
        if (countOperator != 0) {
            var endOfDisplayText = displayText[displayText.length - 1];
            if (endOfDisplayText == '+'
                || endOfDisplayText == '-'
                || endOfDisplayText == '*'
                || endOfDisplayText == '/'
                || endOfDisplayText == '%') {
                modifyInnerText(midValueId, '');
            }
            else {
                modifyInnerText(midValueId, eval(displayId.textContent));
            }
        }
        else {
            modifyInnerText(midValueId, '');
        }
    }
    else {
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
    document.getElementById(displayId).setAttribute('x', String(defaultX));
}
function modifyInnerText(elementId, innerValue) {
    if (innerValue != '') {
        document.getElementById(elementId).setAttribute('x', String(defaultX - (String(innerValue).length * 5)));
    }
    document.getElementById(elementId).textContent = innerValue;
}
function addInnerText(elementId, innerValue) {
    var originalX = document.getElementById(elementId).getAttribute('x');
    if (document.getElementById(elementId).textContent.length == 0) {
        document.getElementById(elementId).setAttribute('x', String(defaultX));
    }
    document.getElementById(elementId).textContent += innerValue;
    document.getElementById(elementId).setAttribute('x', String(Number(originalX) - 5));
}
function appendQueue(resultValue) {
    if (resultValueQueue.length < 5) {
        resultValueQueue.push(resultValue);
    }
    else {
        resultValueQueue.shift();
        resultValueQueue.push(resultValue);
    }
}
function representBar() {
    var bars = document.getElementsByClassName(barClassName);
    for (var indexOfQueue = 0; indexOfQueue < resultValueQueue.length; indexOfQueue++) {
        bars[indexOfQueue].setAttribute('y', String(translateToY(resultValueQueue[indexOfQueue])));
        bars[indexOfQueue].setAttribute('height', String(translateToHeight(resultValueQueue[indexOfQueue])));
    }
}
function translateToHeight(resultValue) {
    if (resultValue >= 110) {
        return (graphCoeff) * 110;
    }
    return (graphCoeff) * resultValue;
}
function translateToY(resultValue) {
    if (resultValue >= 110) {
        return defaultBarY - translateToHeight(110);
    }
    return defaultBarY - translateToHeight(resultValue);
}
//# sourceMappingURL=Calculate.js.map