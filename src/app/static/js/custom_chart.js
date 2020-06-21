// Global variables
var customData;

var getFile = async () => {
    var a = await fetch("/uploaded");

    return a;
}

// Parse the XML document and store things into variables to craft the customData object
var init = async () => {

    var p = new DOMParser();
    var a = await getFile();
    var d = p.parseFromString(await a.text(), "text/xml");

    var root = d.children.item(0).children.item(3);

    var chartName = root.children.item(1).attributes["addr"].value;
    var ports = root.children.item(3).children;
    var chartChildren = [];
    var ports_n = ports.length;
    for(var i = 1; i < ports_n; i++){
        var port = ports.item(i);
        var service = port.children.item(1).attributes["product"].value;
        service += " :";
        service += port.attributes["portid"].value;
        var tmp = { name: service, value: 10};
        chartChildren.push(tmp)
    }

    customData = [
        {
            name: chartName,
            children: chartChildren
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

}

// main
init();

