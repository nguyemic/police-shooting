// Function to draw your map
var drawMap = function() {
        // Create map and set view
        var map = L.map('map').setView([40, -100], 4)
            // Create a tile layer variable using the appropriate url
            /*var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')*/
            // Add the layer to your map
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        // Execute your function to get data
        /*L.marker([122.3331, 47.6097]).addTo(map)
    .bindPopup('Officers responded to a report of a wehicle prowler.<br> subject was shot and fatally wounded after officers arrived on the scene.Report states that subject had a gun in his possession. (link)')
    .openPopup();*/
    }
    // Function for getting data
var getData = function() {
        // Execute an AJAX request to get the data in data/response.js
        $.ajax({
            url: 'data/response.json',
            type: "get",
            success: function(data) {
                customBuild(data);
            },
            dataType: "json"
        });
        // When your request is successful, call your customBuild function
    }
    // Loop through your data and add the appropriate layers and points
var customBuild = function(data) {
    // Be sure to add each layer to the map


    var white = new L.LayerGroup([]);
    var black = new L.LayerGroup([]);
    var asian = new L.LayerGroup([]);
    var hawaiian = new L.LayerGroup([]);
    var indian = new L.LayerGroup([]);
    var unknown = new L.LayerGroup([]);
    var allLayers = [white, black, asian, hawaiian, indian, unknown];

    var whiteMale = 0;
    var whiteWomanUnspecified = 0;
    var nonWhiteMale = 0;
    var nonWhiteWomanUnspecified = 0;


    for (var i = 0; i < data.length; i++) {
        var info = data[i];
        if (info["Race"] == "White") {
            if (info["Victim's Gender"] == "Male") {
                whiteMale++;
            } else {
                whiteWomanUnspecified++;
            }
        } else {
            if (info["Victim's Gender"] == "Male") {
                nonWhiteMale++;
            } else {
                nonWhiteWomanUnspecified++;
            }
        }
        var circleColor = 'black';
        if (info["Hit or Killed?"] == 'Killed') {
            circleColor = 'red';
        }


        var circle = new L.circleMarker(info["lat"], info["lng"], {color: circleColor});
        if (info["Race"] == "White") {
            circle.addTo(white);
            circle.bindPopup(info["Summary"]);
        } else if (info["Race"] == "Black or African American") {
            circle.addTo(black);
            circle.bindPopup(info["Summary"]);
        } else if (info["Race"] == "Asian") {
            circle.addTo(asian);
            circle.bindPopup(info["Summary"]);
        } else if (info["Race"] == "Native Hawaiian or Other Pacific Islander") {
            circle.addTo(hawiian);
            circle.bindPopup(info["Summary"]);
        } else if (info["Race"] == "American Indian or Alaska Native") {
            circle.addTo(indian);
            circle.bindPopup(info["Summary"]);
        } else {
            circle.addTo(unknown)
            circle.bindPopup(info["Summary"]);
        }
    }
    // Once layers are on the map, add a leaflet controller that shows/hides layers
    /*for (var i = 0; i < allLayers.length; i++) {
        map.addLayer(allLayers[i]);
    }*/

      $("#WM").html(whiteMale);
      $("#WWU").html(whiteWomanUnspecified);
      $("#NWM").html(nonWhiteMale);
      $("#NWWU").html(nonWhiteWomanUnspecified);

      var layers = {
         "White":  white,
         "Black or African American": black,
         "Asian":  asian,
         "American Indian or Alaska Native":  indian,
         "Hawaiian or Other Pacific Islander":  hawaiian,
         "Unknown":  unknown,
      }

      /*L.control.layers(null,{"Other":other, "White":white,"Black or African-American":black, "Asian": asian, "American Indian or Alaska Native": indian, "Native Hawaiian or Other Pacific Islander": hawaiian}).addTo(map);
  */
    L.control.layers(null, layerGroup).addTo(map);
}
