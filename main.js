// --- Core Elements ---
const audio = document.getElementById("audioPlayer");
const loader = document.getElementById("preloader");
const mybutton = document.getElementById("backtotopbutton");
const mobileTogglemenu = document.getElementById("mobiletogglemenu");
const themeToggle = document.querySelector('#checkbox');

// --- 1. Theme (Dark/Light Mode) Logic ---
function initTheme() {
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme === 'light') {
        document.body.classList.add('light-mode');
        if (themeToggle) themeToggle.checked = true;
        applyInversions(true);
    }
}

function switchTheme(e) {
    const isLight = e.target.checked;
    if (isLight) {
        document.body.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
    applyInversions(isLight);
}

function applyInversions(isLight) {
    document.querySelectorAll(".needtobeinvert").forEach(el => {
        isLight ? el.classList.add("invertapplied") : el.classList.remove("invertapplied");
    });
}

if (themeToggle) {
    themeToggle.addEventListener('change', switchTheme, false);
}

// --- 2. Navigation & UI Controls ---
function settingtoggle() {
    const container = document.getElementById("setting-container");
    if (container) {
        container.classList.toggle("settingactivate");
        document.getElementById("visualmodetogglebuttoncontainer")?.classList.toggle("visualmodeshow");
        document.getElementById("soundtogglebuttoncontainer")?.classList.toggle("soundmodeshow");
    }
}

function playpause() {
    const soundSwitch = document.getElementById("switchforsound");
    if (!audio || !soundSwitch) return;
    
    if (!soundSwitch.checked) {
        audio.pause();
    } else {
        audio.play();
    }
}

function hamburgerMenu() {
    document.body.classList.toggle("stopscrolling");
    mobileTogglemenu?.classList.toggle("show-toggle-menu");
    document.getElementById("burger-bar1")?.classList.toggle("hamburger-animation1");
    document.getElementById("burger-bar2")?.classList.toggle("hamburger-animation2");
    document.getElementById("burger-bar3")?.classList.toggle("hamburger-animation3");
}

function hidemenubyli() {
    document.body.classList.remove("stopscrolling");
    mobileTogglemenu?.classList.remove("show-toggle-menu");
    document.getElementById("burger-bar1")?.classList.remove("hamburger-animation1");
    document.getElementById("burger-bar2")?.classList.remove("hamburger-animation2");
    document.getElementById("burger-bar3")?.classList.remove("hamburger-animation3");
}

// --- 3. Scroll & Active Tabs Logic ---
const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll(".nav-links a");

window.onscroll = function() {
    scrollFunction();
    handleActiveNav();
};

function scrollFunction() {
    if (!mybutton) return;
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        mybutton.style.display = "block";
    } else {
        mybutton.style.display = "none";
    }
}

function scrolltoTopfunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function handleActiveNav() {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute("id");
        }
    });

    navLi.forEach(a => {
        a.classList.remove("active"); // Ensure you have an .active style in CSS if needed
        if (a.getAttribute("href") === `#${current}`) a.classList.add("active");
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

// --- 5. Lifecycle ---
document.addEventListener("DOMContentLoaded", () => {
    initTheme();
});

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
