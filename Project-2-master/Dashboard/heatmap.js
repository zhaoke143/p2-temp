var map = L.map("map", {
        center: [42.881054, 0.943188],
        zoom: 3
    });


    L
        .tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png")
        .addTo(map);
    
    
    
    
 // var url = "http://localhost:5000/api/v1.0/terrorism_data";    
 var csv_1 = "data2.csv"; //this dataset only contain nkill > 10.

// d3.json(url).then(function(data){
d3.csv(csv_1).then(function(data) {            
    console.log(data);

    var latlngs = [];

  for (var i = 0; i < data.length; i++) {
    var latitude = data[i].latitude;
    var longitude = data[i].longitude;
    var nkill = data[i].nkill;
    if (latitude) {
      latlngs.push([latitude, longitude]);
    }
  }

    var heat = L.heatLayer([], {
      radius: nkill,
      opacity: 1,
      gradient: {
        0.1: "rgb(0,0,255)",
        0.13: "rgb(0,255,255)",
        0.18: "rgb(0,255,0)",
        0.21: "rgb(255,255,0)",
        0.25:  "rgb(255,0,0)"
      }
    }).addTo(map);

    // Animation
    var index = 0;
    var id = setInterval(function(){
        heat.addLatLng(latlngs[index++]);
        if(index >= latlngs.length - 1){ clearInterval(id); }
    }, 1);

    
    // add markers
    latlngs.forEach(function(d, i){
        L.marker(d, {opacity: 0}) // hide points
          .bindPopup(data[i].nkill + " people killed at " + data[i].city, {keepInView: true})
          .addTo(map);
    });    




        });