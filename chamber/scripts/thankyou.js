// Get the information from the url
const myInfo = new URLSearchParams(window.location.search);

// display the subitted infomwwwwtion
document.querySelector("#first").textContent = myInfo.get("first");
document.querySelector("#last").textContent = myInfo.get("last");
document.querySelector("#email").textContent = myInfo.get("email");
document.querySelector("#phone").textContent = myInfo.get("phone");
document.querySelector("#organization").textContent = myInfo.get("organization");

// Get and display timestamp
time = document.querySelector("#timestamp");
const submittedTime = myInfo.get("timestamp");

if (submittedTime) {
    time.textContent = new Date(submittedTime).toLocaleString();
    
}