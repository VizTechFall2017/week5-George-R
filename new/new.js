var height = 600;
var width = 800;

var padding = { "top": 125,
                "right": 100,
                "bottom": 0,
                "left": 100 };

var nestedData;


var svg = d3.select(".svg-container")
              .append("svg")
              .attr("height", height)
              .attr("width", width)
              .append("g")
              .attr("transform", "translate(" + padding.left + "," + padding.top + ")");

var selectedTeam;
var scaleX;
var scaleY;

d3.csv("players.csv", function(error, data) {
    if (error) { throw error };

    data.forEach(function(d){
      d.threep = +d.threep;
      d.threes = +d.threes;

    });

    var dataIn = data.filter( function(d) {
                     return d.threes >= 20
    });

    nestedData = d3.nest()
        .key(function(d){ return d.Team })
        .entries(dataIn)

;

    console.log(nestedData);

    optionMenu();

    chartTitle();

    xLabel();
    yLabel();

    var firstElement = d3.select("option").property("value");

    selectedTeam = updateData(firstElement);

    scaleX = d3.scaleLinear()
                 .domain([20, 70])
                 .range([0, 600])


    scaleY = d3.scaleLinear()
                .domain([0.50,0])
                .range([0, 400])



    xAxis(scaleX);
    yAxis(scaleY);


    drawPoints(selectedTeam);

});

function optionMenu() {

  var menu = d3.select(".menu-container")
                 .append("select")
                 .attr("name", "dropdown-menu")
                 .attr("class", "dropdownmenu")
                 .on("change", option);

      menu.selectAll("option")
           .data(nestedData)
           .enter()
           .append("option")
           .text(function(d) { return d.key })
           .attr("value", function(d) { return d.key });
};




function colorFill(d) { if (d.Team == "Raptors") {
                                  return "#FF2819"

                      } else if (d.Team== "Celtics") {
                                  return "darkgreen"
                                }
                        else {
                                  return "darkorange"
                        }
                     };

function drawPoints(dataPoints) {

        var selection = svg.selectAll("circle")
            .data(dataPoints)

       selection.transition()
                .duration(500)
                .ease(d3.easeSin)
                .attr("cx", function(d) {
                  return scaleX(d.threes)
                })
                .attr("cy", function(d) {
                  return scaleY(d.threep)
                })
                .attr("r", 5)
                .attr("fill", colorFill)

        selection.enter().append("circle")
                  .attr("cx", function(d) {
                    return scaleX(d.threes)
                  })
                  .attr("cy", function(d) {
                    return scaleY(d.threep)
                  })
                  .attr("r", 0)
                    .transition()
                    .duration(500)
                    .ease(d3.easeSin)
                  .attr("r", 5)
                  .attr("fill", colorFill)



        selection.exit()
                    .transition()
                    .duration(200)
                    .ease(d3.easeSin)
                  .attr("r", 0)
                 .remove();

};


function chartTitle() {
          svg.append("text")
               .attr("x", 0)
               .attr("y", -50)
               .attr("font-size", 24)
               .text("3-Point Shooting Efficiency, 2016");
};


function xLabel() {
          svg.append("text")
              .attr("x", 300)
              .attr("y", 440)
              .attr("font-size", 13)
              .attr("text-anchor", "middle")
              .text("3pt FGA%");
};

function yLabel() {
          svg.append("text")
               .attr("transform", "rotate(270)")
               .attr("x", -200)
               .attr("y", -60)
               .attr("font-size", 13)
               .attr("text-anchor", "middle")
               .text("3pt Shooting %");
};


function xAxis(scale) {
          svg.append("g")
              .attr("transform", "translate(0, 400)" )
              .attr("class", "xAxis")
              .call(d3.axisBottom(scale));
};

function yAxis(scale) {
          svg.append("g")
              .attr("transform", "translate(0,0)")
              .attr("class", "yAxis")
              .call(d3.axisLeft(scale));
};

function updateData(newSelection) {

    return nestedData.filter(function(d){ return d.key == newSelection })[0].values
};

function option() {
  selectValue = d3.select(this).property("value")
  newData = updateData(selectValue);





  drawPoints(newData);

};
