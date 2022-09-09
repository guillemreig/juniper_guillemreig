// Part 4
var outerBox = document.getElementById("outerBox");
var innerBox = document.getElementById("innerBox");

outerBox.addEventListener("click", function (e) {
    var randomColor =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ")";
    e.target.style.backgroundColor = randomColor;
});
