# <과제>
오늘은 이미 해주신 분들은 참고하실 겸, d3.js와 chart.js를 한번 연구해주세요.  
이들 라이브러리들이 어떻게 호출되는 구조를 가지고 있는지를 살펴보시고, 간단한 예제로 앞서 해주신 막대그래프 그리는 영역 아래  
d3.js나 chart.js로 구성된 동일한 기능을 하는 막대그래프를 추가해주세요. 각 라이브러리가 가진 철학, 컨셉을 이해하는 것이 목적이지,  
라이브러리 자체를 깊이 배우려는 것은 아니니까 너무 무리하진 마시구요^^  
관련된 필요한 링크들을 먼저 찾으신 분은 여기에 공유해주시는 것도 서로 도움이 될 거에요. 잘 부탁드립니다.  

# <과제 수행사항 및 새롭게 알게된 내용>

## D3.js
  D3.js는 데이터에 기반하여 문서를 다루는 자바스크립트 라이브러리이다.  
  D3는 HTML, SVG, CSS를 사용하여 데이터를 가져오는 것을 돕는다.  
  D3는 임의의 데이터를 DOM에 바인딩 하는 것과 데이터에 기반한 변형을 문서에 적용하는 것을 가능하게 한다.  
  또는 interactive한 SVG bar chart를 부드러운 interaction과 transition으로 생성하는 것을 가능하게 한다.
  D3는 상상할 수 있는 모든 feature를 제공하는 거대한 프레임워크가 아니다.  
  대신에, D3는 문제의 핵심을 해결한다 : 데이터에 기반한 문서의 효율적 조작  
  최소한의 오버헤드로, D3는 매우 빠르며, interaction과 animation을 위한  
  dynamic behavior과 큰 dataset을 지원한다.
    
  ### Selections
  D3는 기존의 DOM API보다 더 간편한 API를 제공한다.
  d3.selectAll("p").style("color", "white");
  d3.select("body").style("background-color", "black");
  jquery에서 사용하는 선택자와 비슷해 보이지만,  
  jquery에서는 이미 존재하는 태그를 선택해야 하지만 d3에서는 존재하지 않는 태그를 선택해야 한다는 차이점이 존재한다.  
  
  ### Method Chaining
  ```
  var body = d3.select("body");
  body.style("color", "black");
  body.style("background-color", "white");
  ```
  With Method Chaining
  ```
  d3.select("body")
      .style("color", "black")
      .style("background-color", "white");
  ```
  Method Chaing은 문서 구조의 아래로 내려가는 것에만 쓰일 수 있다. 
  거의 모든 연산이 같은 selection을 반환하는 반면에, 새로운 것을 반환하는 몇가지 메소드가 있다.  
  예를 들어, selection.append는 새로운 element를 포함하는 새로운 selection을 반환한다.  

  ### Scaling to Fit
  데이터를 그래프에 나타낼 때, 생길 수 있는 magic number의 문제점을 해결하기 위해,  
  linear scale을 사용할 수 있다.  
  D3의 scale들은 data space 로부터 display space로의 명시적인 매핑을 담당한다. 
  ```
  var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);
  ```
  위의 식에서 x는 객체처럼 보이지만, scaled 된 display value를 반환하는 함수처럼  
  동작한다. 이것을 사용함으로써, hard-coded 되어있던 곱셈을 간단하게 대체할 수 있다.  
  ```
  d3.select(".chart")
  .selectAll("div")
    .data(data)
  .enter().append("div")
    .style("width", function(d) { return x(d) + "px"; })
    .text(function(d) { return d; });
  ```

  ### SVG
  flow layout을 사용하여 암묵적으로 위치되는 div element와는 다르게, SVG element는   
  반드시 origin에 대해 상대적으로 변환된 위치가 필요하다.

  ### Transitions
  For example, to fade the background of the page to black:  
  ```
  d3.select("body").transition()
      .style("background-color", "black");
  ```
  Or, to resize circles in a symbol map with a staggered delay:  
  ```
  d3.selectAll("circle").transition()
      .duration(750)
      .delay(function(d, i) { return i * 10; })
      .attr("r", function(d) { return Math.sqrt(d * scale); });
  ```

  ### D3의 Method 목록과 설명
  d3.select("") : HTML의 요소를 선택하는 Method
  .append("") : 선택된 요소에 새로운 tag를 append하는 Method
  .text("") : 선택된 요소에 text를 추가하는 Method
  .style(" ", " ") : 선택된 요소의 스타일을 변경하는 Method. 첫번째 인자는 Style Attribute, 두번째는 Value.  
  .attr(" ", " ") : 선택된 요소에 attribute를 추가해주는 Method.

  ### SVG로 만든 그래프를 D3로 옮기는 절차
  1. svg 태그를 넣어줄 태그를 선택하고 svg 태그를 append한다.
  2. svg 태그의 attribute를 설정한다.(width, height)
  3. 위에서 선언한 내용을 변수에 저장한다.
  ```
  var canvas = d3.select("d3Graph")
                 .append("svg")
                 .attr("width", 500)
                 .attr("height", 500);
  ```
  4. 선언된 변수에 원하는 svg 도형을 append한다.
  ```
  var rect = canvas.append("rect")
                   .attr("width", 100)
                   .attr("height", 50);
  var line = canvas.append("line")
                   .attr("x1", 0)
                   .attr("y1", 100)
                   .attr("x2", 400)
                   .attr("y2", 400)
                   .attr("stroke", "green")
                   .attr("stroke-width", 10);
  ```
  5. 그래프에 그릴 데이터를 선언하고, enter한 뒤 각 데이터에 대한 속성을 정의한다.
  ```
  var dataArray = [20, 40, 50];
  var bars = canvas.selectAll("rect") //empty selection
                   .data(dataArray) // bind data to empty selection
                   .enter() // enter method는 각각의 data element들에 placeholder를 만든다.
                      .append("rect")
                      .attr("width", function(d){ return d; }) // d는 각 data element를 의미한다.  
                      .attr("height", 50)
                      .attr("y", function(d,i){ return i * 100}); // 첫번째는 데이터, 두번째는 인덱스 of 데이터
  ```
  6. Scale을 정한다.
  정해진 dataset에 대한 width, height, y 값 등에 대한 scale을 정의하는 함수를 만든다.
  Scale은 함수이기도 하면서, 객체이기도 하다.   
  input range를 받아서, svg container에 맞는 새로운 range로 바꿔주는 역할.
  max input value에 맞춰서 다른 input value들의 scale을 정한다.
  ```
  var width = 500;
  var height = 500;
  var widthScale = d3.scale.linear()
                  .domain([0, 60]) // domain 값의 최소, 최대를 정해준다.
                  .range([0, width]); // 결과값의 최소, 최대를 정해준다.
  //이렇게 하면, bars의 width attribute function을 아래와 같이 수정해줄 수 있다.
  .attr("width", function(d){return widthScale(d);})
  ```
  Color에 대한 Scale을 설정할 수도 있다.
  ```
  var colorScale = d3.scale.linear()
                     .domain([0,60])
                     .range(["red","blue"]);
  ```
  위 코드에서는 숫자가 클수록 파란색에 가까운 color를 반환한다.

  7. Group과 Axis를 설정한다.
  ```
  //Axis 설정
  var axis = d3.svg.axis()
               .ticks(5) // 나눠지는 범위를 정할 수 있다.
               .scale(widthScale);
  //canvas variable로 돌아간다.
  var canvas = d3.select("d3Graph")
                 .append("svg")
                 .attr("width", width)
                 .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(20,0)"); // group을 이동시키는 속성 transform
  canvas.append("g")
        .attr("transform", "translate(0, 400)")
        .call(axis);
  ```
  8. D3 enter(), update(), exit()
  http://lumiamitie.github.io/d3/d3-enter-update-exit/