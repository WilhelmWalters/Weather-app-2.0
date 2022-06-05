function displayDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `Updated on: ${day} ${hours}:${minutes}`;
}

let celciusTemperature = null;

function presentData(response) {
  console.log(response.data);
  celciusTemperature = response.data.main.temp;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celciusTemperature);
  let name = document.querySelector("#city-name");
  name.innerHTML = response.data.name;
  let description = document.querySelector(`#weather-description`);
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `${response.data.main.humidity}% Humidity`;
  let wind = document.querySelector(`#wind-speed`);
  wind.innerHTML = `${response.data.wind.speed} km/h Wind Speed`;
  let date = document.querySelector(`#date`);
  date.innerHTML = displayDate(response.data.dt * 1000);
  let iconElement = document.querySelector(`#icon`);
  let icon = response.data.weather[0].icon;
  console.log(icon);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let inputBar = document.querySelector("#input-bar");
inputBar.addEventListener("submit", generateForecast);
function generateForecast(event) {
  event.preventDefault();
  let location = document.querySelector("#bar-input");
  if (location.value !== undefined) {
    let locationInput = location.value;
    locationInput = locationInput.toLowerCase();
    let apiKey = "489055a913f2ed412a9598a039efc966";
    let units = `metric`;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location.value}&appid=${apiKey}&units=${units}`;
    console.log(apiUrl);
    axios.get(apiUrl).then(presentData);
  } else {
    alert("City not recognised :(");
  }
}

let farenheit = document.querySelector("#f-converter");
farenheit.addEventListener("click", convertToF);
let celcius = document.querySelector("#c-converter");
celcius.addEventListener("click", convertToC);

function convertToF(event) {
  event.preventDefault();
  let farenheitDegrees = (celciusTemperature * 9) / 5 + 32;
  let displayTemperature = document.querySelector("#temperature");
  displayTemperature.innerHTML = Math.round(farenheitDegrees);
}

function convertToC(event) {
  event.preventDefault();
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celciusTemperature);
}
