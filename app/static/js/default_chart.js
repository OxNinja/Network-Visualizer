am4core.ready(function() {

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

chart.data = [
    {
        name: "Host : 10.0.0.1",
        children: [
            { name: "Apache :80", value: 10 },
            { name: "SSH :22", value: 10 }
        ]
    },
    {
        name: "Host : 10.0.0.2",
        children: [
            { name: "FTP :23", value: 10 },
            { name: "GraphQL :3000", value: 10 },
            { name: "Flask :5000", value: 10}
        ]
    }
];

networkSeries.dataFields.value = "value";
networkSeries.dataFields.name = "name";
networkSeries.dataFields.children = "children";
networkSeries.nodes.template.tooltipText = "{name}";
networkSeries.nodes.template.fillOpacity = 1;
networkSeries.manyBodyStrength = -25;
networkSeries.links.template.strength = 0.9;
networkSeries.minRadius = am4core.percent(5);

networkSeries.nodes.template.label.text = "{name}"
networkSeries.fontSize = 12;

});
