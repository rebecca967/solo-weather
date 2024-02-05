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

function displayForecast(response) {
  console.log(response.data)
  let forecastElement = document.querySelector("#forecast")
 
  let days =["Mon","Tues","Wed","Thurs","Fri","Sat"]
  let forecastHtml=""
  
  days.forEach(function(day) { 
    forecastHtml = 
    forecastHtml +
    `<div class = "weather-forecast">
    
      <div class="weather-forecast-date">${day}</div>
      
      <img src= "http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-night.png" alt="" width="42">
      <div class="weather-forecast-temperatures"> <span class="weather-forecast-temperature-max">18°C</span>
        <span class="weather-forecast-temperature-minimum">12°C</span>
      </div>
     </div>
    </div>
    `

  }) 
  forecastElement.innerHTML= forecastHtml

}



function handleSearchSubmit(event) 
{
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  console.log(searchInput.value);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
  searchCity(searchInput.value)
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Edmonton") 
displayForecast()
