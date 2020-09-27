const notification = document.querySelector(".notification");
const image = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature p"); 
const tempDescription = document.querySelector(".temp-description p");
const place = document.querySelector(".place p");
const backgroundImg = document.querySelector("#forbackground");

const weather = {};
weather.temperature = {
    unit: "celcius"
}

const KELVIN = 273;
const apiKey = "c9a22052f141f6d23af3fa2b3e5583f4";

// To check whether browser support geolocation or not

if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, errorMsg);
} else {
    notification.style.display = "block";
    notification.innerHTML = "<p>Brower does not support the geolocation</p>";
}

// To get the current co-ordinates of the user

function setPosition(position){
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;

    getWeather(latitude, longitude)
}

// To show error if there is any problem with the geolocation

function errorMsg(error){
    notification.style.display = "block";
    // notification.innerHTML = `<h2> ${error.message} </h2>`;
    notification.innerHTML = "<h2>Not able to find the location!</h2>";
}

// To get the data from the weather API 

function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(api)
        .then(function(response){
            return data = response.json();
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - KELVIN);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
        })
        .then(function(){
            displayAll()
        })
}

// To display the value to the user screen

function displayAll(){
    image.innerHTML = `<img src="./icons/${weather.iconId}.png">`;
    temperature.innerHTML = `${weather.temperature.value} &deg<span>C</span>`;
    tempDescription.innerHTML = `${weather.description}`;
    place.innerHTML = `in ${weather.city}`;
    backgroundImg.style.backgroundImage = `url(./backgroundImages/${weather.iconId}.jpg)`;
};

// Celcius to Fehrenheit and from celcius to fehrenheit
function C2F(tempInCelcius) {
    return (tempInCelcius * 9) / 5 + 32;
}
temperature.addEventListener("click", function(){
    if (weather.temperature.value === "undefined") return;
    if(weather.temperature.unit === "celcius"){
        let fehrenheit = C2F(weather.temperature.value);
        fehrenheit = Math.floor(fehrenheit);
        temperature.innerHTML = `${fehrenheit} &deg<span>F</span>`;
        weather.temperature.unit = "fehrenheit";
    } else{
        temperature.innerHTML = `${weather.temperature.value} &deg<span>C</span>`;
        weather.temperature.unit = "celcius";
    }
});
