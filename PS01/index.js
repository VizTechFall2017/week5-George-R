var svg = d3.select('svg')
.append('g')
.attr('transform', "translate(100,100)");
var allData;

var scaleX = d3.scaleLinear().domain([0,30]).range([0,600]);
var scaleY = d3.scaleLinear().domain([60,0]).range([0,400]);

var currentYear = "Cavaliers";

d3.csv('team.csv', function(dataIn){

  allData = dataIn

  var data2016 = dataIn.filter(function(d){
  return d.year =="Cavaliers";

});

svg.selectAll('circle')
  .data(data2016)
  .enter()
  .append('circle')
  .attr('class', 'myCircles');

svg.append('g')
  .attr('transform', 'translate (0,400)')
  .call(d3.axisBottom(scaleX));

svg.append('g')
  .attr('transform', 'translate (0,0) ')
  .call(d3.axisLeft(scaleY));



updateData(data2016);

});

function updateData(dataPoints) {

  svg.selectAll('.myCircles')
    .data(dataPoints)
    .attr('cx', function(d){
    return scaleX(d.range);


  })
    .attr('cy', function(d){
    return scaleY(d.usage);

  })
    .attr('r', function(d){
    return d.r;

  })
  .attr('fill', function(d){

    return d.fill;

  })
};

function buttonClicked(){
  if (currentYear == "Cavaliers") {
    var data2017 = allData.filter(function(d){
     return d.year == "Warriors";
});

currentYear = "Warriors";

updateData(data2017);

}
else {

data2016 = allData.filter(function(d){
  return d.year == "Cavaliers";
});
console.log(data2016)
currentYear = "Cavaliers";
updateData(data2016);
}


}
window.setInterval(function(){
  buttonClicked()
}, 3000)

svg.append('text')
  .attr('x', 100)
  .attr('y', 0)
  .attr('font-size', 24)
  .text('Clevelnad Cavaliers vs Golden State Warriors')

svg.append('text')
    .attr('x', 60)
    .attr('y', 450)
    .attr('font-size', 16)
    .text(' < 8ft')

svg.append('text')
        .attr('x', 220)
        .attr('y', 450)
        .attr('font-size', 16)
        .text('8-16ft')

svg.append('text')
            .attr('x', 380)
            .attr('y', 450)
            .attr('font-size', 16)
            .text('16-24ft')

svg.append('text')
                        .attr('x', 470)
                        .attr('y', 450)
                        .attr('font-size', 16)
                        .text('24ft+')

svg.append('text')
      .attr('transform', 'rotate(270)')
      .attr('x', -220)
      .attr('y', -50)
      .attr('font-size', 16)
      .text('Usage %')
