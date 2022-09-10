var box = document.getElementById("box");

var move = document.getElementById("move");
var shape = document.getElementById("toggle-shape");
var overlayBtn = document.getElementById("overlayBtn");

var overlay = document.getElementById("overlay");

// console.log("box :", box);
// console.log("moveBox :", moveBox);

move.addEventListener("click", function (e) {
    console.log("Move!");
    box.classList.toggle("move-right");
});

shape.addEventListener("click", function (e) {
    console.log("Change shape!");
    box.classList.toggle("circle"); // Gives and removes the class in a single button
});

overlayBtn.addEventListener("click", function (e) {
    overlay.classList.toggle("overlayOn"); // Turns overlay On when button is pushed
});

overlay.addEventListener("click", function (e) {
    overlay.classList.toggle("overlayOn"); // Turns overlay Off when overlay is clicked
});
