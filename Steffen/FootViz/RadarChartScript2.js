/**
 * Created by SBK on 11-05-2016.
 */
var w = 700,
    h = 500;
var NoVar = 5;
var NoRounds =27;
var colorscale = d3.scale.category10();
var teams = [0,1,2,3,4,5,6,7,8,9,10,11];
var chosenTeamsIndex;
var chosenTeamsNames = [];



var LegendOptions=[];
d3.csv("teams.csv", type, function (t) {
    for (var i = 0; i < teams.length; i++) {
        LegendOptions.push(t[teams[i]].x);
    }
    Selecters();
});

function test() {
    // console.log(chosenTeamsIndex);
        d3.csv("dataAni.csv", type, function (d) {
            dataWrapper(d);
        });
}


function Selecters() {
    var selectors = d3.select("body").append("selector")
        .attr("id","selec")
        .attr("height","200px")
        .attr("width","200px")
        .attr("top","100px");

    var select = d3.select('selector')
        .append('select')
        .attr('class', 'select')
        .on('change', onchange);
    

    var options = select
        .selectAll('option')
        .data(LegendOptions).enter()
        .append('option')
        .text(function (d) { return d; });

    function onchange() {
        chosenTeamsNames[0] = d3.select('.select').property('value');
        chosenTeamsIndex = this.selectedIndex;
        test();


    }
}

function type(d){
    d.value = parseFloat(d.value);
    return d;
}

function dataWrapper(array) {
    var data = [];

    for (var t=chosenTeamsIndex*NoRounds;t<chosenTeamsIndex*NoRounds+NoRounds;t++) {
        var current = [];
        for (var y=t*NoVar;y<t*NoVar+NoVar;y++) {
            current.push(array[y]);
        }
        data.push(current);
    }



    //
    //
    //
    // var current = [];
    // for (var k=chosenTeamsIndex*NoVar*NoRounds; k<=(chosenTeamsIndex*NoVar*NoRounds)+NoRounds*NoVar-1; k++) {
    //     current.push(array[k]);
    // }
    // data.push(current);
    // console.log(data);


    legdend();
    RadarChart.draw("#chart", data, mycfg);
    RadarChart.draw("#chart2", data, mycfg2);
    RadarChart.draw("#chart3", data, mycfg3);

}

//Options for the Radar chart, other than default
var mycfg = {
    w: 340,
    h: 340,
    maxValue: 1,
    opacityArea: 0.5,
    levels: 5,
    ExtraWidthX: 300,
    color: colorscale,
    radius: 7,
    chosenTeams:chosenTeamsNames,
    Result:"Win"
};

var mycfg2 = {
    w: 340,
    h: 340,
    maxValue: 1,
    opacityArea: 0.5,
    levels: 5,
    ExtraWidthX: 300,
    color: colorscale,
    radius: 7,
    chosenTeams:chosenTeamsNames,
    Result:"Draw"
};

var mycfg3 = {
    w: 340,
    h: 340,
    maxValue: 1,
    opacityArea: 0.5,
    levels: 5,
    ExtraWidthX: 300,
    color: colorscale,
    radius: 7,
    chosenTeams:chosenTeamsNames,
    Result:"Loss"
};

////////////////////////////////////////////
/////////// Initiate legend ////////////////
////////////////////////////////////////////
function legdend() {
    var svg = d3.select("#legend")
        .append('svg')
        .attr("width", w + 500)
        .attr("height", h);

//Create the title for the legend
    var text = svg.append("text")
        .attr("class", "title")
        // .attr('transform', 'translate(90,0)')
        .attr("x", w)
        .attr("y", 40)
        .attr("font-size", "30px")
        .attr("fill", "#000000")
        .text("Results in Match");

//Initiate Legend
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("height", 200)
        .attr("width", 400)
        .attr('transform', 'translate(2,2)')
        ;
//Create colour squares

    legend.selectAll('rect')
        .data(["Win","Draw","Loss"])
        .enter()
        .append("rect")
        .attr("x", function(d, i){ return i * 60+w;})
        .attr("y", 60)
        .attr("width", 60)
        .attr("height", 60)
        .style("fill", function(d, i){
            if (d=="Win") {
                return "Green";
            }
            else if (d=="Draw") {
                return "Yellow";
            }
            else {
                return "Red";
            }
        })
        .style("stroke","Black")
        .style("stroke-width","1px")
        .style("fill-opacity",mycfg.opacityArea)
    ;
//Create text next to squares
    legend.selectAll('text')
        .data(["Win","Draw","Loss"])
        .enter()
        .append("text")
        .attr("x", function(d, i){ return i * 60 + 9+w;})
        .attr("y", 55)
        .attr("font-size", "20px")
        .attr("fill", "#00000")
        .text(function(d) { return d; })
    ;
}