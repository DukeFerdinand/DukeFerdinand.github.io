"use strict";
var Lat;
var Lon;
getWeather(29.424349, -98.491142);

var mapElement = document.getElementById('map');

var mapOptions = {

	//zoom level

	zoom: 10,

	// This sets the center of the map at our location
     center: {
                lat:  29.424349,
                lng: -98.491142
            },
    mapTypeId: google.maps.MapTypeId.HYBRID
}

var map = new google.maps.Map(mapElement, mapOptions);


//Attach click event handler to the map.
	var marker;
	var markerCount = 0;
google.maps.event.addListener(map, 'click', function (e) {
    //Determine the location where the user has clicked.
    var location = e.latLng;
    //Create a marker and placed it on the map.
    if (markerCount != 0) {
    	marker.setMap(null);
    	
    }
    //new marker
    marker = new google.maps.Marker({
        position: location,
        map: map
    });
    markerCount ++;
    console.log(markerCount);
    //Attach click event handler to the marker.
    google.maps.event.addListener(marker, "click", function (e) {
        var infoWindow = new google.maps.InfoWindow({
            content: 'Latitude: ' + location.lat() + '<br />Longitude: ' + location.lng()
        });
        infoWindow.open(map, marker);
    });
   
        Lat = location.lat();
        Lon = location.lng();
        getWeather(Lat, Lon);
});



	function getWeather (Lat, Lon){
		$.ajax("http://api.openweathermap.org/data/2.5/forecast/daily", {

	    data: {
	        APPID: "1671273d8fb3358671b09111cf13ae9a",
	        lat: Lat, 
	        lon: Lon, 
	        cnt:   "7",
	        units: "imperial"
	    }

	}).done(function(data){
		//Using jQuery to sift through the API and find and display goodies relevent to the display
			
			var today;
			var date = new Date();
			

		for (var i = 0; i < data.list.length; i++){

		

			$('#city').html("Current City: " + data.city.name);

			for (var day = 0; day <= 7; day ++){

				today = date.getDay();
				today = today + i;
				today = (today % 7);
				
			switch (today) {
				case 1:
					today = "Monday";
					break;
				case 2:
					today = "Tuesday";
					break;
				case 3:
					today = "Wednesday";
					break;
				case 4:
					today = "Thursday";
					break;
				case 5:
					today = "Friday";
					break;
				case 6:
					today = "Saturday";
					break;
				case 0:
					today = "Sunday";
					break;
				default:
					today = 'Error';
					break;

				}
			}
			$('#date' + (i + 1)).text(today);
			$('#temp' + (i + 1)).html("<h3>" + data.list[i].temp.max + '/' + data.list[i].temp.min + '°F </h3>');
			$('#icon' +(i + 1)).html("<img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon +".png'><br>");
			$('#cloud' + (i + 1)).html("<strong>" + data.list[i].weather[0].main.toLowerCase() + ": </strong>" + data.list[i].weather[0].description + '<br>');
			$('#humidity' + (i + 1)).html("<strong>humidity: </strong>" + data.list[i].humidity + '<br>');
			$('#wind' +(i + 1)).html("<strong>wind: </strong>" + data.list[i].speed + ' mph<br>');
			$('#pressure' + (i + 1)).html("<strong>pressure: </strong>" + data.list[i].pressure + '<br>');

			}


	})
}
