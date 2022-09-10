var overlay = document.getElementById("overlay");

var nav = document.getElementById("nav");

var menu = document.getElementById("menu");

var xBtn = document.getElementById("xBtn");

menu.addEventListener("click", function (e) {
    nav.classList.add("navOn");
    overlay.classList.add("overlayOn");
});

xBtn.addEventListener("click", function (e) {
    nav.classList.remove("navOn");
    overlay.classList.remove("overlayOn");
});

overlay.addEventListener("click", function (e) {
    nav.classList.remove("navOn");
    overlay.classList.remove("overlayOn");
});

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
        nav.classList.remove("navOn");
        overlay.classList.remove("overlayOn");
    }
});
