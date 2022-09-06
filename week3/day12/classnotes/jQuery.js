// Regular way
/*
var h1 = document.querySelector("h1");
console.log("h1 :", h1);

h1.innerText = "Cool things to do";
h1.innerHTML = '<span class="red">Cool Things</span> to Do When I have Time';

// Checkboxes
var boxes = document.querySelectorAll(".task input"); // Array-like of 'input' elements inside 'task' class elements
console.log("boxes :", boxes);

boxes[0].checked = true; // Checks the first one

// Labels
var labels = document.querySelectorAll(".task label"); // Array-like of 'label' elements inside 'task' class elements
console.log("labels :", labels);

for (var i = 0; i < labels.length; i++) {
    var label = labels[i];
    label.style.backgroundColor = "chartreuse";
    label.style.fontFamily = "sans-serif";
} // Applies to all labels
*/
// jQuery way

// do we have jQuery?
console.log("jQuery :", jQuery);
console.log("jQuery version :", jQuery.fn.jquery);

// h1 jQuery element
var $h1 = $("h1");
console.log("$h1 :", $h1);

// .text() returns the inner text
console.log("h1.text() :", $h1.text());

$h1.text("Cool things to do"); // Changes text
$h1.html('<span class="red">Cool Things</span> to Do When I have Time'); // Inserts html code

// Boxes
var $boxes = $(".task input"); // Array-like
console.log("$boxes :", $boxes);

$boxes.eq(0); // The first box but as a jQuery object!

$boxes.eq(0).prop("checked", true); // changes the 'checked' property of the jQuery object

// Change style of 'labels' inside 'task' class elements
$(".task label")
    .css({
        backgroundColor: "chartreuse",
        fontFamily: "serif",
    })
    .css({
        color: "green",
    })
    .addClass("very-important"); // Chaining

// Events

var $boxes = $("input[type=checkbox]"); // Selects 'input' elements of the type 'checkbox'

$boxes.on("change", function (e) {
    console.log("checkbox changed!");

    var target = e.currentTarget; // DOM element
    console.log("target :", target);

    var $target = $(target); // Get a jQuery object wrapped around a DOM element

    $target.parent(); // The parent
    $target.parent().toggleClass("done"); // Toggle class "done" on its parent

    $target.prop("disabled", true); // Disable the checkbox!
});

// myElement.addEventListener("click", function (e) {}); // DOM way
/*
// Exercise tips
// Vanilla
var leftOffset = ticker.offsetLeft;
// jQuery
var leftOffset = $ticker.offset().left;
// Vanilla
firstHeadline.offsetWidth;
// jQuery
$firstHeadline.outerWidth();
*/
