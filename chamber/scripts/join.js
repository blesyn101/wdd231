// Import the memberships i created
import {memberships} from '../data/memberships.js'

const mydialog = document.querySelector('#mydialog');
const mytitle = document.querySelector("#mydialog h2");
const myclose = document.querySelector("#mydialog button");
const myinfo = document.querySelector("#mydialog #myinfo");

// close the dialog
myclose.addEventListener("click", () => {
    mydialog.close();
})

// select all membership button
const membershipButton = document.querySelectorAll(".membership-link");

// Function to connect membership data to the buttons
function displayItems(data) {
    data.forEach((membership, index) => {
        membershipButton[index].addEventListener("click", () => {
            showBenefits(membership);
        });
    });
}

// function to display membership details
function showBenefits(membership) {
  mytitle.textContent = membership.name;

  // clear html
  myinfo.innerHTML = "";

  // Create the ul
  const ul = document.createElement("ul");

  // Create and populate the list items
  membership.benefits.forEach((benefit) => {
    const benefitLi = document.createElement("li");
    console.log(benefit);
    benefitLi.textContent = benefit;
    //   append the the li to the ul
    ul.appendChild(benefitLi);
  });

  // create the cost heading
  const costHeading = document.createElement("h4");
  costHeading.textContent = `COST: ${membership.cost}`;

  // Append the elements ul li created and costheadin to myinfo
  myinfo.appendChild(ul);
  myinfo.appendChild(costHeading);

  // Open the dialog
  mydialog.showModal();
}

// call the function
displayItems(memberships);

// Populate the hidden timestamp field when page loads
const timestampField = document.querySelector('#timestamp');
if (timestampField) {
    timestampField.value = new Date().toISOString();
}
