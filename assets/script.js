// Get the necessary elements from the HTML
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const currentWeather = document.getElementById('current-weather');
const forecast = document.getElementById('forecast');

// Define the API key for OpenWeatherMap
const apiKey = '540da406fc27f9b6e16fd51ec5cded3b';

const pastSearches = document.getElementById('pastSearches');


// Add an event listener to the search button
searchButton.addEventListener('click', () => {
  // Get the city name from the input field
  const city = cityInput.value;

  // Check if the city name is empty
  if (city.trim().length === 0) {
    alert('Please enter a city name');
    return;
  }

  // Call the OpenWeatherMap API to get the current weather for the given city
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`)
    .then(response => response.json())
    .then(data => {
      // Update the city name and current weather HTML elements with the API data
      cityName.textContent = data.name;
      currentWeather.innerHTML = `
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}">
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp}&deg;F</p>
        <p>Feels like: ${data.main.feels_like}&deg;F</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind speed: ${data.wind.speed} m/s</p>`;

      // Call the OpenWeatherMap API to get the 5-day forecast for the given city
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`);
    })
    .then(response => response.json())
    .then(data => {
      // Clear the forecast HTML element
      forecast.innerHTML = '';

      // Loop through the forecast data and display the data for every day at 12:00 pm
      for (let i = 0; i < data.list.length; i++) {
        const forecastData = data.list[i];
        const date = new Date(forecastData.dt_txt);
        if (date.getHours() === 12) {
          const forecastElement = document.createElement('div');
          forecastElement.classList.add('forecast-item');
          forecastElement.innerHTML = `
            <p>${date.toLocaleDateString()}</p>
            <img src="https://openweathermap.org/img/wn/${forecastData.weather[0].icon}.png" alt="${forecastData.weather[0].description}">
            <p>${forecastData.weather[0].description}</p>
            <p>Temperature: ${forecastData.main.temp}&deg;F</p>
            <p>Feels like: ${forecastData.main.feels_like}&deg;F</p>
            <p>Humidity: ${forecastData.main.humidity}%</p>
            <p>Wind speed: ${forecastData.wind.speed} m/s</p>`

          forecast.appendChild(forecastElement);
        }
      }
    })
    
    .catch(error => {
      alert('An error occurred while fetching weather data');
      console.error(error);
    });
    if (localStorage["pastSearches"]) {
  pastSearches = JSON.parse(localStorage["pastSearches"]);
  
}
if (pastSearches.indexOf(search) ==-1) {
  pastSearches.unshift(search);
  if (pastSearches.length > 5) {
    pastSearches.pop();
    
  }
  localStorage["pastSearches"] =JSON.stringify(pastSearches);
}

function drawPastSearches() {
  if (pastSearches.length) {
    var html = pastSearchesTemplate({search:pastSearches});
    $("#pastSearches").html(html);
    
  }
  
}

$(document).on("click", ".pastSearchLink" , function(e) {
  e.preventDefault();
  var search = $(this).text();
  dosearch(search);
});
});
