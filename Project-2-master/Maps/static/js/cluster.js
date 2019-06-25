var map = L.map("map", {
    center: [37.0902, -95.7129],
    zoom: 1
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);
  
 
  
  var newtry = "./static/parse_gtdb.csv";

  d3.csv(newtry, function(response) {
    //console.log(response);
    var markers = L.markerClusterGroup();
    for (var i = 0; i < response.length; i++) {
        
        var lng = +response[i].longitude
        var lat = +response[i].latitude   
        if (lng) {
          console.log([lng, lat])
            markers.addLayer(L.marker([lat, lng]))
            .bindPopup(response[i].city);
      }
  }
  map.addLayer(markers);
});