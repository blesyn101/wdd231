const navButton = document.querySelector("#nav-button");
const navLinks = document.querySelector("#nav-bar");


navButton.addEventListener("click", () => {
    const isOpen = navButton.classList.toggle("show");
    navButton.setAttribute("aria-expanded", isOpen);
    
    navLinks.classList.toggle("show")
});
