// DOM Events
// When things happen we want to respond in some way. Fortunately, we can by listening for the events that they generate.

document.addEventListener("click", function () {
    console.log("There was a click somewhere on the page!");
}); // Every time you click on the page 'There was a click somewhere on the page!' is logged.

// The addEventListener method does not just exist on the document object. Every element has it.

document.body.addEventListener("click", function () {
    console.log("There was a click on the body element!");
});

document.documentElement.addEventListener("click", function () {
    console.log("There was a click on the html element!");
});

//
//
//
//
//

document.addEventListener("click", function () {
    console.log("document was clicked!");
});

document.documentElement.addEventListener("click", function () {
    console.log("documentElement was clicked!");
});

document.body.addEventListener("click", function () {
    console.log("body was clicked!");
});

var blueDiv = document.getElementsByClassName("blue")[0];
var redDiv = document.getElementsByClassName("red")[0];
var splicedLink = document.getElementsByClassName("spicedLink")[0];

let redClicks = 0;

redDiv.addEventListener("click", function (e) {
    // e.stopPropagation(); //Prevents click to also trigger the blueDiv event
    redClicks++;
    console.log(this.innerHTML);
});

redDiv.addEventListener("click", function (e) {
    e.target.style.border = "5px solid red";
    e.stopPropagation();
});

redDiv.addEventListener("click", increaseCount);

function increaseCount(e) {
    redClicks++;
    if (redClicks > 4) {
        redDiv.removeEventListener("click", increaseCount);
    }
    redDiv.innerHTML = "Count :" + redClicks;
}

redDiv.addEventListener("mousemove", function (e) {
    console.log("mouse moved");
    e.currentTarget.innerHTML = "x: " + e.offsetX + ", y: " + e.offsetY;
    e.currentTarget.innerHTML +=
        "<br />pageX: " + e.pageX + ", pageY: " + e.pageY;

    e.currentTarget.innerHTML +=
        "<br />screenX: " + e.screenX + ", screenY: " + e.screenY;
});

blueDiv.addEventListener("click", function (e) {
    console.log("click on the blueDiv!");
    redDiv.innerHTML = "count: " + redClicks;
    e.currentTarget.style.border = "5px solid blue";
});

splicedLink.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("spiced link clicked!");
});
