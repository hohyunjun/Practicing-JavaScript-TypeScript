# <과제>
기존 데이터시각화 웹 프레임워크 분석
* 얼마나 많은 차트 유형을 제공하는가?
* 동일한 차트(막대, 원그래프 등)의 예제 코드를 직접 작성해 제시
* 응용코드를 만드는데 얼마나 많은 학습이 필요한가? 개발 난이도는 어떠한가?
* 실행되는 속도는 다른 프레임워크에 비해 어떠한가?
* 문서화는 어느정도 지원되고 있는가?
* 장점과 단점을 짧게 요약

최대한 많은 웹프레임워크들을 활용해 기본 제공하는 다양한 유형의 차트들을 만들어보시기 바랍니다.

## 시각화 웹 프레임워크 비교
---
결론부터 말하자면, 비교결과는 아래와 같다.
* 실행속도(빠른 순서) : **D3.js > Chart.js > billboard.js**
* 개발 난이도(쉬운 순서) : **Chart.js == billboard.js > D3.js**
* 문서화 정도(잘 되어있는 순서) : **billboard.js > chart.js > D3.js**
* 차트의 다양성 : **D3.js > chart.js >= billboard.js**

## 각 웹 프레임워크의 실행속도 비교
---
console.time과 console.timeEnd API를 이용해 Bar, Pie, Bubble, Line 차트별로 속도를 측정해보았다.
```
1. Bar Chart
  d3.js : 3~9ms
  chart.js : 19~40ms
  billboard.js : 90~130ms

2. Pie Chart
  d3.js : 3~9ms
  chart.js : 11~22ms
  billboard.js : 85~115ms

3. Bubble Chart
  d3.js : 6~10ms
  chart.js : 21~33ms
  billboard.js : 97~159ms

4. Line Chart
  d3.js : 6~11ms
  chart.js : 23~35ms
  billboard.js : 83~122ms
```
물론 각 프레임워크별로 정확하게 똑같은 차트를 그리지는 않았지만, 실행속도에 있어서 유의미한 차이를 보이는 것을 알 수 있다.
실행속도는 D3가 가장 빠르고, 두번째는 Chart.js, 그리고 끝으로 billboard.js가 가장 느렸다.
**즉, 실행속도가 빠른 순서로 D3 > Chart.js > billboard.js**
그리고 각 차트 종류별로는 실행속도의 차이가 크게 나지 않았다.

## D3.js
---
  ```
  구현 편의성 : 하  
  구현 난이도 : 상  
  구현의 유연성 : 상
  실행 속도 : 빠름  
  SVG 기반
  ```
  ### 1. 얼마나 많은 차트 유형을 제공하는가?
  Bar Chart, Histogram, Pareto, Line and Area Chart, Pie Chart, ScatterPlot and Bubble Chart 등 셀 수 없을 만큼  
  많은 차트 유형을 제공한다. 차트 뿐만 아니라 지도 등의 다양한 시각화 자료들을 만들 수 있다.  
  https://github.com/d3/d3/wiki/Gallery

  ### 2. 응용코드를 만드는데 얼마나 많은 학습이 필요한가? 개발 난이도는 어떠한가?
  응용코드를 만드는데 다른 시각화 프레임워크에 비해 많은 학습이 필요하다. 개발 난이도도 높은 편이다.

  ### 3. 문서화 지원 정도
  https://github.com/d3/d3/wiki/Tutorials  
  Tutorial의 자료가 굉장히 많고 잘 정리되어 있다.  
  학습할 내용이 어려워서 그렇지 학습을 위한 자료들은 매우 잘 되어 있다.

  ### 4. 장점  
  직접적으로 그래프를 그리는 도구이기 때문에 그래프나 시각화를 폭넓게 구현할 수 있다.(원하는 대로 그릴 수 있다.)
  브라우저 내장 요소 검사기를 활용해서 쉽게 디버깅을 할 수 있다  
  그냥 SVG 태그를 사용해서 구현하는 것보다 훨씬 간편하게 SVG 태그를 활용하는 구현을 할 수 있도록 도와준다.
  다른 시각화 웹 프레임워크들에 비해서 속도가 유의미하게 빠르다.

  ### 5. 단점
  사용법이 굉장히 복잡하다. SVG 기반이므로 그래프의 좌표를 하나하나 다 따져서 그려야 하므로 난이도가 높고 시간이 많이 소요된다.
  최신 표준 기술을 지원하는 IE8+ 웹 브라우저에서만 구동된다.
  똑같은 그래프를 구현하더라도 다른 라이브러리에 비해 코드가 길고 이해하기 힘들다.

## Chart.js
---
  ```
  구현 편의성 : 상  
  구현 난이도 : 하  
  구현의 유연성 : 중  
  Canvas 기반  
  ```
  ### 1. 얼마나 많은 차트 유형을 제공하는가?
  차트의 종류는 충분히 다양하지만, D3.js 만큼 다양하지는 않다.
  또한, D3는 차트 뿐만 아니라 다른 다양한 시각화 자료를 만들 수 있지만,  
  Chart.js는 오직 차트를 만드는 것에 특화되어 있다.
  
  ### 2. 응용코드를 만드는데 얼마나 많은 학습이 필요한가? 개발 난이도는 어떠한가?
  Chart.js에서 정해진 API 틀에 사용자가 원하는 데이터나 옵션을 넣기만 하면 원하는 차트를 쉽게 그릴수 있다.
  간단한 차트를 만드는 데 많은 학습이 필요하지 않다.
  개발 난이도는 낮다고 볼 수 있다.

  ### 3. 문서화 지원 정도
  D3.js 보다 문서화가 좀 더 구조화되어 있다.  
  D3.js 의 경우에는 Github에 문서화 자료가 지원되었다면, Chart.js는 튜토리얼을 위한 별도의 웹페이지를 제공하여,  
  사용 시 더 보기 쉽고 구조화되어 있다는 느낌을 받았다.  
  다만, D3.js나 billboard.js에서는 Example에 대한 Sample code를 쉽게 볼 수 있었던 반면,  
  Chart.js의 경우는 Example의 Sample Code를 공식 웹페이지에서 찾아보기 힘들었다.  
  
  ### 4. 장점
  정해진 API를 참조하여 원하는 그래프를 쉽고 빠르게 만들 수 있다.  
  사용법이 직관적이고 문서화도 잘 되어 있다.    
  Canvas 기반이기 때문에 반응형 레이아웃도 문제없다.
  세부적인 커스터마이징도 쉬운 편.  
  사용자가 많아서 구글링을 통해 왠만하면 다 해결할 수 있다.  

  ### 5. 단점
  Canvas 기반이라 웹페이지를 확대/축소했을 때, 그래프 깨짐 현상이 발생한다.
  D3.js에 비해서 구현의 유연성이 떨어진다.


## billboard.js
---
  ```
  구현 편의성 : 상  
  구현 난이도 : 하  
  구현의 유연성 : 중  
  D3 기반  
  ```
  version 4 이상의 D3를 기반으로 하며, 정해진 양식에 맞추어 데이터를 넣기만 하면 원하는 그래프롤 쉽게 만들 수 있다. 

 ### 1. 얼마나 많은 차트 유형을 제공하는가?
 Chart.js 와 마찬가지로 충분히 다양한 종류의 차트 유형을 제공한다.  
 차트를 만드는 것에 특화되어 있는 웹 프레임워크이다.

 ### 2. 응용코드를 만드는데 얼마나 많은 학습이 필요한가? 개발 난이도는 어떠한가?
 Chart.js와 비슷한 난이도이다.  
 정해진 API에 원하는 데이터와 차트 종류 등의 옵션을 정해주기만 하면 손쉽게 차트를 그릴 수 있다.  
 난이도는 쉬움.  

 ### 3. 문서화 지원 정도
 다른 웹 프레임워크들과 비교해 가장 이해하기 쉽고 문서화가 잘 되어 있었다.  
 각각의 API들에 대한 Documentation은 물론, Example 들에 대한 Sample Code들도 별도의 웹페이지를 통해 보기 쉽게 제공되었다.  
 하지만 가장 마음에 들었던 것은 PlayGround 였는데, 제공되는 모든 API를 ON/OFF 할 수 있도록 웹 페이지를 만들어 놓고,  
 사용자가 직접 코드를 수정하면서 차트가 어떻게 변화하는지 한 눈에 볼 수 있도록 되어 있었다.  
 직접 차트 옵션들을 바꿔보면서 각 API에 대한 이해를 쉽게 할 수 있었다.  

 ### 4. 장점
   정해진 API를 참조하여 원하는 그래프를 쉽고 빠르게 만들 수 있다.  
    필요로 하는 API를 찾는 것이 다른 두 라이브러리보다 쉽다. https://naver.github.io/billboard.js/ 에서  
    Example이나 Playground를 통해 쉽게 원하는 API를 찾을 수 있도록 구성되어 있었다.  
    특히, Playground에서 Size, SVG, Transition 등의 목차별 API를 클릭 한번으로 직접 적용해 볼 수 있도록 하는 것이 좋았다.  
    https://naver.github.io/billboard.js/playground/  

 ### 5. 단점
  D3를 기반으로 하기 때문에, billboard.js를 사용하기 위해서는 D3의 자바스크립트 파일도 로드해야만 한다.  
  D3나 Chart.js 보다 속도 측면에서 느릴 것으로 예상된다.  
  만들어진지 얼마 되지 않은 라이브러리라 구글링 검색 결과가 많이 뜨지 않는다.  
  D3.js에 비해서 구현의 유연성이 떨어진다.

        