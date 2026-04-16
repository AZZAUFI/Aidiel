// --- Core Elements ---
const audio = document.getElementById("audioPlayer");
const loader = document.getElementById("preloader");
const mybutton = document.getElementById("backtotopbutton");
const mobileTogglemenu = document.getElementById("mobiletogglemenu");

// --- 1. Theme (Dark/Light Mode) Logic ---
function visualmode() {
    const isLightMode = document.body.classList.toggle("light-mode");
    
    // Invert specific elements if necessary
    document.querySelectorAll(".needtobeinvert").forEach(function(e) {
        e.classList.toggle("invertapplied");
    });

    // Save preference to localStorage
    localStorage.setItem("theme", isLightMode ? "light-mode" : "dark-mode");
}

// Check for saved theme on page load
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light-mode") {
    document.body.classList.add("light-mode");
}

// --- 2. Navigation & UI Controls ---
function settingtoggle() {
    document.getElementById("setting-container").classList.toggle("settingactivate");
    document.getElementById("visualmodetogglebuttoncontainer").classList.toggle("visualmodeshow");
    document.getElementById("soundtogglebuttoncontainer").classList.toggle("soundmodeshow");
}

function playpause() {
    // If switch is NOT checked, pause; else play
    if (!document.getElementById("switchforsound").checked) {
        audio.pause();
    } else {
        audio.play();
    }
}

function hamburgerMenu() {
    document.body.classList.toggle("stopscrolling");
    document.getElementById("mobiletogglemenu").classList.toggle("show-toggle-menu");
    document.getElementById("burger-bar1").classList.toggle("hamburger-animation1");
    document.getElementById("burger-bar2").classList.toggle("hamburger-animation2");
    document.getElementById("burger-bar3").classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
    document.body.classList.remove("stopscrolling");
    document.getElementById("mobiletogglemenu").classList.remove("show-toggle-menu");
    document.getElementById("burger-bar1").classList.remove("hamburger-animation1");
    document.getElementById("burger-bar2").classList.remove("hamburger-animation2");
    document.getElementById("burger-bar3").classList.remove("hamburger-animation3");
}

// --- 3. Scroll & Active Tabs Logic ---
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".navbar .navbar-tabs .navbar-tabs-ul li");
const mobilenavLi = document.querySelectorAll(".mobiletogglemenu .mobile-navbar-tabs-ul li");

window.onscroll = function() {
    scrollFunction();
    handleActiveNav();
};

function scrollFunction() {
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrolltoTopfunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function handleActiveNav() {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    mobilenavLi.forEach(li => {
        li.classList.remove("activeThismobiletab");
        if (li.classList.contains(current)) li.classList.add("activeThismobiletab");
    });

    navLi.forEach(li => {
        li.classList.remove("activeThistab");
        if (li.classList.contains(current)) li.classList.add("activeThistab");
    });
}

// --- 4. Footer Eye Movement Logic ---
const pupilsArr = Array.from(document.getElementsByClassName("footer-pupil"));
const pupilStartPoint = -10, pupilRangeX = 20, pupilRangeY = 15;
let mouseXEndPoint = window.innerWidth, mouseYEndPoint = window.innerHeight;

const mouseMove = e => {
    let fracXValue = e.clientX / mouseXEndPoint;
    let fracYValue = e.clientY / mouseYEndPoint;
    
    let x = pupilStartPoint + (fracXValue * pupilRangeX);
    let y = pupilStartPoint + (fracYValue * pupilRangeY);
    
    pupilsArr.forEach(pupil => {
        pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
};

window.addEventListener("mousemove", mouseMove);
window.addEventListener("resize", () => {
    mouseXEndPoint = window.innerWidth;
    mouseYEndPoint = window.innerHeight;
});

// --- 5. Lifecycle & Security ---
window.addEventListener("load", function() {
    if (loader) loader.style.display = "none";
    const heyMsg = document.querySelector(".hey");
    if (heyMsg) heyMsg.classList.add("popup");
});

// Prevent right-click on images
document.addEventListener("contextmenu", e => {
    if (e.target.nodeName === "IMG") e.preventDefault();
}, false);

console.log("%c Portfolio Compiled | Mohamad Aidiel Azzaufi ", "background: #3498db; color: white; font-weight: 900; padding: 10px;");
