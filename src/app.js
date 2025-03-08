function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement=document.querySelector("#description");
  let humidityElement=document.querySelector("#humidity");
   let windElement=document.querySelector("#wind-speed");
   let timeElement=document.querySelector("#time");
   let date=new Date(response.data.time*1000);
   let iconElement=document.querySelector("#icon")
  cityElement.innerHTML = response.data.city;

  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML=response.data.condition.description;
  humidityElement.innerHTML=`${response.data.temperature.humidity} %`;
 windElement.innerHTML=`${response.data.wind.speed}km/hr`;
 iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

timeElement.innerHTML = formatDate(date);




}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${day} ${hours}:${minutes}`;
}


function searchCity(city) {
  let apiKey = "3e8759b0d65caf6a360f578a42b9dot8";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshWeather);
}



function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);
searchCity("Nairobi")
