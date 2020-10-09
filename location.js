var x = document.querySelector(".city-name");
var date = new Date();
var hour = date.getHours();


// Event handling for button "Check" 

document.getElementById("btn-choice").addEventListener("click", function () {
    getWheater($("#city-input").val());
});

// Event handling for press Enter 
document.getElementById("city-input").addEventListener("keypress", function (event) {
    if (event.keyCode == 13) {
        getWheater($("#city-input").val());
        console.log("asd");
        $("#city-input").val("");
    }
}, false);

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    displayLocation(lat, lon);
}

function showError(error) {
    switch (error.code) {
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function getWeather() {
    let temperature = document.getElementById("temperature");
    let description = document.getElementById("description");
    let location = document.getElementById("location");
  // Ho inserito questi, ma senza la api key scritta li non va la geolocalizzazione:
  // let apiKey = process.env.apiKey;
  // require('dotenv').config();
    let api = "https://api.openweathermap.org/data/2.5/weather";
    let apiKey = "d2d23e462feb4fa6e825ea3f6b15a3fb";
    
    location.innerHTML = "Locating...";
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      let url =
        api +
        "?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey +
        "&units=imperial";
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let temp = data.main.temp;
          temperature.innerHTML = temp + "° F";
          location.innerHTML =
            data.name + " (" + latitude + "°, " + longitude + "°)";
          description.innerHTML = data.weather[0].main;
        });
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
    
  
    location.innerHTML = "Locating...";
  
    navigator.geolocation.getCurrentPosition(success, error);
  
    function success(position) {
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
  
      let url =
        api +
        "?lat=" +
        latitude +
        "&lon=" +
        longitude +
        "&appid=" +
        apiKey +
        "&units=metric";
  
      fetch(url)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          let temp = data.main.temp;
          temperature.innerHTML = temp + "°C";
          location.innerHTML =
            data.name + " (" + latitude + "°, " + longitude + "°)";
          description.innerHTML = data.weather[0].main;
        });
    }
  
    function error() {
      location.innerHTML = "Unable to retrieve your location";
    }
  }
  getWeather();

function getWheater(city) {
    $.getJSON("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric" + "&appid=3a04b53f7b6d2edbaad0c1e9b9d783f1",
        function (response) {
            console.log(response);
            var city2 = city;
            var country = response.sys.country;
            var wheater = response.weather[0].main;
            var temp = response.main.temp;
            var pressure = response.main.pressure;
            var windSpeed = response.wind.speed;
            console.log(city2 + " " + country + " " + wheater + " " + temp + " " + pressure + " " + windSpeed);
            wheaterSet(city2, country, wheater, temp, pressure, windSpeed);
        });
}

function wheaterSet(city, country, wheater, temp, pressure, windSpeed) {
    console.log(wheater);
    if (wheater == "Clear") {
        $("#wheater-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/clearNight.mp4" type="video/mp4"></video>');
    }
    if (wheater == "Clear" && (hour <= 20 && hour >= 6)) {
        $("#wheater-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/clearDay.mp4" type="video/mp4"></video>');
    }
    if (wheater == "Rain") {
        $("#wheater-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/rain.mp4" type="video/mp4"></video>');
    }
    if (wheater == "Clouds") {
        $("#wheater-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/cloudsNight.mp4" type="video/mp4"></video>');
    }
    if (wheater == "Clouds" && (hour <= 20 && hour >= 6)) {
        $("#wheater-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/clouds.mp4" type="video/mp4"></video>');
    }
    if (wheater == "Snow") {
        $("#wheater-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/snow.mp4" type="video/mp4"></video>');
    }
    if (wheater == "Mist") {
        $("#wheater-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/mist.mp4" type="video/mp4"></video>');
    }
    if (wheater == "Thunderstorm") {
        $("#wheater-video").html("<video autoplay muted loop " + 'id="myVideo"><source  src="videos/thunderstorm.mp4" type="video/mp4"></video>');
    }
    //    $(".container-fluid").css("background", "rgba(0, 0, 0, 0.4)");    
    $("#city-info").html(city + " " + country);
    $("#wheat-info").html(wheater);
    $("#temp-info").html(temp + " &deg;C");
    $("#pressure-info").html(pressure + " hPa");
    $("#windSpeed-info").html(windSpeed + " m/s");
    $("#wheater-info").show();
    thunderstorm
}

