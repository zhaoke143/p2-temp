var map = L.map("map", {
    center: [0, 0],
    zoom: 2
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
            markers.addLayer(L.marker([lat, lng])
            //.bindPopup(response[i].imonth));
            .bindPopup("<h2>" + response[i].attacktype1_txt + "</h2> <h4>Weapons Used: "+ response[i].weaptype1_txt +"</h4> <hr> <h3>City: " + response[i].city + ", " + response[i].country_txt + "</h3> <hr> <h3>Date: " + response[i].imonth  + "/" + response[i].iday + "/" + response[i].iyear + "</h3> <hr> <h3>Deaths: " + response[i].nkill + "</h3> <hr> <h3>Wounded: " + response[i].nwound + "</h3>"));
            
      }
  }
  map.addLayer(markers);
  console.log(response);
});