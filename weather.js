// select HTML elements in the document
const currentTemp = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");

(49.767131931132, 6.644636085948731);
const url =
  "https://api.openweathermap.org/data/2.5/14373bde06ef66a3711bdc5a28bb8a70";

async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); 
    } else {
      throw new Error(await response.text());
    }
  } catch (error) {
    console.error(error);
  }
}

apiFetch();