const url =
  "https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json";

const cards = document.querySelector("#cards");

async function getProphetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response failed with status:{response.status}`);
    }
    const data = await response.json();
    // console.table(data.prophets);
    displayProphets(data.prophets);
  } catch (error) {
    console.error(error);
  }
}

const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    //   Create the HTML elements
    const card = document.createElement("section");
    const fullName = document.createElement("h2");
    const portrait = document.createElement("img");

    //   using a template string to build the full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    //   Build the image element by using setAttribute()
    portrait.setAttribute("src", prophet.imageurl);
    portrait.setAttribute(
      "alt",
      `Portrait of ${prophet.name} ${prophet.lastname}`,
    );
    portrait.setAttribute("loading", "lazy");
    portrait.setAttribute("width", "340");
    portrait.setAttribute("height", "440");

    // prophet birth information
    const birthDate = document.createElement("p");
    const birthPlace = document.createElement("p");

    birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
    birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;

    //    add the heading and image elements using appendChild()
    card.appendChild(fullName);
    card.appendChild(portrait);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);

    //   Add the card to the page
    cards.appendChild(card);
  });
};

// call the function
getProphetData();
