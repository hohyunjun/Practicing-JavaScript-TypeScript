document.addEventListener('DOMContentLoaded', function () {
    makeD3PieGraph();
    makeChartJsBarGraph();
    makeBillBoardJsBarGraph();
    makeBillBoardJsBubbleChart();
});
function makeD3PieGraph(){
    var data = [10, 20, 30, 15, 25];

    var width = 400,
        height = 250,
        radius = Math.min(width, height) / 2;

    var color = d3.scaleOrdinal()
        .range(["blue", "green", "orange", "hotpink", "purple"]);

    var arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

    var labelArc = d3.arc()
        .outerRadius(radius - 40)
        .innerRadius(radius - 40);

    var pie = d3.pie()
        .sort(null)
        .value(function (d) {
            return d;
        });

    var svg = d3.select(".d3PieGraph").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    var g = svg.selectAll(".arc")
        .data(pie(data))
        .enter().append("g")
        .attr("class", "arc")
        .style("opacity", "0");

    g.append("path")
        .attr("d", arc)
        .style("fill", function (d) {
            return color(d.data);
        })
        .style('stroke', 'white');

    g.append("text")
        .attr("transform", function (d) {
            return "translate(" + labelArc.centroid(d) + ")";
        })
        .attr("dy", ".35em")
        .text(function (d) {
            return d.data;
        });
    svg.selectAll(".arc")
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .style("opacity", "1.0");

}
function makeChartJsBarGraph(){
    var barCanvas = document.getElementById("ChartJs");
    var barChart = new Chart(barCanvas, {
        type: 'bar',
        data: {
            labels: ["First", "Second", "Third", "Fourth", "Fifth"],
            datasets: [{
                label: 'Result',
                data: [100,200,300,400,500],
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
}
function makeBillBoardJsBarGraph(){
        var billBoardChart = bb.generate({
            bindto: "#billBoardChart",
            data: {
                type: "line",
                columns: [
                    ["1st", 470, 250, 400, 400, 500],
                    ["2nd", 460, 230, 350, 300, 400],
                    ["3rd", 450, 200, 300, 200, 300],
                    ["4th", 400, 180, 400, 100, 200],
                    ["5th", 380, 170, 330, 500, 100]
                ]
            },
            axis: {
                x: {
                    label: "Testing Line Chart",
                    type: "category",
                    categories: [
                        "First Data",
                        "Second Data",
                        "Third Data",
                        "Fourth Data",
                        "Fifth Data"
                    ]
                },
                y: {
                    label: "Line Datas"
                }
            },
            size:{
                width: 400,
                height: 250
            }
        });
}

function makeBillBoardJsBubbleChart(){
    var billBoardChart = bb.generate({
        bindto: "#billBoardBubbleChart",
        data: {
            type: "bubble",
            columns: [
                ["1st", 470, 250, 400, 400, 500],
                ["2nd", 460, 230, 350, 300, 400],
                ["3rd", 450, 200, 300, 200, 300],
                ["4th", 400, 180, 400, 100, 200],
                ["5th", 380, 170, 330, 500, 100],
            ],
        },
        axis: {
            x: {
                label: "Testing BubbleChart",
                type: "category",
                categories: [
                    "First Data",
                    "Second Data",
                    "Third Data",
                    "Fourth Data",
                    "Fifth Data"
                ]
            },
            y: {
                label: "Bubbles"
            }
        },
        size:{
            width:400,
            height:250
        }
    });
}