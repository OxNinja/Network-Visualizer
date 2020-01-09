// Loading the current uploaded file
customData = [
    {
        name: "Wesh alors",
        children: [
            { name: "C'est nouveau", value: 10 },
            { name: "On peut upload", value: 10 }
        ]
    },
    {
        name: "Test",
        children: [
            { name: "Bonjour", value: 10 },
            { name: "salut à tous", value: 10 },
            { name: "wlh comme disent les d'jeuns", value: 10}
        ]
    },
    {
        name: "Allô",
        children: [
            { name: "Tu as reçu les photos ?", value: 10 },
            { name: "NIQUE", value: 10 }
        ]
    }
];

am4core.ready(function() {

am4core.useTheme(am4themes_dark);
am4core.useTheme(am4themes_animated);

var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);
var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries())

chart.data = customData;

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
