document.addEventListener('DOMContentLoaded', function () {
    makeD3BubbleGraph();
    makeChartJsBubbleGraph();
    makeBillBoardJsBubbleGraph();
});

function makeD3BubbleGraph() {
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
        .attr("height", "365");
    var axisGroup = canvas.append('g')
        .attr("class", "axis");
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
    var yLabelGroup = canvas.append("g")
        .attr("class", "labels y-labels");
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

    //bubbles
    var dataset = {
        "children": [{
                "Name": "First",
                "Count": 4319
            },
            {
                "Name": "Second",
                "Count": 4159
            },
            {
                "Name": "Third",
                "Count": 2583
            },
            {
                "Name": "Fourth",
                "Count": 2074
            },
            {
                "Name": "Fifth",
                "Count": 1894
            },
            {
                "Name": "Sixth",
                "Count": 3059
            },
            {
                "Name": "Seventh",
                "Count": 2678
            },
        ]
    };

    var diameter = 350;
    var color = d3.scaleOrdinal(d3.schemeCategory20);

    var bubble = d3.pack(dataset)
        .size([diameter, diameter])
        .padding(1.5);

    var dataGroup = canvas.append('g')
            .attr("class", "bubble");

    var nodes = d3.hierarchy(dataset)
        .sum(function (d) {
            return d.Count;
        });

    var node = dataGroup.selectAll(".node")
        .data(bubble(nodes).descendants())
        .enter()
        .filter(function (d) {
            return !d.children;
        })
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
            return "translate(" + (d.x+100) + "," + d.y + ")";
        });

    node.append("title")
        .text(function (d) {
            return d.Name + ": " + d.Count;
        });

    node.append("circle")
        .attr("r", function (d) {
            return d.r;
        })
        .style("fill", function (d, i) {
            return color(i);
        })
        .style("opacity", "0");

    node.append("text")
        .attr("dy", ".2em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Name.substring(0, d.r / 3);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", function (d) {
            return d.r / 5;
        })
        .attr("fill", "white");

    node.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .text(function (d) {
            return d.data.Count;
        })
        .attr("font-family", "Gill Sans", "Gill Sans MT")
        .attr("font-size", function (d) {
            return d.r / 5;
        })
        .attr("fill", "white");

    d3.select(self.frameElement)
        .style("height", diameter + "px");
    
    var circle = node.selectAll("circle")
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .style("opacity", "1.0");
}

function makeChartJsBubbleGraph() {
    var bubbleCanvas = document.getElementById("ChartJs");
    var bubbleChart = new Chart(bubbleCanvas,{
        type: 'bubble',
        data:{
            datasets:[
                {
                    label:'First',
                    data:[
                        {
                            x:3,
                            y:7,
                            r:30
                        }
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.6)',
                    hoverBackgroundColor: 'rgba(255, 99, 132, 0.6)'
                },
                {
                    label:'Second',
                    data:[
                        {
                            x:2,
                            y:5,
                            r:10
                        }],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        hoverBackgroundColor: 'rgba(54, 162, 235, 0.6)'
                },
                {
                    label:"Third",
                    data:[
                        {
                            x:10,
                            y:10,
                            r:10
                        }],
                        backgroundColor: 'rgba(255, 206, 86, 0.6)',
                        hoverBackgroundColor: 'rgba(255, 206, 86, 0.6)'
                },
                {
                    label:"Fourth",
                    data:[
                        {
                            x:6,
                            y:6,
                            r:15
                        }],
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    hoverBackgroundColor: 'rgba(75, 192, 192, 0.6)'
                },
                {
                    label:"Fifth",
                    data:[
                        {
                            x:9,
                            y:7,
                            r:50
                        }
                    ],
                    backgroundColor: 'rgba(153, 102, 255, 0.6)',
                    hoverBackgroundColor: 'rgba(153, 102, 255, 0.6)'
                }
            ]
        }
        
    });
}

function makeBillBoardJsBubbleGraph() {
    var billBoardChart = bb.generate({
        bindto: "#billBoardChart",
        data:{
            type: "bubble",
            columns:[
                ["1st", 470,250,400,400,500],
                ["2nd", 460, 230, 350, 300, 400],
                ["3rd", 450, 200, 300, 200, 300],
                ["4th", 400, 180, 400, 100, 200],
                ["5th", 380, 170, 330, 500, 100],
            ],
        },
        axis:{
            x:{
                label:"Testing BubbleChart",
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
                label:"Bubbles"
            }
        }
    });
}