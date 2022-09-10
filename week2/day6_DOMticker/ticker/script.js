(function () {
    var headlines = document.getElementById("headlines"); // The div
    var links = document.getElementsByTagName("a"); // Array-like with all 'a' elements
    var left = headlines.offsetLeft; // The width of the div

    var reqId; // We will need it for cancelAnimationFrame

    function moveHeadlines() {
        left = left - 2;

        if (left <= -links[0].offsetWidth) {
            left = left + links[0].offsetWidth; //
            headlines.appendChild(document.getElementsByTagName("a")[0]); // Remove the first link and make it the last
        } // This will run when the first link is completely offscreen

        headlines.style.left = left + "px"; // This moves the box
        reqId = requestAnimationFrame(moveHeadlines); // 2. This keeps it going
    }

    moveHeadlines(); // 1. This starts the process

    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener("mouseenter", function (e) {
            cancelAnimationFrame(reqId); // 1. Stop the ticker. We use the 'Id' variable of the animation
            e.target.style.fontWeight = "bold"; // 2. Update the style of the link
            e.target.style.color = "blue";
            e.target.style.textDecoration = "underline";
        });
        links[i].addEventListener("mouseleave", function (e) {
            moveHeadlines(); // 1. Resume the ticker
            e.target.style.fontWeight = "normal"; // 2. Restore the style of the link we just left
            e.target.style.color = "black";
            e.target.style.textDecoration = "none";
        });
    }
})();
