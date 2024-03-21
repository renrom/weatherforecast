import '../css/styles.css';

import { whichArrow, showKmorMp, showTemp } from './determenArrow.js';

import sunnyBackdrop from '../assets/images/sunny.jpg';
import cloudBackdrop from '../assets/images/cloud.jpg';
import rainBackdrop from '../assets/images/rain.jpg';
import snowBackdrop from '../assets/images/snow.jpg';
import partCloudBackdrop from '../assets/images/partcloud.jpg';

require('date-fns');

const { format } = require('date-fns');

const apiKey = '4c50907eb53d47b5a2c142345241503';
const baseUrl = 'https://api.weatherapi.com/v1/current.json';
const defaultCity = 'Nieuwegein';
const tempIndicator = 'c';
const windspeedmessure = 'k';
const degreesign = '∞';
const backdrop = sunnyBackdrop;

const searchLocation = document.querySelector('.btnsearch');

async function getWeather(location) {
  try {
    const forecast = await fetch(`${baseUrl}?key=${apiKey}&q=${location}`, { mode: 'cors' });

    if (!forecast.ok) {
      console.log('Sorry there was an error');
      return;
    }

    const forecastResult = await forecast.json();
    return Object.values(forecastResult);
  } catch (error) {
    alert(`Uh Oh ${error}`);
  }
}

getWeather(defaultCity).then((toDayWeather) => {
  showResult(toDayWeather);
  showKmorMp(true);
  showTemp(true);
});

const changeMeasure = document.querySelector('#measure');

changeMeasure.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    showKmorMp(false);
  } else {
    showKmorMp(true);
  }
});

const changeTemp = document.querySelector('#tempchoose');

changeTemp.addEventListener('change', (event) => {
  if (event.currentTarget.checked) {
    showTemp(false);
  } else {
    showTemp(true);
  }
});

searchLocation.addEventListener('click', () => {
  const location = document.getElementById('location').value;

  getWeather(location).then((toDayWeather) => {
    showResult(toDayWeather);
  });
});

function showResult(toDayWeather) {
  const city = document.querySelector('.city');
  const temp = document.querySelector('.temp');
  const tempF = document.querySelector('.tempF');
  const current = document.querySelector('.current');
  const imgCurrent = document.getElementById('iconcurrentweather');
  const lastUpdated = toDayWeather[1].last_updated;
  const { country } = toDayWeather[0];
  const { name } = toDayWeather[0];
  const textWeather = toDayWeather[1].condition.text;
  const iconWeather = `https:${toDayWeather[1].condition.icon}`;
  const codeWeather = toDayWeather[1].condition.code;
  const tempCelcius = toDayWeather[1].temp_c;
  const tempFahrenheit = toDayWeather[1].temp_f;
  const { humidity } = toDayWeather[1];
  const winddegree = toDayWeather[1].wind_degree;
  const windspeedkm = `${toDayWeather[1].wind_kph} km/h`;
  const windspeedmp = `${toDayWeather[1].wind_mph} mph`;

  const arrow = whichArrow(winddegree);

  showArrow(arrow, windspeedkm, windspeedmp);

  if (codeWeather === 1000) {
    setBackground(sunnyBackdrop);
  }

  if (codeWeather === 1003) {
    setBackground(partCloudBackdrop);
  }

  if (codeWeather >= 1150 & codeWeather <= 1201) {
    setBackground(rainBackdrop);
  }

  if (codeWeather === 1006 || codeWeather === 1009) {
    setBackground(cloudBackdrop);
  }

  if (codeWeather >= 1210 & codeWeather <= 1225) {
    setBackground(snowBackdrop);
  }

  // console.log(toDayWeather[0]);
  // console.log(toDayWeather[1]);

  city.textContent = name;
  current.textContent = textWeather;

  temp.textContent = `${tempCelcius} °C`;
  tempF.textContent = `${tempFahrenheit} °F`;

  imgCurrent.src = iconWeather;

  const result = format(lastUpdated, 'dd-MM-yyyy');

  const lastUpdatedDOM = document.querySelector('.lastupdated');
  lastUpdatedDOM.textContent = result;

  const humidityDOM = document.querySelector('.humidity');
  humidityDOM.textContent = `${humidity}%`;
}

function setBackground(background) {
  const backdrop = document.querySelector('body');
  backdrop.style.backgroundImage = `url(${background})`;
}

function showArrow(arrow, speed, speedmph) {
  const windArrow = document.querySelector('.windarrow');
  const windArrormph = document.querySelector('.windarrowmph');
  windArrow.textContent = `${arrow} ${speed}`;
  windArrormph.textContent = `${arrow} ${speedmph}`;
}
