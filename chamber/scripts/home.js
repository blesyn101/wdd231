// Weather API

// Benin City COordinators
const latitude = 6.358600353089199;
const longitude = 5.592972995340361;

// Open Weather API Key
const apiKey = "14373bde06ef66a3711bdc5a28bb8a70";

// current weathe URL
const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

// I included &units=metric to convert to celsius 

// select weather HTML elements
const currentTemp = document.querySelector(".current-temp");
const weatherDescription = document.querySelector(".weather-description");
const forecastContainer = document.querySelector("#forecast-container");
const myTown = document.querySelector(".my-town");
const weatherIcon = document.querySelector("#weather-icon");

// Get current weather
async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayWeather(data);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

// Display current weather
function displayWeather(data) {
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  const desc = data.weather[0].description;
  
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", desc);
    
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    weatherDescription.textContent = desc;
    myTown.innerHTML = data.name;
}
// call weather function
getWeather();

// forecast URL
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

// Get three day forecast
async function getForecast() {
  try {
    const response = await fetch(forecastURL);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      displayForecast(data);
    }
  } catch (error) {
    console.error(error);
  }
}

// Display three day forecast
function displayForecast(data) {
  forecastContainer.innerHTML = "";

    let daysDisplayed = 0;
    let previousDay = "";

    data.list.forEach((forecast) => {
        const date = new Date(forecast.dt * 1000);
        const day = date.toLocaleDateString("en-US", {
            weekday: "long"
        });

        if (day !== previousDay && daysDisplayed < 3) {
            const forecastCard = document.createElement("div");

            forecastCard.innerHTML = `
                <h4>${day}</h4>
                <p>${forecast.main.temp.toFixed(1)}&deg;C</p>
                <p>${forecast.weather[0].description}</p>
                `;
            
            forecastContainer.appendChild(forecastCard);

            previousDay = day;
            daysDisplayed++;
        }
    })  
  
}
// call forecast function
getForecast();

// Business Spotlights
const spotlightsContainer = document.querySelector("#spotlights-container");

// Get business memebers for spotlights
async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (response.ok) {
      const data = await response.json();
      console.log(data);

      // Select only Gold and silver members
      const qualifiedMembers = data.filter(
        (member) => member.membership === 2 || member.membership === 3,
      );

        // I initialized Random members array
      //   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
      // https://www.freecodecamp.org/news/how-to-loop-through-an-array-in-javascript-js-iterate-tutorial/
      
     const selectedMembers = [];

      // Select 3 members to display
      while (selectedMembers.length < 3 && qualifiedMembers.length > 0) {
        const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);

        // push selected members to display
        selectedMembers.push(qualifiedMembers[randomIndex]);
      }

    //   console.log(selectedMembers);
      displaySpotlights(selectedMembers);
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

// Display spotlight cards
function displaySpotlights(members) {
    spotlightsContainer.innerHTML = "";

    members.forEach((member) => {
    const card = document.createElement("div");
      card.classList.add("spotlight-card");
      
      let membershipLevel = "Member";

      if (member.membership === 2) {
          membershipLevel = "Silver";
      } else if (member.membership === 3) {
          membershipLevel = "Gold";
      }
      
        card.innerHTML = ` 
            <h3 class="card-title">${member.name}</h3>

                <img src="images/${member.image}" alt="${member.name}" width="130" height="110" loading="lazy">

                    <p><span>ADDRESS:</span> ${member.address}</p>
                    <p><span>EMAIL:</span> <a href="mailto:${member.email}">${member.email}</a></p>
                    <p><span>PHONE:</span> ${member.phone}</p>
                    <p><span>WEBSITE:</span> <a href="${member.website}" target="_blank">Visit Website</a></p>
                    <p><span>MEMBERSHIP:</span> ${membershipLevel}</p>
        `;

        spotlightsContainer.appendChild(card);
    });
}
// call spotlight function
getSpotlights();

