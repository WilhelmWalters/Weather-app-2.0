function presentData(response) {
  console.log(response.data);
}

let apiKey = "489055a913f2ed412a9598a039efc966";
let cityName = "New York";
let units = `metric`;
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

axios.get(apiUrl).then(presentData);
