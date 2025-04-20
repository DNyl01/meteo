function refreshWeather(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  cityElement.innerHTML = capitalizeWords(response.data.city);
}

function searchCity(city) {
  let apiKey = "bd75f0b07t2b8413f599c23a504017fo";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiURL)
    .then(refreshWeather)
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
      alert("City not found. Please try again.");
    });
}

function handleSearchSubmit(event) {
  event.preventDefault();

  let searchInput = document.querySelector("#search-form-input");
  let city = searchInput.value.trim();

  if (city) {
    searchCity(city);
  } else {
    alert("Please enter a city name.");
  }
}

function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);


searchCity("");
