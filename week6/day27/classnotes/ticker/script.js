(function () {
    var $headlines = $("#headlines"); // The jQuery div (element)

    var $links;
    var left;

    // Headlines content
    var htmlResults = "";

    $.ajax({
        url: "./headlines.json",
        method: "GET",
        success: function (data) {
            console.log("data :", data);
            console.log("data[0] :", data[0]);
            console.log("data[0].text :", data[0].text);

            data.forEach(function (item) {
                htmlResults += `<a href=${item.url}>${item.text}<b>${item.name}</b></a>`;
            });

            $headlines.html(htmlResults);

            $links = $("a"); // The jQuery links (Array-like)red
            console.log("$links :", $links);

            left = $headlines.offset().left; // The value of left at the start
            console.log("left :", left);

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

            setTimeout(moveHeadlines(), 100); // 1. This starts the process
        },
    });

    // function
    function moveHeadlines() {
        left = left - 2;

        if (left <= -$links[0].offsetWidth) {
            left = left + $links[0].offsetWidth;
            $headlines.append($links[0]);
            $links = $("a"); // Updates $links
        }

        $headlines.css({ left: left + "px" });
        reqId = requestAnimationFrame(moveHeadlines); // 2. This keeps it going
    }
})();
