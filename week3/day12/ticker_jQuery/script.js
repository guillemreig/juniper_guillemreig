(function () {
    var $headlines = $("#headlines"); // The jQuery div (element)
    console.log("$headlines :", $headlines);

    var $links = $("a"); // The jQuery links (Array-like)
    console.log("$links :", $links);

    var left = $headlines.offset().left; // The value of left at the start
    console.log("left :", left);

    console.log($links.length);

    // function
    function moveHeadlines() {
        left = left - 2;

        if (left <= -$links[0].offsetWidth) {
            left = left + $links[0].offsetWidth;
            $headlines.append($links[0]);
            console.log("Append!");
            $links = $("a"); // Updates $links
        }

        $headlines.css({ left: left + "px" });
        reqId = requestAnimationFrame(moveHeadlines); // 2. This keeps it going
    }

    moveHeadlines(); // 1. This starts the process

    for (var i = 0; i < $links.length; i++) {
        $links[i].addEventListener("mouseenter", function (e) {
            cancelAnimationFrame(reqId);
            $(e.target).css({
                fontWeight: "bold",
                color: "blue",
                textDecoration: "underline",
            });
        });
        $links[i].addEventListener("mouseleave", function (e) {
            moveHeadlines();
            $(e.target).css({
                fontWeight: "",
                color: "",
                textDecoration: "",
            });
        });
    }
})();
