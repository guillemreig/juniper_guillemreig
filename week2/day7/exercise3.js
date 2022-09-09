// Part 3
var colorBox = document.getElementById("colorBox");

colorBox.addEventListener("mousedown", function (e) {
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

colorBox.addEventListener("mouseup", function (e) {
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
