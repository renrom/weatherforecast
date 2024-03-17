import '../css/styles.css'


const apiKey = "4c50907eb53d47b5a2c142345241503"
const baseUrl = "https://api.weatherapi.com/v1/current.json"
const defaultCity = 'Nieuwegein'
const tempIndicator = 'c'
let degreesign = '∞'

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
    
    const country = toDayWeather[0].country
    const localtime = toDayWeather[0].localtime
    const name = toDayWeather[0].name
    const region = toDayWeather[0].region
    const textWeather = toDayWeather[1].condition.text
    const iconWeather = "https:"+toDayWeather[1].condition.icon
    const tempFeelsCelcius = toDayWeather[1].feelslike_c
    const tempFeelFahrenheit = toDayWeather[1].feelslike_f
    const tempCelcius = toDayWeather[1].temp_c
    const tempFahrenheit = toDayWeather[1].temp_f
    const humidity = toDayWeather[1].humidity
    const winddegree = toDayWeather[1].wind_degree

    console.log(winddegree);

    city.textContent = name;

    if (tempIndicator === 'c') {
        temp.textContent = tempCelcius + " °C";
    } else {
        temp.textContent = tempFahrenheit + "°F";
    }

    imgCurrent.src = iconWeather;

    if (winddegree >=0 & winddegree <= 23 ) {
        showArrow('↑')
    };

    if (winddegree >=24 & winddegree <=68) { 
        showArrow('↗')
    }

    if (winddegree >=69 & winddegree <= 113) { 
        showArrow('→')
        }

    if (winddegree >=114 & winddegree <= 158) { 
        showArrow('↘')

    }

    if (winddegree >=159 & winddegree <= 203) { 
        showArrow('↓')
    }

    if (winddegree >=204 & winddegree <= 248) { 
        showArrow('↙')
    }

    if (winddegree >=249 & winddegree <= 293) { 
        showArrow('←')
    }

    if (winddegree >=294 & winddegree <= 360) { 
        showArrow('↑')
    }
    
    
}


function showArrow(arrow) {
    const windArrow = document.querySelector('.windarrow');
    windArrow.textContent = arrow;    

}

async function getWeather(location) {

    try {
    const forecast = await fetch(baseUrl+"?key="+apiKey+"&q="+location, {mode: 'cors'})

    if (!forecast.ok) {

        console.log('Sorry there was an error')
        return 
    }
    
    const forecastResult = await forecast.json();
    return Object.values(forecastResult)
    } catch (error) {
        alert("Uh Oh "+error)
    }
}

