// config API query string
const appId = "ec6a9ae40c1b59b3a2452744c1753210";
const cityName = "Ho Chi Minh City";
const units = "metric";

// query DOM
const weatherIcon = document.querySelector("#weatherIcon");
const weatherTemp = document.querySelector("#weatherTemp");
const weatherCity = document.querySelector("#weatherCity");
const searchBtn = document.querySelector("#searchBtn");
const searchCity = document.querySelector("#searchCity");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#windSpeed");
const weatherBody = document.querySelector(".weather-body");
const weatherNotfound = document.querySelector(".weather-notfound");
const iconTrash = document.querySelector("#iconTrash");

// Define display status icon weather
const weatherStatus = {
    Clouds: "assets/clouds.png",
    Clear: "assets/clear.png",
    Drizzle: "assets/drizzle.png",
    Humidity: "assets/humidity.png",
    Drizzle: "assets/drizzle.png",
    Drizzle: "assets/drizzle.png",
    Mist: "assets/mist.png",
    Rain: "assets/rain.png",
    Snow: "assets/snow.png",
    Wind: "assets/wind.png",
}

// handle get weather API use async/await
async function getWeather(cityName) {
    try {

        // await sleep(10000);

        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?&appid=${appId}&q=${cityName}&units=${units}`);

        if (!res.ok) {
            weatherBody.style.display = "none";
            weatherNotfound.style.display = "block";
            return;
        }

        const data = await res.json();

        // render UI
        weatherIcon.src = weatherStatus[data.weather[0].main];
        weatherCity.textContent = data.name;
        weatherTemp.textContent = Math.round(data.main.temp) + "°C";
        humidity.textContent = data.main.humidity + "%";
        windSpeed.textContent = data.wind.speed + ' km/h';

        weatherBody.style.display = "block";
        weatherNotfound.style.display = "none";

        // console.log(data);
    } catch (error) {
        console.log(error);
    }
}

// validate input search weather
function validateEmptyInput(location) {
    if (location.trim() === "") {
        getWeather(cityName);
        return false;
    }

    return true;
}

// handle click search button icon
searchBtn.onclick = function () {
    if (!validateEmptyInput(searchCity.value)) {
        return;
    }

    getWeather(searchCity.value);
}

// handle press `Enter` search input
searchCity.onkeypress = function (e) {
    if (e.key !== "Enter") {
        return;
    }

    if (!validateEmptyInput(searchCity.value)) {
        return;
    }

    getWeather(searchCity.value);
}

// check show/hide icon `X` input
searchCity.onkeyup = function () {
    if (searchCity.value.length > 0) {
        iconTrash.style.display = "block";
    } else {
        iconTrash.style.display = "none";
    }
}

// handle click icon `X` in input clear input value
iconTrash.onclick = function () {
    searchCity.value = "";
    searchCity.onkeyup();
}

// render UI
getWeather(cityName);

// sleep await server slow
function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
