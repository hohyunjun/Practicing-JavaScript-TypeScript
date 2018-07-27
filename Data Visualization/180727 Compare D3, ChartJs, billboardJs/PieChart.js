document.addEventListener('DOMContentLoaded', function () {
    makeD3PieGraph();
    makeChartJsPieGraph();
    makeBillBoardJsPieGraph();
});

function makeD3PieGraph(){
    var data = [10, 20, 30,15,25];

    var width = 500,
        height = 350,
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

    var svg = d3.select(".d3Graph").append("svg")
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
        .style('stroke','white');

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

function makeChartJsPieGraph(){
    var pieCanvas = document.getElementById("ChartJs");
    var pieChart = new Chart(pieCanvas, {
        type: 'pie',
        data: {
            labels: ["First", "Second", "Third", "Fourth", "Fifth"],
            datasets: [{
                //label: 'Result',
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
            maintainAspectRatio: false
        }
    });
}

function makeBillBoardJsPieGraph(){
    var billBoardPie = bb.generate({
        bindto: "#billBoardChart",
        data : {
            type: "pie",
            columns:[
                ["First", 20],
                ["Second", 30],
                ["Third", 10],
                ["Fourth", 15],
                ["Fifth", 25]
            ]
        },
        size:{
            width: 600,
            height: 400
        }
    })
}