# <과제>
오늘은 여러분께서 chart.js를 통해 보셨던 그래프 그리기 애니메이션을 기존에 직접 작성해주신 SVG그래프에 적용해보시기 바래요.  
힌트를 드리자면 CSS 3를 이용한 방법이 있고, 구형 웹브라우저를 고려해서 타이머를 직접 만들어 타이밍마다 업데이트하는 방법도 있습니다.  

# <과제 수행사항>

## 1. CSS Animation
  CSS Animation은 거의 모든 HTML 요소들의 Animation을 Javascript나 Flash없이 가능하도록 해 준다.  
  CSS Animation을 사용하기 위해서는, animation을 위한 keyframe을 먼저 명시해 주어야 한다.  
  Keyframe들은 특정 시간에 요소가 어떤 Style을 가지게 될 지를 hold 해준다.  

  ### 1.1 @keyframes Rule
  @keyframes rule 내부에 CSS Style을 명시하면, Animation은 현재 스타일로부터 새로운 스타일로 점차적으로  
  변화한다. Animation이 동작하게 하기 위해, Element에 animation을 바인딩 해야만 한다.  
  ```
  /* The animation code */
  @keyframes example {
      from {background-color: red;}
      to {background-color: yellow;}
  }

  /* The element to apply the animation to */
  div {
      width: 100px;
      height: 100px;
      background-color: red;
      animation-name: example;
      animation-duration: 4s;
  }
  ```
  from 과 to keyword 대신에 퍼센트를 사용할 수도 있다.  
  ```
  /* The animation code */
  @keyframes example {
      0%   {background-color: red;}
      25%  {background-color: yellow;}
      50%  {background-color: blue;}
      100% {background-color: green;}
  }

  /* The element to apply the animation to */
  div {
      width: 100px;
      height: 100px;
      background-color: red;
      animation-name: example;
      animation-duration: 4s;
  }
  ```
  Animation 지정 시 줄 수 있는 옵션의 종류는 아래와 같다.
  ```
    animation-name: example;
    animation-duration: 4s;
    animation-delay: -2s;
    animation-iteration-count: 3; --> infinite가능
    animation-direction: reverse; --> normal, reverse, alternate, alternate-reverse  
  ```

  ### 1.2 요구사항 파악
  evaluation button을 눌렀을 때, svg graph의 높이가 0부터 목표치까지 증가하면서 나타난다.

  ### 1.3 수행결과
  해당하는 bar 그래프의 SVG 태그에 transition option만을 주면 간단하게 해결할 수 있었다.
  ```
  /* SVG graph Animate CSS */
  .data rect{
    transition: all 1.5s;
  }
  ```
  참고 url : https://www.youtube.com/watch?v=IM8eTD01UE8  
  하지만, D3 Graph의 경우 transition option이 적용되지 않았다.  
  아마도 rect를 enter하는 과정에는, 기존의 rect를 사용하는 것이 아니라 새로 만드는 것이라서  
  transition option이 적용되지 않는 것 같았다.  
  그래서 enter하는 경우의 d3 코드에, y와 height부분을 실행할 때 transition 옵션을 주었다.
  ```
  var bars = dataGroup.selectAll("rect")
              .data(resultValueQueue)
              .enter()
              .append("rect")
              .attr("class", "bar")
              .attr("x", function (d, i) {return xScale(i);})
              .attr("width", defaultBarWidth)
              .attr("y", defaultBarY)
              .attr("height", 0)
              .transition()
              .duration(150)
              .attr("y", function (d) {if(d>110){d=110;} return yScale(d);})
              .attr("height", function (d) {if(d>110){d=110;} return heightScale(d);})
              .attr("stroke", "black");
  ```
  transition의 방향을 아래에서부터 증가하도록 하기 위해 초기 y와 height를 위에 지정해주었다. 
  CSS Animation에 대해 알아보긴 했지만, 사실상 CSS Animation이 아니라 Transition 하나로 모든 것이 해결되었다.