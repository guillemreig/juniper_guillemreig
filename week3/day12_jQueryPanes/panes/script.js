// First get the elements involved

var divider = document.querySelector(".divider"); // Single element
console.log("divider :", divider);

var container = document.querySelector(".container");
console.log("container :", container);

var leftPane = document.querySelector(".leftPane");
console.log("leftPane :", leftPane);

// Add the events
// The 'mousedown' event when the divider is grabbed
divider.addEventListener("mousedown", function (e) {
    //console.log("mousedown!");
    e.stopPropagation();

    function move(e) {
        //console.log("e.target :", e.target);
        //console.log("e.currentTarget :", e.currentTarget);
        if (e.target === e.currentTarget) {
            console.log("e.offsetX :", e.offsetX);
            divider.style.left = leftPane.style.width = e.offsetX + "px"; // The move coordinates are inserted in the elements style
        }
    } // 'move' function

    container.addEventListener("mousemove", move); // The 'mousemove' event when the mouse moves

    document.addEventListener("mouseup", function (e) {
        container.removeEventListener("mousemove", move); // This removes the 'mousemove' event listener
    }); // 'mouseup' triggers the function
});
