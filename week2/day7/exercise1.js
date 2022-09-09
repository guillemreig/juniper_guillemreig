// Part 1
var cube = document.getElementById("cube");

document.addEventListener("mousemove", function (e) {
    cube.style.left = e.pageX - 50 + "px";
    cube.style.top = e.pageY - 50 + "px";
});
