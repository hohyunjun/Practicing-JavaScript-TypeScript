
## <피드백>
앞서 이상윤 인턴과 마찬가지로 그래프 최대치를 넘어가도 그래프를 너무 넘어가는 느낌이 들지 않게 해주시면 좋겠습니다.  
더불어, 같은 문제입니다만, 계산 결과를 보는 상태에서 숫자를 누르면 새로운 계산이 시작되도록 해주시면 좋겠습니다.  
기존 계산기 앱을 살펴보시고 한번 비교해가며 잡아가시면 될거에요.  

## <개선사항>
1. 계산 결과를 보는 상태에서 숫자를 누르면 새로운 계산이 시작되도록 해주시면 좋겠습니다  
  ====> = 버튼을 눌러서 계산 결과를 보는 상태에서 숫자를 누르면 새로운 계산이 시작되도록,  
        연산자를 누를 경우 결과값에 이어서 계산이 이루어지도록 계산기의 기능을 추가하였습니다.  
        ex) 2+3 = 5라는 결과값이 나온 상태에서 + 를 누를 경우 5+ 형태로 진행  
            숫자 3을 누를 경우, 5라는 값이 없어지고 숫자 3만 display됨  

2. 그래프 최대치를 넘어가도 그래프를 너무 넘어가는 느낌이 들지 않게 해주시면 좋겠습니다.  
  ====> 110 이상의 값이 주어질 경우 value를 110으로 처리하도록 하였습니다.  
  ====> 110 을 넘어갔을 때 curve path를 넣어 한눈에 넘어갔음을 보이도록 처리하는 것을 도전했으나,   
        그래프 결과값 데이터가 5를 넘어갔을 때, 그래프 svg가 왼쪽으로 shift되는 것에서 코드가 너무 길어지고 복잡해 질 것 같아 진행을   중단했습니다.  

3. 코드 가독성  
  ====> makeAppendFunction에서 인자에 대해 operator라는 이름을 붙였었는데,   
        인자로 숫자와 operator가 모두 올 수 있어 혼동을 줄 수 있으므로 char라는 이름의 변수로 수정하였습니다.    
  ====> 중간값을 계산하는 코드를 함수로 따로 만들었습니다. changeMidValue() 함수.  
  
## <과제>
계산기과 그래프의 기본틀에 해당하는 SVG를 생성하는 JS 코드들을 만들어 활용하는 구조로 바꾸어주세요

결과적으로 HTML 코드를 최소화하고, HTML 파일에는 SVG 코드가 없어야합니다.

## <과제 개선사항 및 새롭게 알게된 내용>

1. SVG는 XHTML 언어이므로 동적으로 생성할 때는 createElement를 사용하면 안되고, createElementNS를 사용해야 한다.  
   createElement를 사용해서 동적 삽입할 경우 개발자 도구의 태그에는 추가된 것으로 보이지만,
   실제로 화면에 그려지진 않는다.  
   element = document.createElementNS(namespaceURI, qualifiedName);

2. 동적으로 svg를 추가하기 위해 매번 속성을 설정하고 tag를 생성해주는 번거로움을 해결하기 위해   
   tag를 생성해주는 함수와 속성을 설정해주는 함수를 만들었다.

3. 아래 함수 호출 과정에서, buttonfor에 '+', '.' 등을 넣어서 함수 호출 시 에러 발생  
    ```
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
    ```  
    Uncaught SyntaxError: Unexpected token * 에러가 발생함.  
    해결책을 찾지못해 명시적으로 다시 onclick Attribute를 선언했음.

4. 여러 개의 태그들을 최소한의 코드로 append하기 위해 태그들을 저장할 배열을 만들었음.  
    button에서는 buttonRects, buttonTexts  
    graph에서는 graphGroups  
    해당 배열의 요소들을 반복문을 통해 접근해 append하도록 하여 코드 수를 줄였음.  

5. 비슷한 속성값을 가지는 태그들의 속성을 지정해주고 생성해주는 작업을 함수로 만들었음.  
    비슷한 속성끼리 가지는 차이점만 함수의 매개변수로 넘겨줘서, 매개변수에 따라 다른 태그를 생성하도록 했음.  
    예를 들어, 그래프에서 x축에 수평으로 있는 점선 5개는 y값만 다를 뿐, 나머지 속성은 모두 같으므로,  
    y값만 매개변수로 넘겨줘서 y값만 다른 SVG 태그를 생성해 반환하도록 함수를 선언했음.  
    이를 통해 코드의 줄 수를 줄였음.
