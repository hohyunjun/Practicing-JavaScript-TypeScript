document.addEventListener('DOMContentLoaded', function () {
    makeD3LineGraph();
    makeChartJsLineGraph();
    makeBillBoardJsLineGraph();
});
function makeD3LineGraph(){
    console.time("D3.js Execution Time");
    var margin = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
        },
        width = 500 - margin.left - margin.right, 
        height = 350 - margin.top - margin.bottom; 

    
    var n = 21;

    
    var xScale = d3.scaleLinear()
        .domain([0, n - 1]) 
        .range([0, width]); 

    
    var yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0]); 

    // 7. d3's line generator
    var line = d3.line()
        .x(function (d, i) {
            return xScale(i);
        }) 
        .y(function (d) {
            return yScale(d.y);
        }) 
        .curve(d3.curveMonotoneX); // apply smoothing to the line

    var dataset = d3.range(n).map(function (d) {
        return {
            "y": d3.randomUniform(1)()
        };
    });

    var svg = d3.select(".d3Graph").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale));

    svg.append("g")
        .attr("class", "y axis")
        .call(d3.axisLeft(yScale)); 

    svg.append("path")
        .datum(dataset)
        .attr("class", "line") 
        .attr("style", "fill: none;stroke: #ffab00; stroke - width: 3;")
        .attr("d", line)
        .style("opacity","0"); 

    
    svg.selectAll(".dot")
        .data(dataset)
        .enter().append("circle") 
        .attr("class", "dot") 
        .attr("style", "fill: #ffab00;stroke: #fff;")
        .attr("cx", function (d, i) {
            return xScale(i);
        })
        .attr("cy", function (d) {
            return yScale(d.y);
        })
        .attr("r", 5)
        .style("opacity", "0");

    //animation(transition)
    svg.selectAll("path")
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .style("opacity", "1.0");
    svg.selectAll(".dot")
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .style("opacity", "1.0");
    var endTime = new Date().getTime();
    console.timeEnd("D3.js Execution Time");
}
function makeChartJsLineGraph(){
    console.time("Chart.js Execution Time");
    var lineCanvas = document.getElementById("ChartJs");
    var lineChart = new Chart(lineCanvas,{
        type:'line',
        data:{
            labels: ["First", "Second", "Third", "Fourth", "Fifth"],
            datasets: [
                {
                    label: '1st',
                    data:[100,200,150,400,500],
                    borderColor:'red',
                    backgroundColor:'red',
                    fill:false
                },
                {
                    lable: '2nd',
                    data:[200,300,250,300,200],
                    borderColor:'blue',
                    backgroundColor: 'blue',
                    fill:false
                },
                {
                    label: '3rd',
                    data:[300, 450, 350, 200, 400],
                    borderColor:'green',
                    backgroundColor: 'green',
                    fill:false
                }
            
            ],
            
        }
    });
    var endTime = new Date().getTime();
    console.timeEnd("Chart.js Execution Time");
}
function makeBillBoardJsLineGraph(){
    console.time("Billboard.js Execution Time");
    var billBoardChart = bb.generate({
        bindto:"#billBoardChart",
        data:{
            type:"line",
            columns:[
                    ["1st", 470, 250, 400, 400, 500],
                    ["2nd", 460, 230, 350, 300, 400], 
                    ["3rd", 450, 200, 300, 200, 300], 
                    ["4th", 400, 180, 400, 100, 200], 
                    ["5th", 380, 170, 330, 500, 100]
            ]
        },
        axis:{
            x:{
                label:"Testing Line Chart",
                type:"category",
                categories:[
                    "First Data",
                    "Second Data",
                    "Third Data",
                    "Fourth Data",
                    "Fifth Data"
                ]
            },
            y:{
                label:"Line Datas"
            }
        }
    });
    var endTime = new Date().getTime();
    console.timeEnd("Billboard.js Execution Time");
}