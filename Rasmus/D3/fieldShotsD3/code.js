var width = 1050;
var height = 680;

var touchType = "Goal Attempt";
var period = 1;

var x = d3.scale.linear().domain([0,105]).range([0,width]);
var y = d3.scale.linear().domain([0,68]).range([0,height]);


var svg = d3.select("svg")
            .attr("width", width)
            .attr("height", height);

var sliderDiv = d3.select("body").append("div")
            .style("width", width + "px");


var arc = d3.svg.arc()
          .innerRadius(x(11))
          .outerRadius(x(11))
          .startAngle(29 * (Math.PI / 180))
          .endAngle(151 * Math.PI / 180);

var arcRight = d3.svg.arc()
          .innerRadius(x(11))
          .outerRadius(x(11))
          .startAngle((360-29) * (Math.PI / 180))
          .endAngle((360-151) * Math.PI / 180);




svg.append("path")
          .attr("d", arc)
          .style("stroke", "white")
          .style("stroke-width", "3")
          .attr("cx", x(11))
          .attr("cy", y(34))
          .attr("transform", "translate(" + x(11) + "," + y(34) + ")");

svg.append("path")
          .attr("d", arcRight)
          .style("stroke", "white")
          .style("stroke-width", "3")
          .attr("cx", x(105-11))
          .attr("cy", y(34))
          .attr("transform", "translate(" + x(105-11) + "," + y(34) + ")");

svg.append("circle")
          .attr("cx", x(11))
          .attr("cy", y(34))
          .style("fill", "white")
          .attr("r", y(0.3));

svg.append("circle")
          .attr("cx", x(105-11))
          .attr("cy", y(34))
          .style("fill", "white")
          .attr("r", y(0.3));

svg.append("circle")
          .style("stroke", "white")
          .style("stroke-width", "3")
          .attr("cx", x(52.5))
          .attr("cy", y(34))
          .style("fill", "none")
          .attr("r", y(9.15));


var axis = d3.svg.axis().orient("top").ticks(9);
sliderDiv.call(d3.slider().axis(true).min(1).max(9).step(1).on("slide", function(evt, value) {
  period = value;
  update(period);
}));

function update(period) {
  var filename = "data/" + touchType + period + ".json";

  d3.json(filename, function(error, json) {

    var circle = svg.selectAll(".dots").data(json, function(d,i) {
      return i + "," + d.x + "," + d.y;
    });

    var newCircles = circle.enter().append("circle").attr("class", "dots");

    circle.attr("r", 1.5)
      .attr("fill", "black")
      .attr("opacity", 0.75)
      .attr("stroke", "black")
      .attr("cx", function(d) {return x(+d.x) + (Math.random()*20 - 10);})
      .attr("cy", function(d) {return y(+d.y) + (Math.random()*20 - 10);});

    circle.exit().remove();

    var text = d3.select("text");
    text.remove();

    text = d3.select("svg").append("text");
    text.text("Amount: " + json.length).attr("x", 5).attr("y", 17).attr("fill", "white");


    
  });
}

var options = ["Goal Attempt",
            "50-50 Ball Lost",
            "Aerial Duel Lost",
            "Aerial Duel Won",
            "Bad Pass",
            "Blocks",
            "Catches",
            "Clearance",
            "GK Hand",
            "GK Throw",
            "Goal Keeper Long Ball",
            "Good Pass",
            "Interceptions",
            "Keeper Pick Up",
            "Others",
            "Run With Ball",
            "Saves",
            "Tackles",
            "Throw-In"];

var select = d3.select("#type-selector")
    .on('change',onchange)

var options = select
  .selectAll('option')
  .data(options).enter()
  .append('option')
    .text(function (d) { return d; });

function onchange() {
  selectValue = d3.select('select').property('value');
  touchType = selectValue;
  update(period)
};


update(1);
