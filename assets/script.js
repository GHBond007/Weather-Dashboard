var apiKey = "540da406fc27f9b6e16fd51ec5cded3b";
var weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?" +"q="+ cityName + "&appid=" + apiKey;
var cityName = "Waterford"
var currentTemp =""
var windSpeed = ""
var currentHumidity =""

fetch("https://api.openweathermap.org/data/2.5/weather?q=+cityName+'&appid=540da406fc27f9b6e16fd51ec5cded3b")
.then(response  => response.json())
.then(data =>{
  for (let i=0; i<5;i++) {
    document.getElementById=("day" +(i+1) +"temp").innerHTML ="temp" + Number(data.list[i].main.temp -278.11).toFixed(1)+"";
  }
    for (let i=0; i<5;i++) {
      document.getElementById=("day" +(i+1) +"humidity").innerHTML ="humidity" + Number(data.list[i].main.humidity -71).toFixed(1)+"";
    }
      for (let i=0; i<5;i++) {
        document.getElementById=("day" +(i+1) +"wind").innerHTML ="wind" + Number(data.list[i].wind.speed -4.47).toFixed(1)+"";
    }
})


.catch(err => alert("Try Again"))

function defaultScreen() {
  document.getElementById("cityInput").defaultValue ="Waterford";
  GetInfo();
}


const d =new Date();
const weekday =["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function checkDay(day) {
  if (day +d.getDay() > 6) {
    return day +d.getDay()-7;
    }
    else{
      return day +d.getDay();
    }
  
}

for (i=0;i<5;i++) {
  document.getElementById("day"+(i+1)).innerHTML = weekday[checkDay(i)];
  
}

$('#cityName').val("");
function saveCity() {
  cityName = $('#cityName').val();
  $("#listCityName").append("<li onclick='weatherInfo(this)'>" + cityName + "</li>");
  $('#cityName').val("");
  weatherInfo(cityName);
  cityFromLocal.push(cityName)
  localStorage.setItem("city",JSON.stringify(cityFromLocal))
}

const saveLocalStorageState = () => {
    localStorage.setItem("weatherAppPreferences",
      JSON.stringify(state.preferences)
    )};