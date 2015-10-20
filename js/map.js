  // Function to draw the initial map

  (function(){

  window.onload = function() {
    drawMap();
  };

  var drawMap = function() {
    map = L.map('container').setView([40, -100], 4);

    var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map);

    getData();
  }

  // Function for getting data
  var getData = function() {
    var ajax = new XMLHttpRequest();
    ajax.onload = customBuild;
    ajax.open("GET", "data/response.json", true);
    ajax.send();
  }

  // Uses the data to generate points on the map
  var customBuild = function() {

    var file = JSON.parse(this.responseText);
    
    var white = new L.LayerGroup([]);
    var black = new L.LayerGroup([]);
    var asian = new L.LayerGroup([]);
    var indian = new L.LayerGroup([]);
    var hawaiian = new L.LayerGroup([]);
    var other = new L.LayerGroup([]);

    var whiteMale = 0;
    var whiteWomanUnspecified = 0;
    var nonWhiteMale = 0;
    var nonWhiteWomanUnspecified = 0;

    for(var i = 0; i < file.length; i++){
      var info = file[i];

      var lat = info["lat"];
      var lng = info["lng"];
      var race = info["Race"];
      var gender = info["Victim's Gender"];
      var summary = info["Summary"];
      var link = info["Source Link"];

      if (race == "White") {
            if (gender == "Male") {
                whiteMale++;
            } else {
                whiteWomanUnspecified++;
            }
        } else {
            if (gender == "Male") {
                nonWhiteMale++;
            } else {
                nonWhiteWomanUnspecified++;
            }
        }

      var circle = new L.circleMarker([lat, lng], {color: "black"});
      if(race == "White"){
        circle.addTo(white);
        if ( info["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red"});
        }
        circle.bindPopup(summary + "<a href=\"" + link + "\"> link </a>" );
      }else if(race == "Black or African American"){
        circle.addTo(black);
        if ( info["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red"});
        }
        circle.bindPopup(summary + "<a href=\"" + link + "\"> link </a>" );
      }else if(race =="Asian"){
        circle.addTo(asian);
        if ( info["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red"});
        }
        circle.bindPopup(summary + "<a href=\"" + link + "\"> link </a>" );
      }else if(race == "American Indian or Alaska Native"){
        circle.addTo(indian);
        if ( info["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red"});
        }
        circle.bindPopup(summary + "<a href=\"" + link + "\"> link </a>" );
      }else if(race == "Native Hawaiian or Other Pacific Islander"){
        circle.addTo(hawaiian);
        if ( info["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red"});
        }
        circle.bindPopup(summary + "<a href=\"" + link + "\"> link </a>" );
      }else{
        circle.addTo(other);
        if ( info["Hit or Killed?"] == "Killed") {
            circle.setStyle({color: "red"});
        }
        circle.bindPopup(summary + "<a href=\"" + link + "\"> link </a>" );
      }
    }

    var all = [white, black, asian, indian, hawaiian, other];
    for(var i = 0; i < all.length; i++){
      map.addLayer(all[i]);
    }

    $("#WM").html(whiteMale);
    $("#WWU").html(whiteWomanUnspecified);
    $("#NWM").html(nonWhiteMale);
    $("#NWWU").html(nonWhiteWomanUnspecified);


    var LayerGroup = {
        "White": white,
        "Black or African American": black,
        "Asian": asian,
        "American Indian or Alaska Native": indian,
        "Hawaiian or Other Pacific Islander": hawaiian,
        "Unknown": unknown,
    }

    L.control.layers(null, LayerGroup).addTo(map);
  }

})();
