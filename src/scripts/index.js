import '../css/styles.css'

import sunnyBackdrop from '../assets/images/sunny.jpg'
import cloudBackdrop from '../assets/images/cloud.jpg'
import rainBackdrop from '../assets/images/rain.jpg'
import snowBackdrop from '../assets/images/snow.jpg'
import partCloudBackdrop from '../assets/images/partcloud.jpg'


require('date-fns');

const { format } = require("date-fns");
const apiKey = "4c50907eb53d47b5a2c142345241503"
const baseUrl = "https://api.weatherapi.com/v1/current.json"
const defaultCity = 'Nieuwegein'
let tempIndicator = 'c'
let windspeedmessure = 'k'
let degreesign = '∞'
let backdrop = sunnyBackdrop;

const searchLocation = document.querySelector('.btnsearch')

getWeather(defaultCity).then((toDayWeather) => {
    showResult(toDayWeather)
});


searchLocation.addEventListener("click", () => {
    const location = document.getElementById("location").value
    console.log(location);
    getWeather(location).then((toDayWeather) => {
        showResult(toDayWeather)
    });

})

function showResult(toDayWeather) {

    const city = document.querySelector('.city')
    const temp = document.querySelector('.temp')
    const imgCurrent = document.getElementById('iconcurrentweather')
    const lastUpdated = toDayWeather[1].last_updated;
    const country = toDayWeather[0].country
    const name = toDayWeather[0].name
    const textWeather = toDayWeather[1].condition.text
    const iconWeather = "https:" + toDayWeather[1].condition.icon
    const codeWeather = toDayWeather[1].condition.code
    const tempCelcius = toDayWeather[1].temp_c
    const tempFahrenheit = toDayWeather[1].temp_f
    const humidity = toDayWeather[1].humidity
    const winddegree = toDayWeather[1].wind_degree
    const windspeedkm = toDayWeather[1].wind_kph
    const windspeedmp = toDayWeather[1].wind_mph

    const windspeed = windspeedkm + " km/h";


    if (codeWeather === 1000) {
        setBackground(sunnyBackdrop)
    }

    if (codeWeather === 1003) {
        setBackground(partCloudBackdrop)
    }

        if (codeWeather === 1009 || codeWeather === 1006) {
        setBackground(cloudBackdrop)
    }

    console.log(toDayWeather[0]);
    console.log(toDayWeather[1]);

    city.textContent = name;

    if (tempIndicator === 'c') {
        temp.textContent = tempCelcius + " °C";
    } else {
        temp.textContent = tempFahrenheit + "°F";
    }


    imgCurrent.src = iconWeather;


    if (winddegree >= 0 & winddegree <= 23) {
        showArrow('↑', windspeed)
    };

    if (winddegree >= 24 & winddegree <= 68) {
        showArrow('↗', windspeed)
    }

    if (winddegree >= 69 & winddegree <= 113) {
        showArrow('→', windspeed)
    }

    if (winddegree >= 114 & winddegree <= 158) {
        showArrow('↘', windspeed)

    }

    if (winddegree >= 159 & winddegree <= 203) {
        showArrow('↓', windspeed)
    }

    if (winddegree >= 204 & winddegree <= 248) {
        showArrow('↙', windspeed)
    }

    if (winddegree >= 249 & winddegree <= 293) {
        showArrow('←', windspeed)
    }

    if (winddegree >= 294 & winddegree <= 360) {
        showArrow('↑', windspeed)
    }

    const result = format(lastUpdated, 'dd-MM-yyyy');

    const lastUpdatedDOM = document.querySelector('.lastupdated');
    lastUpdatedDOM.textContent = result;

    const humidityDOM = document.querySelector('.humidity');
    humidityDOM.textContent = humidity + "%";


}

function setBackground(background){
    const backdrop = document.querySelector('body');
    backdrop.style.backgroundImage = 'url(' + background + ')';
    return
}

function showArrow(arrow, speed) {
    const windArrow = document.querySelector('.windarrow');
    windArrow.textContent = arrow + " " + speed;

}

async function getWeather(location) {

    try {
        const forecast = await fetch(baseUrl + "?key=" + apiKey + "&q=" + location, { mode: 'cors' })

        if (!forecast.ok) {

            console.log('Sorry there was an error')
            return
        }

        const forecastResult = await forecast.json();
        return Object.values(forecastResult)
    } catch (error) {
        alert("Uh Oh " + error)
    }
}

