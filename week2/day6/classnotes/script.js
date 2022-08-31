//var links = document.getElementById("links");
//var tests = document.getElementsByClassName("test"); // You get an array
//var selectLi = document.getElementsByTagName("li");

//var ul = document.querySelector("#links");
//var li = document.querySelectorAll("#links>li");

/*
li.forEach(function (link) {
    link.style.backgroundColor = "green";
});

li[0].style.backgroundColor = "red";

tests.style.backgroundColor = "blue";

console.log("ul :", ul);
console.log("li :", li);

console.log("links :", links);
console.log("tests :", tests);
console.log("selectLi :", selectLi);
*/

var ex = document.querySelectorAll("#exercise>li");

ex.forEach(function () {
    for (var i = 0; i < ex.length; i++) {
        if (i % 2) {
            ex[i].style.backgroundColor = "red";
        } else {
            ex[i].style.backgroundColor = "yellow";
        }
    }
});

// Create elements through JavaScript
var newHeader = document.createElement("header");
var headerH1 = document.createElement("h1");
var text = document.createTextNode("Welcome to my page!");

var headerH3 = document.createElement("h3");
var text2 = document.createTextNode(
    "This was supposed to be some Lorem ipsum but I dont't know how to auto-write it (:"
);

headerH1.appendChild(text); // 'appendChild' only accepts one
headerH3.appendChild(text2);
newHeader.append(headerH1, headerH3); // 'append' accepts many

document.body.prepend(newHeader);

// Exercises
// Part 1
function changeStyle(input) {
    var element = document.querySelectorAll(input);
    element.forEach(function (item) {
        item.style.fontStyle = "italic";
        item.style.fontWeight = "bold";
        item.style.textDecoration = "underline";
    });
}

changeStyle("#links"); // For testing

// Part 2
function classArray(input) {
    var inputList = document.getElementsByClassName(input);
    var outputArray = [];
    for (var i = 0; i < inputList.length; i++) {
        outputArray.push(inputList[i]);
    }
    return outputArray;
}

console.log(classArray("lists")); // For testing

// Part 3
function awesomeFunc() {
    var awesomeH1 = document.createElement("h1");
    var awesomeTxt = document.createTextNode("AWESOME!");

    awesomeH1.appendChild(awesomeTxt);
    document.body.append(awesomeH1);

    awesomeH1.style.zIndex = 2147483647;
    awesomeH1.style.left = "20px";
    awesomeH1.style.top = "100px";
    awesomeH1.style.fontSize = "200px";
} // Is it supposed to look like this?

awesomeFunc(); // For testing
