// The Document Object Model (DOM)
// The DOM is the interface to the content of webpages that browsers provide to Javascript developers.
// By using the DOM we are able to change the content and appearance of webpages after they have loaded.

// The entry point to the DOM is the document object.
// Through it we gain access to the entire tree of HTML elements (nodes).
// For example, document.body is a reference to the <body> element and document.documentElement is a reference to the <html> element (the root node).

// Every node has a parentNode property (which is null in the case of the document object) and a children property (an array-like object containing all of the node's child elements).

// document.getElementById
// Returns the element with the specified id or null if there is no such element

var links = document.getElementById("links"); // Single element
console.log("links :", links);

links.style.backgroundColor = "silver";

// document.getElementsByTagName
// Returns an array-like object containing all of the elements with the specified tag name

var li = document.getElementsByTagName("li"); // Array-like
console.log("li :", li);

li[0].style.color = "lightgreen";

// document.getElementsByClassName
// Returns an array-like object containing all of the elements with the specified class name

var lists = document.getElementsByClassName("lists"); // Array-like
console.log("lists :", lists);

lists[1].style.fontFamily = "sans-serif";

// document.querySelector
// Returns the first element that matches the specified selector or null if there is no such element

var firstLi = document.querySelector("li"); // Single element
console.log("firstLi :", firstLi);

firstLi.style.fontSize = "20px";

// document.querySelectorAll
// Returns an array-like object containing all of the elements that match the specified selector

var colors = document.querySelectorAll("#colors>li"); // Array-like (li elements inside parent with class colors)
// NodeList : Accepts forEach() loops
console.log("colors :", colors);

colors.forEach(function () {
    for (var i = 0; i < colors.length; i++) {
        if (i % 2) {
            colors[i].style.backgroundColor = "red";
        } else {
            colors[i].style.backgroundColor = "yellow";
        }
    }
});

// With the exception of getElementById, all of the methods above also exist on individual nodes.
// Calling them on individual nodes limits the search to the children of that node.

// Changing the appearance of elements
// Every element has a className property which contains the current value of the element's class attribute.
// You can edit this string to add and remove classes to an element, which will update the element's appearance in accordance with linked stylesheets.

console.log("links.className :", links.className); // lists

// A more convenient way to add and remove classes is through the classList property available in current browsers.

links.classList.add("blue");
console.log("links.className :", links.className); // lists blue

// Every element also has a style property which is an object representing the current value of the element's style attribute.
// Changing properties on the element's style object is like adding style rules to the element's style attribute.

// Part 1
(function changeStyle(input) {
    var element = document.querySelectorAll(input);
    element.forEach(function (item) {
        item.style.fontStyle = "italic";
        item.style.fontWeight = "bold";
        item.style.textDecoration = "underline";
    });
})("#links");

// Note that the property names do not have dashes and are camelCase.
// margin-left becomes marginLeft and padding-top becomes paddingTop.

// Changing the content of elements
// Every element has an innerHTML property that contains the entirety of its HTML content as a string.
// You can set this property to alter an element's HTML content.

document.getElementById("test").innerHTML = ""; //the <body> is now empty
document.getElementById("test").innerHTML =
    "<h1>innerHTML is fun</h1><p>I like changing innerHTML</p>";

// document.createElement - Creates the HTML element specified by tagName.
// document.createTextNode - Creates a new Text node.

var newHeader = document.createElement("header");
var headerH1 = document.createElement("h1");
var text = document.createTextNode("Welcome to my page!");

var headerH3 = document.createElement("h3");
var text2 = document.createTextNode(
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Labore, eius?"
);

headerH1.appendChild(text); // 'appendChild' only accepts one
headerH3.appendChild(text2);
newHeader.append(headerH1, headerH3); // 'append' accepts many

document.body.prepend(newHeader);

// Node.appendChild()
// Adds a node to the end of the list of children of a specified parent node.
// If the given child is a reference to an existing node in the document, appendChild() moves it from its current position to the new position.

links.appendChild(li[0]); // links (element), li (array-like), [0] (element in the array).

// Node.insertBefore()
// Inserts a node before a reference node as a child of a specified parent node.
// If the given node already exists in the document, insertBefore() moves it from its current position to the new position.

links.insertBefore(li[1], li[0]); // Moves li[1] before li[0].

// Node.removeChild()
// Removes a child node from the DOM and returns the removed node.

links.removeChild(li[2]); // Removes li[2].

// Node.replaceChild()
// Replaces a child node within the given (parent) node.

var texts = document.getElementById("texts");

texts.replaceChild(li[4], li[7]); // Replaces li[7] with li[4].

// Exercises

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
