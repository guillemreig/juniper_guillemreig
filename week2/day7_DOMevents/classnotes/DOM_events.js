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

// The event is handled first by the listener attached to the body element, then by the one attached to the html element, and finally by the document object.
// This is called event bubbling.
// Events bubble up the DOM tree from the element they first happen on all the way to the document object.

// The first argument passed to addEventListener is the event to listen for.
// The second argument is a function to serve as the listener or event handler.
// addEventListener also accepts a third parameter, a boolean indicating whether or not to use event capturing. Event capturing is like event bubbling but in reverse.

document.body.addEventListener(
    "click",
    function () {
        console.log("A click was captured on the body element!");
    },
    true
);

document.documentElement.addEventListener(
    "click",
    function () {
        console.log("A click was captured on the html element!");
    },
    true
);

document.addEventListener(
    "click",
    function () {
        console.log("A click was captured on the document!");
    },
    true
);

// If you paste the above code into your console you will see that the events that use capturing happen in reverse order and that they all occur before any of the events that bubble.

// Event objects

// The event handlers that are passed to addEventListener are passed an event object when they are called.
// This object contains useful information about the event as well as some methods for changing how the event will be handled.
// For example, if you would like to prevent the event from being forwarded to the next element in the DOM tree, you can call stopPropagation.

document.body.addEventListener("click", function (e) {
    e.stopPropagation(); //This event will not be handled by click handlers attached to document or document.documentElement
    e.stopImmediatePropagation();
});

// There is also stopImmediatePropagation which does the same thing but additionally prevents the event from being handled by other handlers attached to the same element.

// Some events have default actions associated with them.
// For example, the default action associated with clicks on <a> elements is to navigate to the url contained in their href attributes.
// Event handlers run before default actions and can prevent the default actions by calling preventDefault.

document.querySelector("a").addEventListener("click", function (e) {
    if (!confirm("Are you sure you want to go to the next step?")) {
        e.preventDefault(); //navigation will not occur
    }
});

// Removing event handlers

document.addEventListener("keydown", function backspace(e) {
    if (e.keyCode === 8) {
        document.removeEventListener("keydown", backspace);
        console.log("Backspace pushed!");
    }
});

// Other interesting properties of event objects include:

// target - the element that the event actually occurred on

// currentTarget - the element that the event handler is attached to. This element is also what this refers to within an event handler

// relatedTarget - an element other than the target involved in the event. For example, in a mouseout event, the relatedTarget is the element the mouse went to.

// pageX and pageY - the x and y coordinates of the spot on the page where a mouse event occurred

// clientX and clientY - the x and y coordinates of the spot in the viewport where a mouse event occurred

// screenX and screenY - the x and y coordinates of the spot on the screen where a mouse event occurred

// offsetX and offsetY - the x and y coordinates of the spot in the target node where a mouse event occurred

// button - a number indicating which button was pressed during a mouse event

// touches - a list of objects representing touches in touch events

// changedTouches - a list of objects representing touches that have changed since the last touch event

// keyCode - a number representing the key that was involved in a keyboard event

// Event types
// There is a huge number of events that can be handled. Below is a list of a few that are of particular interest to us at this time.

// click - a click has occurred

// dblclick - a double click has occurred

// DOMContentLoaded - the markup for the page has finished loading

// error - a resource (such as an image) has failed to load

// focus - focus has been received (e.g., when a user tabs over to an input field)

// blur - focus has been lost (e.g., when a user tabs out of an input field)

// hashchange - there was a change to the portion of the url that appears after the #

// input - a visible character has been entered into an input field

// keydown - a key on the keyboard has been pressed down

// keyup - a key that has been pressed down is released

// load - the page or an image has loaded

// mousedown - a mouse button is pressed down

// mouseup - a mouse button is released

// mouseenter - the mouse pointer has moved onto an element. This event is usually better to use than mouseover because it does not bubble

// mouseleave - the mouse pointer has moved off of an element. This event is usually better to use than mouseout because it does not bubble

// mousemove - the mouse pointer has moved on an element

// orientationchange - the device orientation has changed

// readystatechange - the readyState of an XMLHttpRequest has changed

// resize - the window size has changed

// submit - a <form> is about to be submitted

// touchstart - a touch on a touchscreen has begun

// touchmove - a touch on a touchscreen has moved

// touchend - a touch on a touchscreen has ended

// touchcancel - a touch on a touchscreen has been interrupted

// transitionend - a CSS transition has ended

// unload - the page is about to be unloaded (the user is navigating elsewhere or closing the tab)

// Classnotes

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
