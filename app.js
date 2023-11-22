const quote = document.getElementById("quote");
const author = document.getElementById("author");
const refreshQuote = document.getElementById("refresh");
const time = document.getElementById("time-text");
const timeZone = document.getElementById("time-zone-text");
const userLocation = document.getElementById("location-h2");
const timeLocation = document.getElementById("timezoneLocation");
const dayOfYear = document.getElementById("dayOfYear");
const dayOfWeek = document.getElementById("dayOfWeek");
const weekNumber = document.getElementById("weekNumber");

document.addEventListener("DOMContentLoaded", function () {
  // Hide information div on page load
  document.querySelector(".information-div").classList.add("hidden");
});

const url = "https://api.quotable.io/random";

function getRandomQuote() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((quoteData) => {
      quote.innerText = `" ${quoteData.content} "`;
      author.innerText = quoteData.author;
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
}

function getUserLocation() {
  fetch("http://worldtimeapi.org/api/ip")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then((locationData) => {
      //Parse the datetime string into a date object
      const dataTime = new Date(locationData.datetime);

      //Extract hours and minutes
      const hours = dataTime.getHours();
      const minutes = dataTime.getMinutes();
      //Display hours and minutes

      time.innerText = `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
      timeZone.innerText = locationData.abbreviation;
      userLocation.innerText = `In ${locationData.timezone}`;
      timeLocation.innerText = `${locationData.timezone}`;
      dayOfYear.innerText = `${locationData.day_of_year}`;
      dayOfWeek.innerText = `${locationData.day_of_week}`;
      weekNumber.innerText = `${locationData.week_number}`;
      console.log(locationData);
    })
    .catch((error) => {
      console.error(`Error: ${error.message}`);
    });
}

refreshQuote.addEventListener("click", getRandomQuote);

document.getElementById("toggleButton").addEventListener("click", function () {
  const toggleText = document.getElementById("toggleText");
  const imgDiv = document.querySelector(".img-div");
  const informationDiv = document.querySelector(".information-div");

  // Toggle the visibility of the more/less text
  toggleText.innerText = toggleText.innerText === "More" ? "Less" : "More";

  // Toggle the visibility of the arrows
  imgDiv.classList.toggle("hidden");

  // Toggle the visibility of the information section
  informationDiv.classList.toggle("hidden");
});
// getRandomQuote();
getUserLocation();
