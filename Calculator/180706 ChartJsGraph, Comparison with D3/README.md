# <과제>
지금까지 모두 잘 따라와주셔서 감사합니다. 미세하게 기능상 더 부탁드릴 부분이 보이지만,  
이 부분들은 다음주에 처리하기로 하고 오늘은 chart.js를 사용하신 경우엔 d3를, 반대로 d3를 사용하신 경우엔 chart.js를 쓰는 그래프를 추가해주세요.  
그리고 chart.js와 d3 그리고 직접 개발하신 svg코딩 사이의 다른 경험에서 느낀 점을 README.md에 정리해주시면 감사하겠습니다.  
그 체험이 가장 중요합니다. 다음주에는 애니메이션과 본격적인 typescript를 시작해봅시다.  

# <과제 수행사항 및 느낀 점>

## 1. Chart.js를 활용한 bar Chart 그리기  
  Chart.js는 D3.js 와는 다르게 Canvas를 기반으로 하는 라이브러리이다.  
  Chart.js를 이용하기 위해 먼저, Chart.js의 cdn을 스크립트로 포함하고,  
  Canvas 태그의 크기를 지정하여 추가하였다.  
  그리고 barCanvas라는 변수에 만든 Canvas DOM Element를 할당하고,  
  해당 변수를 새로운 Chart객체를 만드는 매개변수로써 활용하였다.  
  정해진 Chart 객체의 틀에 라벨과 데이터 내용만 넣으니 간단하게 차트가 생성되었다.  
```
  var barCanvas = document.getElementById("barChart");
    barChart = new Chart(barCanvas, {
      type: 'bar',
      data:{
        labels:["First", "Second", "Third", "Fourth", "Fifth"],
        datasets: [{
          label:'Result',
          data: resultValueQueue,
          backgroundColor:[
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ]
        }]
      }
    }
```
  그런데 이렇게 생성해 놓고 보니, 기존에 HTML 파일에서 Canvas Tag에 지정한  
  Width와 Height 값이 무시되는 현상이 발생했다. 이를 해결하기 위해 구글링 해보니,  
  barChart 객체에 대해 아래 옵션을 줌으로써 해결가능했다.
```
  options:{
    responsive:false,
    miantainAspectRatio:false,
  }
```
  이렇게 기존 그래프와 크기를 맞춘 Chart.js를 가운데 정렬하기 위해,  
  HTML Canvas Tag 내부에 inline CSS로 해당 코드를 추가해 주었다.  
  Canvas Tag의 id를 통해 접근하여 CSS 파일에서 스타일을 바꾸어 주었을 경우에는   
  동작하지 않았는데, 정확한 이유는 알 수 없었다.
```
  <canvas id="barChart" width="770" height="450" style="display:inline-block;"></canvas>
```
  위에서 작성한 chart Graph 코드를 makeChartJsGraph()라는 함수로 묶고, 
  HTML 이 전부 로드되었을 때 해당 함수를 호출하도록 했다.  
  그리고, evaluation(=)이 눌러지고, queue가 업데이트 되었을 때,  
  chart를 업데이트 할 수 있도록 updateChartJsGraph()함수를 만들었다.  
```
  // eval button이 눌러질때마다 Chart update
  function updateChartJsGraph(){
    barChart.data.datasets[0].data = resultValueQueue;
    barChart.update();
  }
```
## 2. SVG 그래프, D3.js 그래프, Chart.js 그래프를 그리면서 느낀 점
  먼저, SVG로 그래프를 그리기 시작했을 때,  
  벡터 기반 그래픽이라는 SVG의 특성 때문에 각 요소들의 좌표값을 정해주는 것이 번거로웠다.  
  그리고, 기존 HTML 과는 다르거나 새로운 API가 있어서 혼동을 주는 경우가 있었다.   
  ex) background-color와 fill, stroke  
  자바스크립트를 통해 동적으로 SVG 태그를 삽입할 때, CreateElementNS 를 사용해야 실제 화면에 이미지가 그려졌다.  
  이를 통해 SVG 가 XHTML 언어임을 알 수 있었다.  
  비슷한 속성값을 가지는 SVG 태그들의 경우, 매번 비슷한 속성을 지정하는 것이 반복되어  
  이를 함수로 만들어, 차이를 가지는 속성값만 매개변수로 받아 태그를 반환하도록 했다.  
    
  다음으로, D3.js로 SVG를 통해 만든 그래프를 똑같이 그려보았다.  
  처음에 D3.js 예제코드를 보았을 때는, D3가 가지는 Method Chaining이나 Scale, Selection API  
  등으로 인해 코드를 이해하기가 어려웠다.  
  하지만, 각각의 기능과 API에 대해 이해하고 나니, SVG만을 이용하여 그래프를 그리는 것보다 훨씬 간편하게 그릴 수 있었다.  
  Bar Chart를 그릴 때, 데이터 배열에 따라 존재하지도 않는 rect 요소를 바인딩하여 enter()를 통해 placeholder를 만드는  
  과정 등이 매우 간편했고, 신기했다. 반복문을 쓰지 않고도 데이터의 개수를 알아서 파악하여 그 개수만큼 지정한 rect를  
  만드는 것이 참신했다.  
  또한, 데이터 값에 따라 변화하는 rect 태그의 y 나 height 속성에 대한 Scale 함수를 지정하는 것도 매우 흥미로웠다.  
  domain 값의 최소, 최대값을 지정하고 range값의 최소, 최대값을 지정하기만 하면,   
  데이터 값의 크기에 따라 y 또는 height값을 알아서 반환해주는 함수 체계도 매우 간편했다.  
  전체적으로, 처음에 접하기는 생소하고 어려우나 배우고 나면 SVG에 비해 매우 강력하고 편리하게 시각화를   
  할 수 있을 것 같다는 느낌을 받았다.  
    
  Chart.js 로 막대 그래프를 그리는 과정은 D3.js에 비해 매우 쉬웠다.  
  HTML 파일에서 canvas tag를 생성해준 후에, 해당 태그의 객체를 id를 통해 접근해 변수에 담은 이후,  
  이 변수를 가지고 새로운 Chart 객체를 만들었다. 
  Chart객체의 두번째 매개변수로 들어가는 객체가 흥미로웠는데,  
  Chart의 타입을 string 형식으로 받고, labels와 data, backgroundColor를 배열 형태로 지정해 줄 수 있었다.  
  결과적으로 만든 그래프도 D3로 만든 그래프에 비해 더 시각적으로 예뻤고, y축의 데이터 범위도 데이터의 크기에 따라 동적으로  
  변화했다.  
  상대적으로 적은 노력과 시간을 들여서 D3.js 보다 더 예쁘고 동적인 그래프를 만들 수 있어 더 편리했다.
## 3. SVG, Canvas?
  SVG 태그를 기반으로 그래프를 그리는 D3.js와, Canvas를 기반으로 그래프를 그리는 Chart.js를 비교해 보기 위해,  
  SVG 태그와 Canvas 태그 각각의 특징과 차이점에 대해 찾아보았다.  
   - SVG  
   SVG는 확장 가능한 벡터 그래픽이다.  
   SVG는 웹을 위한 벡트 기반 그래픽을 정의하는데 사용된다.  
   SVG는 XML형식의 그래픽을 정의한다.  
   **확대하거나 크기를 변경해도 SVG 그래픽의 품질은 전혀 손상이 없다.**
      - 장점  
      SVG 이미지를 생성한 후 텍스트 편집기로 편집할 수 있다.  
      SVG 이미지는 검색 색인, 스크립트 및 압축 할 수 있다.  
      SVG 이미지는 확장 가능하다.  
      SVG 이미지는 해상도에 관계없이 고품질로 인쇄할 수 있다.  
      SVG 이미지는 품질의 손실없이 줌(Zoom)이 가능하다.  
       
   - Canvas 와의 차이점  
   SVG는 XML의 2D 그래픽을 기술하는 **언어**이다.  
   Canvas는 자바스크립트로 2D 그래픽을 그려낸다.  
   SVG는 XML을 기반으로 하여, 모든 요소가 SVG DOM 내에서 사용될 수 있다.  
   또한, 요소에 자바스크립트 이벤트 핸들러를 첨부할 수도 있다.  
   SVG에서, 각각 그려진 모양은 하나의 객체로 기억된다.  
   SVG 객체의 특성이 변경되는 경우, 브라우저가 자동으로 형상을 다시 렌더링 할 수 있다.  
   **Canvas는 픽셀에서 픽셀로 렌더링된다**
   일단 Canvas의 그래픽이 브라우저로 전달되어 그려진 후에 그 정보들은 **지워진다**.  
   따라서 그래픽의 위치를 변경해야 하는 경우, 전체 장면은 그래픽이 적용되었을 수 있는 모든 개체를 포함하여,  
   다시 그려야만 한다. 즉, 코드를 수정하여 다시 브라우저로 전달하면,  
   좀전의 그래픽 이미지는 삭제되고 새로운 그래픽이 표현된다.  
      - Canvas  
      해상도에 의존  
      이벤트 핸들러 지원 없음  
      텍스트 렌더링 기능 미약  
      .PNG 또는 .JPG로 생성된 이미지 저장 가능.  
      그래픽 집약적인 게임에 적합.  
      - SVG  
      해상도 독립적  
      이벤트 핸들러에 대한 지원  
      가장 큰 렌더링 분야와 응용 프로그램에 적합(구글 Maps 등)  
      DOM이 복잡하면 렌더링도 복잡해져서 느려진다.  
      게임 앱(응용 프로그램)에는 적합하지 않다.  
      

   



  
