document.addEventListener('DOMContentLoaded', function () {
    makeD3BarGraph();
    makeChartJsBarGraph();
    makeBillBoardJsBarGraph();
});

function makeD3BarGraph() {
    console.time("D3.js Execution Time");
    var xAxisData = [0, 1, 2, 3, 4];
    var yAxisData = [0, 1, 2, 3, 4, 5];
    var yAxisLineData = [1, 2, 3, 4, 5];
    var xLabel = ['First', 'Second', 'Third', 'Fourth', 'Fifth'];
    var yLabel = ['0', '20', '40', '60', '80', '100'];
    // scale 함수
    var xAxisXScale = d3.scaleLinear()
        .domain([0, 4])
        .range([40, 480]);
    var yAxisYScale = d3.scaleLinear()
        .domain([0, 5])
        .range([340, 20]);
    var circleXScale = d3.scaleLinear()
        .domain([0, 4])
        .range([150, 682]);

    var canvas = d3.select(".d3Graph")
        .append("svg")
        .attr("width", "600")
        .attr("height", "380");
    var axisGroup = canvas.append('g')
        .attr("class", "axis");
    var dataGroup = canvas.append('g')
        .attr("class", "data");
    var axis = axisGroup.append("path")
        .attr("d", "M30 10 L30 340 L550 340")
        .attr("stroke", "black")
        .attr("fill", "none");
    var xLabelGroup = canvas.append("g")
        .attr("class", "labels x-labels");
    var xLabelText = xLabelGroup.selectAll("text")
        .data(xAxisData)
        .enter()
        .append("text")
        .attr("x", function (d) {
            return xAxisXScale(d);
        })
        .attr("y", "360")
        .text(function (d) {
            return xLabel[d];
        });
    var xLabelDescText = xLabelGroup.append("text")
        .attr("x", "250")
        .attr("y", "380")
        .attr("class", "label-title")
        .text("Data");
    var yLabelGroup = canvas.append("g")
        .attr("class", "labels y-labels");
    var yLabelText = yLabelGroup.selectAll("text")
        .data(yAxisData)
        .enter()
        .append("text")
        .attr("x", "0")
        .attr("y", function (d) {
            return yAxisYScale(d);
        })
        .text(function (d) {
            return yLabel[d];
        });
    var yLabelLine = yLabelGroup.selectAll("line")
        .data(yAxisLineData)
        .enter()
        .append("line")
        .attr("x1", "30")
        .attr("y1", function (d) {
            return yAxisYScale(d);
        })
        .attr("x2", "550")
        .attr("y2", function (d) {
            return yAxisYScale(d);
        })
        .attr("stroke", "black")
        .attr("stroke-dasharray", "5,5");

    // make bars
    var numRect = d3.selectAll(".d3Graph .data rect");
    var xScale = d3.scaleLinear()
        .domain([0, 4])
        .range([40, 485]);
    var yScale = d3.scaleLinear()
        .domain([0, 110])
        .range([340, 340 - (3.2 * 110)]);
    var heightScale = d3.scaleLinear()
        .domain([0, 110])
        .range([0, 3.2 * 110]);
    var bars = dataGroup.selectAll("rect")
        .data([10, 20, 40, 60, 80])
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function (d, i) {
            return xScale(i);
        })
        .attr("width", "25")
        .attr("height", 0)
        .attr("y", 340)
        .transition()
        .duration(500)
        .attr("y", function (d) {
            return yScale(d);
        })
        .attr("height", function (d) {
            return heightScale(d);
        })
        .attr("stroke", "black")
        .attr("fill", "blue");

    var endTime = new Date().getTime();
    console.timeEnd("D3.js Execution Time");
}

function makeChartJsBarGraph() {
    console.time("Chart.js Execution Time");
    var barCanvas = document.getElementById("ChartJs");
    var barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: ["First", "Second", "Third", "Fourth", "Fifth"],
            datasets: [{
                label: 'Result',
                data: [100, 200, 300, 400, 500],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                ]
            }]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Calculate Sequence",
                        fontSize: 15,
                        fontStyle: "bold"
                    }
                }]
            }
        }
    });
    var endTime = new Date().getTime();
    console.timeEnd("Chart.js Execution Time");
}

function makeBillBoardJsBarGraph() {
    console.time("Billboard.js Execution Time");
    var billBoardChart = bb.generate({
        bindto: "#billBoardChart",
        data: {
            type: "bar",
            columns: [
                ["data1", 100, 200, 300, 400, 500]
            ]
        },
        axis: {
            x: {
                label: "CALCULATE SEQUENCE",
                type: "category",
                categories: [
                    "First",
                    "Second",
                    "Third",
                    "Fourth",
                    "Fifth"
                ]
            },
            y: {
                label: "RESULT",
            }
        },
        size: {
            width: 600,
            height: 400
        },
        grid: {
            x: {
                show: true
            },
            y: {
                show: true
            }
        }
    });
    var endTime = new Date().getTime();
    console.timeEnd("Billboard.js Execution Time");
}