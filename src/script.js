function presentData(response) {
  console.log(response.data);
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let name = document.querySelector("#city-name");
  name.innerHTML = response.data.name;
  let description = document.querySelector(`#weather-description`);
  description.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector(`#humidity`);
  humidity.innerHTML = `${response.data.main.humidity}% Humidity`;
  let wind = document.querySelector(`#wind-speed`);
  wind.innerHTML = `${response.data.wind.speed} km/h Wind Speed`;
}

let apiKey = "489055a913f2ed412a9598a039efc966";
let searchedName = `New York`;
let units = `metric`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchedName}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(presentData);
