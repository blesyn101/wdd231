import { temples } from '../data/temples.js';
// console.log(temples);

import { url } from "../data/temples.js";
// console.log(url);

// get reference to the division where we display the items
const showHere = document.querySelector("#showHere");
// Get a reference to the dialog element
const mydialog = document.querySelector("#mydialog");
const mytitle = document.querySelector("#mydialog h2");
const myclose = document.querySelector("#mydialog button");
const myinfo = document.querySelector("#mydialog p");
myclose.addEventListener('click', () => mydialog.close())

// Loop through the array of the json item
function displayItems(data) {
    console.log(data)
    data.forEach(x => {
        console.log(x)
        const photo = document.createElement('img')
        photo.src = `${url}${x.path}`
        photo.alt = x.name

        // Add event listener to each division on the page
        photo.addEventListener('click', () => showStuff(x));
        
        showHere.appendChild(photo)
    });
    
}
displayItems(temples)

// Populate the dialog with information when image is clicked
function showStuff(x) {
    mytitle.innerHTML = x.name
    // Populate html
    mytitle.textContent = x.name;

    myinfo.innerHTML = `
        <p>Dedicated ${x.dedicated} by ${x.person} as temple number ${x.number}</p>
    `;


    mydialog.showModal()
}
