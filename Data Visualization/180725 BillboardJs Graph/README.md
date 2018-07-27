# <과제>
네이버에서 만든 데이터 시각화 라이브러리가 있네요. chart.js와 유사성이 있어보입니다.  
https://naver.github.io/billboard.js/  
오늘은 이 프로젝트에 대한 분석을 여러분께 의뢰할께요. billboard.js로 최대한 많은 예제를 만들어보세요.  
기존 계산기js 프로젝트에 덧 붙이는 것 포함, 추가로 많은 유형의 차트들을 만들어 대시보스처럼 구성해보세요.  
더불어, 같은 내용을 chart.js와 d3.js로도 최대한 만들어보세요. 우리가 만드는 것이 이것들을 사용하는 것보다 훨씬 쉽고 강력하다는 것이 증명되도록 여러분과 함께 만들어가야해서 꼭 필요한 과정입니다.   
그 과정에서 세가지 라이브러리의 차이점을 한번 분석해주시고, 장단점을 각자 생각해서 md문서로 작성해 함께 주세요.   
날이 더우니 꼭 회사로 오실 필요는 없고, 내일 (시간이 더 필요하면 모래)까지 진행해봅시다.  
중간중간 결과물도 공유할 수 있다면 중간본이라고 함께 볼 수 있도록 해주세요.   
감사합니다.  

# <과제 수행사항>

## 1. billboard.js 를 활용한 bar chart 그리기

  ### 1.1 billboard.js 로드하기
billboard.js는 버전 4 이상의 d3 를 기반으로 만들어진 차트 라이브러리이다.  
그러므로 billboard.js 스크립트를 로드하기 이전에 버전 4 이상의 d3 스크립트를 먼저 로드한 이후 billboard.js를 로드해야 한다.
```
<script src="https://d3js.org/d3.v4.min.js"></script>
<script src="../lib/billboard.js"></script>
```
  ### 1.2 billboard.js 를 활용해 chart 그리기
billboard.js 를 사용하는 것은 chart.js와 매우 유사한 느낌을 받았다.  
정해진 객체 틀에 라벨과 데이터를 넣으니 간단하게 bar chart가 생성되었다.
```
    billBoardChart = bb.generate({
    bindto: "#billBoardChart",
    data: {
        type: "bar",
        columns: [
            ["Calculate Sequence",0,0,0,0,0]
        ]
    }
});
```
위 코드를 makeBillBoardChartGraphContainer() 함수에 넣어 페이지가 로드되면 해당 함수를 수행하도록 했다.  
문제는 계산기에서 '=' 을 눌렀을 때, 업데이트된 resultValueQueue 데이터를 사용해 그래프를 업데이트 하는 과정이었다.  
이 과정은 Billboard.js의 playground나 example에서 찾기 힘들었다.  
그래서 크롬의 검사 기능을 이용하여 bb.generate를 이용해 생성되는 billBoardChart 변수에 대해 알아보았다.  
그 결과, billboard.js 에서는 데이터 값들이 하나의 객체처럼 취급됨을 알 수 있었다.  
![객체데이터](../billboard.png)  
따라서, resultValueQueue에 있는 값들을 객체에 하나하나 업데이트 해 주는 방식으로 코드를 짜 보았다.  
```
function updateBillBoardJsGraph(){
for(var indexOfResultValueQueue = 0; indexOfResultValueQueue<resultValueQueue.length; indexOfResultValueQueue++){
    billBoardChart.data()[0].values[indexOfResultValueQueue].value = resultValueQueue[indexOfResultValueQueue];
}
billBoardChart.show();
}
```
이외에 grid나 axis label 등을 넣는 작업들은 billboard.js의 playground나 example을 통해 쉽게 파악할 수 있었다.
    
   ### 1.3 billboard.js로 bar chart를 그리면서 느낀 점
    
playground나 example을 통해 기능을 쉽게 파악할 수 있었고, 어떻게 사용하면 될 지 감을 잡을 수 있었다.  
D3나 Chart.js 와 가장 크게 차이점을 느꼈던 것은, 데이터들이 하나의 객체처럼 취급된다는 것이었다.  
또한, 데이터를 열별로, 행별로도 넣을 수 있고, JSON 데이터나 csv 데이터를 그래프에 반영하는 것도 가능했다.  
https://naver.github.io/billboard.js/demo/#Data.DataFromURL-csv  

요약하면, 너무 복잡하지만 자유도는 높은 d3와, 간편하게 만들 수 있지만 자유도는 낮은 chart.js의 중간쯤에 위치하는 라이브러리인 것 같다.  
또한, Canvas 를 사용하여 픽셀로 랜더링되는 Chart.js 와는 달리, billboard.js 는 d3를 기반으로 하는 벡터 그래픽으로,  
확대하거나 축소해도 SVG 그래픽의 품질에는 전혀 손상이 없다는 장점을 가진다.  

다시 한번 요약하면, billboard.js = chart.js의 간편함 + 벡터 그래픽의 장점 + d3의 유연함 인 것 같다.  