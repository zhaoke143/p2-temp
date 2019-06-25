var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  });
  
  var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets-satellite",
  accessToken: API_KEY
});

var map = L.map("map", {
  center: [0, 0],
  zoom: 2,
  layers: [graymap, satellitemap] 
});

var baseMaps = {
  Satellite: satellitemap,
  Grayscale: graymap,
};

var uskilled = new L.LayerGroup();

var overlays = {
  "US Citizens Killed": uskilled,
  
};

L.control.layers(baseMaps, overlays).addTo(map);

var newtry = "./static/parse_gtdb.csv";

  d3.csv(newtry, function(response) {
    //console.log(response);
    var markers = L.markerClusterGroup();
    var uskilled = L.markerClusterGroup();
    for (var i = 0; i < response.length; i++) {
        var lng = +response[i].longitude
        var lat = +response[i].latitude   
        if (lng) {
          console.log([lng, lat])
            markers.addLayer(L.marker([lat, lng])
            .bindPopup("<h2>" + response[i].attacktype1_txt + "</h2> <h4>Weapons Used: "+ response[i].weaptype1_txt +"</h4> <h4>Target: "+ response[i].target1 +"</h4> <hr> <h3>City: " + response[i].city + ", " + response[i].country_txt + "</h3> <hr> <h3>Date: " + response[i].imonth  + "/" + response[i].iday + "/" + response[i].iyear + "</h3> <hr> <h3>Deaths: " + response[i].nkill + "</h3> <hr> <h3>Wounded: " + response[i].nwound + "</h3>"));    
      }};
    for (var i=0; i < response.length; i++) {
        var us = +response[i].nkillus
        var lng = +response[i].longitude
        var lat = +response[i].latitude  
        console.log(us)
        if (us >= 1) {
            uskilled.addLayer(L.marker([lat, lng]).bindPopup(response[i].nkillus));
        };
      }
  map.addLayer(markers, uskilled);
  console.log(response);
});
 

