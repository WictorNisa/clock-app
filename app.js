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
const greeting = document.getElementById("greeting");
const heroImage = document.getElementById("heroContainer");

document.addEventListener("DOMContentLoaded", function () {
  // Hide information div on page load
  document.querySelector(".information-div").classList.add("hidden");
});

const url = "https://api.quotable.io/random";

// Create a timeline
const quoteTimeline = gsap.timeline({ paused: true });

// Add animations to the timeline
quoteTimeline
  .fromTo(quote, { opacity: 0 }, { opacity: 1, duration: 0.8 })
  .fromTo(author, { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.2"); // Use "-=0.2" to start the author animation 0.2 seconds before the quote animation ends

// Function to play the animation
function playQuoteAnimation() {
  quoteTimeline.restart();
}

// Function to reverse the animation
// function reverseQuoteAnimation() {
//   quoteTimeline.reverse();
// }

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
        author.innerText = `- ${quoteData.author}`;
      playQuoteAnimation();
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
      if (hours < 12) {
        greeting.innerText = "morning";
        heroImage.style.backgroundImage =
          "url('img/luca-bravo-ESkw2ayO2As-unsplash.jpg')";
        console.log("morning background");
        heroImage.style.color = "black";
      } else if (hours < 18) {
        greeting.innerText = "afternoon";
        heroImage.style.backgroundImage =
          "url('img/joshua-woroniecki-0289jpHHk0o-unsplash.jpg')";
        console.log("afternoon background");
        heroImage.style.color = "white";
      }

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

getRandomQuote();
getUserLocation();
setInterval(getRandomQuote, 10000);
setInterval(getUserLocation, 60000);

