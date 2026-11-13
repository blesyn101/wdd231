// Mobile Menu Navigation
const menubutton = document.querySelector("#menu");
const navigation = document.querySelector(".navigation");

menubutton.addEventListener("click", () => {
  navigation.classList.toggle("open");
  menubutton.classList.toggle("open");
});

// Grid and List View
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view")
const membersContainer = document.querySelector("#members-container");

gridButton.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");

    gridButton.setAttribute("aria-pressed", "true");
    listButton.setAttribute("aria-pressed", "false");
})

listButton.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");

    listButton.setAttribute("aria-pressed", "true");
    gridButton.setAttribute("aria-pressed", "false");
})


// Load Business Members
async function getMembers() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Could not load member data")
        }

        const members = await response.json();
        displayMembers(members);
    } catch (error) {
        console.error("Error loading  members:", error);
        membersContainer.textContent =
          "Sorry, business information could not load.";
    }
}


// Display Business Members
function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("div");
      card.classList.add("card");
      
      let membershipLevel = "Member";

      if (member.membership === 2) {
          membershipLevel = "Silver";
      } else if (member.membership === 3) {
          membershipLevel = "Gold";
      }
      
        card.innerHTML = ` 
            <h2 class="card-title">${member.name}</h2>

            <div class="card-body">
                <img src="images/${member.image}" alt="${member.name}" width="130" height="110" loading="lazy">

                <div class="card-content">
                    <p><span>ADDRESS:</span> ${member.address}</p>
                    <p><span>EMAIL:</span> <a href="mailto:${member.email}">${member.email}</a></p>
                    <p><span>PHONE:</span> ${member.phone}</p>
                    <p><span>WEBSITE:</span> <a href="${member.website}" target="_blank" rel="noopener noreferrer">Visit Website</a></p>
                    <p><span>MEMBERSHIP:</span> ${membershipLevel}</p>
                </div>
            </div>    
        `;

    membersContainer.appendChild(card);
  });
}

// getMembers();

// Display current year
const currentYear = document.querySelector("#currentyear");

currentYear.textContent = new Date().getFullYear();

// Display last modified date
const lastModified = document.querySelector("#lastModified");

lastModified.textContent = `Last Modification: ${document.lastModified}`;

