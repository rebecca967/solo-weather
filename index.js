function refreshWeather(response)
{
  console.log(response.data.temperature.current)
  let temperatureElement= document.querySelector("#temperature")
   let temperature= response.data.temperature.current
   let cityElement = document.querySelector("#city");
   let descriptionElement = document.querySelector("#description")
   let humidityElement = document.querySelector("#humidity")
   let windElement = document.querySelector("#wind")
   let timeElement = document.querySelector("#time")
   let date = new Date (response.data.time * 1000)
   let iconElement = document.querySelector("#icon")
 
  cityElement.innerHTML = response.data.city
  descriptionElement.innerHTML = response.data.condition.description
  temperatureElement.innerHTML= Math.round(temperature)
  humidityElement.innerHTML=`${response.data.temperature.humidity}%`
  windElement.innerHTML=`${response.data.wind.speed}km/h`
  timeElement.innerHTML= formatDate(date)
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url} "class="weather-app-icon"/>`
 
  getForecast(response.data.city)
}
console.log("data")


let forecastHtml = "";

function formatDate(date){
   let minutes = date.getMinutes()
  let hours = date.getHours()
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"]
    let day = days[date.getDay()]
    if(minutes<10){
      minutes = `0${minutes}`
    }
  
    return `${day}  ${hours}:${minutes}`
}


function searchCity(city) {
  let apiKey= "4dab37b88309477t52afoc35f8fb2163"
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`
  console.log(apiUrl)
  axios.get(apiUrl).then(refreshWeather)
}



function getForecast(city){
  let apiKey = "4dab37b88309477t52afoc35f8fb2163"
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric` 
  console.log(apiKey)
  console.log(apiUrl)
  axios(apiUrl).then(displayForecast)
}
function formatForecastDate (timestamp) {
  let today = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[today.getDay()];
    
  }

  function displayForecast(response) {
    console.log(response.data);
  
    let forecastHtml = "";
    let forecastElement = document.getElementById("forecast");
    response.data.daily.forEach(function (day, index) {
      if (index > 0) {
        forecastHtml +=
          '<div class="weather-forecast">' +
          '<div class="weather-forecast-date">' + formatForecastDate(day.time) + '</div>' +
          '<div class="weather-forecast-icon"><img src="' + day.condition.icon_url + '"></div>' +
          '<div class="weather-forecast-temperatures">' +
          '<div class="weather-forecast-temperature">' +
          '<strong>' + Math.round(day.temperature.maximum) + '°C</strong>' +
          '</div>' +
          '<div class="weather-forecast-temperature">' + Math.round(day.temperature.minimum) + '°C</div>' +
          '</div>' +
          '</div>';
      }
    });
    forecastElement.innerHTML = forecastHtml;
  } 




function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;

  searchCity(searchInput.value);
  displayForecast();
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Edmonton");