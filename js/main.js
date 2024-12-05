var country = "cairo",
  lang = "en";

var location_field = document.querySelector(".location_field");
var findBtn = document.getElementById("findBtn");

findBtn.addEventListener("click", (e) => {
  e.preventDefault();
  country = location_field.value.trim().toLowerCase();
  if (country === "") country = "cairo"; //default
  startAPi(country, lang);
});

location_field.addEventListener("keyup", function () {
  country = location_field.value.trim().toLowerCase();
  if (country === "") country = "cairo"; //default
  startAPi(country, lang);
});

for (var i = 0; i < lang_btns.length; i++) {
  lang_btns[i].addEventListener("click", (e) => {
    lang = e.target.getAttribute("data-lang");
    startAPi(country, lang);
  });
}
var allItems = [];
startAPi(country, lang);
async function startAPi(country, lang) {
  var responseAPI = await fetch(
    ` https://api.weatherapi.com/v1/forecast.json?key=186cb37da6ab4f94848130640231808&q=${country}&days=3&lang=${lang}`
  );
  allItems = await responseAPI.json();
  getData();
}
function getData() {
  displayWeatherCard1(allItems);
  displayWeatherCard2and3(allItems, (index = 1));
  displayWeatherCard2and3(allItems, (index = 2));
  document.querySelector(
    ".site-description"
  ).innerHTML = ` of ( ${allItems.location.name} )`;
}
function displayWeatherCard1(currentWeather) {
  var display = ``;
  display = `
    <div class="weather-card h-100 ">
            <div class="weather-date-info d-flex justify-content-between p-2">
                <span class="weather-day">${
                  formatDate(getCurrentDate()).day
                }</span>
                <span class="weather-date">${
                  formatDate(getCurrentDate()).formattedDate
                }</span>
            </div>
            <div class="weather-card-body p-3">
                <div class="location">Location: ${
                  currentWeather.location.name
                }</div>
                <div class="country">Country: ${
                  currentWeather.location.country
                }</div>
                <div class="region">Region: ${
                  currentWeather.location.region
                }</div>
                <div class="weather-main d-flex align-items-center gap-4">
                    <div class="weather-main-degree">${Math.floor(
                      currentWeather.forecast.forecastday[0].day.maxtemp_c
                    )}<sup>o</sup>C</div>
                    <div class="weather-main-icon">
                        <img src="${
                          currentWeather.forecast.forecastday[0].day.condition
                            .icon
                        }" alt='weather-icon'/>
                    </div>
                </div>
                <div class="weather-desc mb-3">${
                  currentWeather.forecast.forecastday[0].day.condition.text
                }</div>
                <div class="weather-summary d-flex gap-3">
                    <div>
                        <span class="fa-solid fa-umbrella"></span>
                        <span>${
                          currentWeather.forecast.forecastday[0].day
                            .daily_chance_of_rain
                        }%</span>
                    </div>
                    <div>
                        <span class="fa-solid fa-wind"></span>
                        <span>${currentWeather.current.wind_kph}km/h</span>
                    </div>
                    <div>
                        <span class="fa-solid fa-location-crosshairs"></span>
                        <span>${windDirection(
                          currentWeather.current.wind_dir
                        )}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
  document.querySelector(".weather-card-1").innerHTML = display;
}
function displayWeatherCard2and3(currentWeather, index) {
  var cardNum = index + 1;
  var display = ``;
  display += `
    <div class="weather-card h-100 text-center">
            <div class="weather-date-info p-2">
                <span class="weather-day">${
                  formatDate(currentWeather.forecast.forecastday[index].date)
                    .day
                }</span>
            </div>
            <div class="weather-card-body p-3">
                <div class="weather-main-icon mb-4">
                <img src="${
                  currentWeather.forecast.forecastday[index].day.condition.icon
                }" alt='weather-icon'/>
                </div>
                <div class="weather-main-degree">${Math.floor(
                  currentWeather.forecast.forecastday[index].day.avgtemp_c
                )}<sup>o</sup>C</div>
                <div class="weather-degree mb-4">${Math.floor(
                  currentWeather.forecast.forecastday[index].day.maxtemp_c
                )}<sup>o</sup>C</div>
                <div class="weather-desc">${
                  currentWeather.forecast.forecastday[index].day.condition.text
                }</div>
            </div>
        </div> 
        </div>
    `;
  document.querySelector(`.weather-card-${cardNum}`).innerHTML = display;
}
function formatDate(dateString) {
  var dateObj = new Date(dateString);
  var formattedDay = dateObj.toLocaleString("en-US", { weekday: "long" });
  var formattedDate = dateObj.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });

  return {
    day: formattedDay,
    formattedDate: `${formattedDate}`,
  };
}
function getCurrentDate() {
  var currentDate = new Date();
  return currentDate;
}
function windDirection(dir) {
  switch (dir.toUpperCase()) {
    case "N":
      return "North";
    case "NNE":
      return "North-Northeast";
    case "NE":
      return "Northeast";
    case "ENE":
      return "East-Northeast";
    case "E":
      return "East";
    case "ESE":
      return "East-Southeast";
    case "SE":
      return "Southeast";
    case "SSE":
      return "South-Southeast";
    case "S":
      return "South";
    case "SSW":
      return "South-Southwest";
    case "SW":
      return "Southwest";
    case "WSW":
      return "West-Southwest";
    case "W":
      return "West";
    case "WNW":
      return "West-Northwest";
    case "NW":
      return "Northwest";
    case "NNW":
      return "North-Northwest";
    default:
      return "Unknown direction";
  }
}
