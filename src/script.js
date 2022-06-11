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

let celsiusTemperature = null;

function presentData(response) {
  console.log(response.data);
  celsiusTemperature = response.data.main.temp;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
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
    `https://openweathermap.org/img/wn/${icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "489055a913f2ed412a9598a039efc966";
  let units = `metric`;
  let apiCoordUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  console.log(apiCoordUrl);
  axios.get(apiCoordUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#weather-forecast");

  let forecast = response.data.daily;

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="weather-forecast-date">${forecastDay.dt}</div>
      <img
        src="https://ssl.gstatic.com/onebox/weather/64/partly_cloudy.png"
        alt="Cloudy img"
      />
      <div class="forecast-temperatures">
        <span class="forecast-maximum">
          ${forecastDay.temp.max} <a href="#"> °C</a> <span>|</span>
          <a href="#"> °F</a>
        </span>
        <span class="forecast-minimum">
          ${forecastDay.temp.min} <a href="#"> °C</a> <span>|</span>
          <a href="#">°F</a>
        </span>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let inputBar = document.querySelector("#input-bar");
inputBar.addEventListener("submit", generateForecast);

function generateForecast(event) {
  event.preventDefault();
  let location = document.querySelector("#bar-input");
  search(location.value);
}
function search(city) {
  let apiKey = "489055a913f2ed412a9598a039efc966";
  let units = `metric`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  axios.get(apiUrl).then(presentData);
}

let fahrenheit = document.querySelector("#f-converter");
fahrenheit.addEventListener("click", convertToF);
let celsius = document.querySelector("#c-converter");
celsius.addEventListener("click", convertToC);

function convertToF(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let fahrenheitDegrees = (celsiusTemperature * 9) / 5 + 32;
  let displayTemperature = document.querySelector("#temperature");
  displayTemperature.innerHTML = Math.round(fahrenheitDegrees);
}

function convertToC(event) {
  event.preventDefault();
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(celsiusTemperature);
}

search("London");
