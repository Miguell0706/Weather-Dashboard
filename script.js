const submitBtn = document.querySelector("#submitBtn");
const userInputEl = document.querySelector("#searchBar");
const weatherTemp = document.querySelector("#temp");
const weatherHumidity = document.querySelector("#humidity");
const weatherWind = document.querySelector("#wind");
const weatherUv = document.querySelector("#uv");
const cityName = document.querySelector(".cityName");
const cities = document.querySelector(".listBox");
const forecast = document.querySelector(".forecast");
const image = document.querySelector(".icon");
const clearHistory = document.querySelector("#clearHistory");
const apiKey = "95308369fe23371ad89216cf4f562f3d";
const pastSearches = JSON.parse(localStorage.getItem("cities")) || [];

dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//fetch api weather

function getCityCoordinates(cityName) {
  appendSearches();
  // const cityName = userInputEl.value;
    
  const pastSearches = JSON.parse(localStorage.getItem("cities")) || [];
  if (!pastSearches.includes(cityName)) pastSearches.push(cityName);
  localStorage.setItem("cities", JSON.stringify(pastSearches));
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`
  )
    .then((data) => data.json())
    .then((data) => {
      getWeatherData(data);
    });
}
function getWeatherData(data) {
  var longitude = data.coord.lon;
  var latitude = data.coord.lat;
  var cityName = data.name;

  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&units=imperial&appid=${apiKey}`
  )
    .then((res) => res.json())
    .then((info) => {
      render(cityName, info);
      console.log(info);
    });
}

// render items
function render(a, b) {
  currentWeather(a, b.current, b.timezone);
  fiveDayForecast(b.daily, b.timezone);
}

function currentWeather(a, b, c) {
  var date = dayjs().tz(c).format("M/D/YYYY");

  var temperature = b.temp;
  var humidity = b.humidity;
  var wind = b.wind_speed;
  var uv = b.uvi;
  var icon = `http://openweathermap.org/img/wn/${b.weather[0].icon}.png`;

  image.setAttribute("src", icon);
  cityName.innerHTML = `${a} (${date})`;
  weatherTemp.innerHTML = `Temp: ${temperature} degrees`;
  weatherWind.innerHTML = `Wind: ${wind} MPH`;
  weatherHumidity.innerHTML = `Humidity: ${humidity}%`;
  weatherUv.innerHTML = `UV index: ${uv}`;
}
//render forecast items
function fiveDayForecast(daily, timezone) {
  forecast.innerHTML = "";
  var weekStart = dayjs().tz(timezone).add(1, "day").startOf("day").unix();
  var weekEnd = dayjs().tz(timezone).add(6, "day").startOf("day").unix();

  for (var i = 0; i < daily.length; i++) {
    if (daily[i].dt >= weekStart && daily[i].dt < weekEnd) {
      createCard(daily[i], timezone);
    }
  }
}
//create card that holds the forecast
function createCard(fiveday, timezone) {
  // api data
  var unix = fiveday.dt;
  var wicon = `http://openweathermap.org/img/wn/${fiveday.weather[0].icon}.png`;
  var wtemp = fiveday.temp.day;
  var whumid = fiveday.humidity;
  var wwind = fiveday.wind_speed;

  // card render info
  var div = document.createElement("div");
  var card = document.createElement("div");
  var insideCard = document.createElement("div");
  var title = document.createElement("h4");
  var icon = document.createElement("img");
  var temp = document.createElement("p");
  var wind = document.createElement("p");
  var humidity = document.createElement("p");

  div.append(card);
  card.append(insideCard);
  insideCard.append(title, icon, temp, wind, humidity);

  title.textContent = dayjs.unix(unix).tz(timezone).format("M/D/YYYY");
  icon.setAttribute("src", wicon);
  temp.textContent = `Temp: ${wtemp} degrees`;
  wind.textContent = `Wind: ${wwind} MPH`;
  humidity.textContent = `Humidity: ${whumid}%`;

  forecast.append(div);
}

//Search button event listener
submitBtn.addEventListener("click", function () {
  const newSearch = userInputEl.value;
  getCityCoordinates(newSearch);
  appendSearches();
});

//clear search history
clearHistory.addEventListener("click", function () {
  localStorage.clear();
  appendSearches();
});
// append local history of searches
function appendSearches() { 
  cities.innerHTML = ""
  const pastSearches = JSON.parse(localStorage.getItem("cities")) || [];
  pastSearches.forEach(city => {
    const button = document.createElement('button')
    button.textContent = city
    cities.append(button)
  })
 
}
  //Select cities with history buttons
  cities.addEventListener("click", function(event) {
    if (!event.target.matches('button'))return
    getCityCoordinates(event.target.textContent)
  
  })
appendSearches();
