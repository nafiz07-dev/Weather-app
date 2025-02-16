// api key: e4cda342a7c4017763d86e3b89bcf8e7
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const weatherIcon = document.querySelector(".weather-icon-img");
const videoSource = document.querySelector(".back-video");
const video = document.querySelector(".back-video-continer");
const inputFrm = document.querySelector(".input");
const input = document.querySelector(".search");
const searchIcon = document.querySelector(".icon");
const restWarper = document.querySelector(".rest-warper");

// value inputs
const cityName = document.querySelector(".city-name");
const temp = document.querySelector(".tempreture-cr");
const statusTxt = document.querySelector(".status-txt");
const windSpeed = document.querySelector(".windSpeed-km");
const humidity = document.querySelector(".humidity-percentage");

const apiKey = "e4cda342a7c4017763d86e3b89bcf8e7";

const loadNewVideo = function (fileLocation) {
  videoSource.setAttribute("src", fileLocation);
  video.load();
};

const getWeather = async function (country) {
  try {
    if (!country) return;
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=e4cda342a7c4017763d86e3b89bcf8e7`
    );
    const data = await res.json();
    if (!res.ok) {
      document.querySelector(".error").style.display = "block";
    } else {
      document.querySelector(".error").style.display = "none";
      cityName.innerHTML = `In ${data.name}`;
      temp.innerHTML = `${Math.round(data.main.temp - 273)} °C`;
      statusTxt.innerHTML = ` Status: ${data.weather[0].main}`;
      humidity.innerHTML = `<i class="fa-solid fa-droplet"></i> ${data.main.humidity}%`;
      windSpeed.innerHTML = `<i class="fa-solid fa-wind"></i> ${data.wind.speed} km/h`;


      if ((data.weather[0].main = "Clouds")) {
        loadNewVideo("/Videos/clouds.mp4");
      }
      if ((data.weather[0].main = "Rain")) {
        loadNewVideo("/Videos/rain.mp4");
      }
    }
  } catch (err) {
    console.log(err);
  }
};

inputFrm.addEventListener("submit", function (e) {
  e.preventDefault();
  getWeather(input.value);
  restWarper.classList.add("display-block");
});
