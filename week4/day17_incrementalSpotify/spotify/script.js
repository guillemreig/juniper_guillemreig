(function () {
    // alert("We are connected!");

    // var $searchBtnDiv = $("#buttonDiv");
    var $searchBtn = $("#searchBtn");
    var $moreBtn = $("#moreBtn");

    console.log($moreBtn);

    var $container = $("#results-container");
    var $infoDiv = $("#infoDiv");
    var $info = $("#info");

    var htmlResults = "";
    var moreButton = true;
    var timer;

    $infoDiv.toggle();
    $moreBtn.toggle();

    var request = false;
    var query;
    var type;
    var nextUrl; // = "https://spicedify.herokuapp.com/spotify"; // The default

    $moreBtn.on("click", function (e) {
        searchFun(query, type);
        return;
    });

    $searchBtn.on("click", function (e) {
        clearTimeout(timer);

        query = $("input").val();
        type = $("select").val();
        nextUrl = "https://spicedify.herokuapp.com/spotify"; // Reset nextUrl to default

        if (!query) {
            return;
        } // Don't search if input empty

        $info.text("Searching...");
        $infoDiv.show();

        htmlResults = ""; // New search. Delete the results division content
        $container.html(htmlResults); // Remove old results before loading new ones

        searchFun(query, type);
        return;
    });

    function searchFun(query, type) {
        console.log("Checkpoint 1. New search");

        $info.text("Searching...");

        $.ajax({
            url: nextUrl,
            data: {
                query: query,
                type: type,
            },
            success: function (data) {
                data = data.artists || data.albums; // Assigns .artists or .albums to data variable
                console.log("Checkpoint 2. data:", data);

                // Update info header
                if (data.items.length) {
                    $info.text('Results for "' + query + '"');
                } else {
                    $info.text('No results for "' + query + '"');
                }

                // For each loop
                data.items.forEach(function (item) {
                    // Result division
                    htmlResults += '<div class="resultDiv">';

                    // Image
                    if (item.images[0]) {
                        // Checks if there is at least one image
                        imageUrl = item.images[0].url;
                        htmlResults +=
                            "<a href=" +
                            item.external_urls.spotify +
                            ' target="_blank"><img class="resultImg" src="' +
                            imageUrl +
                            '" alt="' +
                            item.name +
                            ' picture" /></a>';
                    } else {
                        htmlResults +=
                            '<img class="resultImg" src="https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1" alt="no image available" />';
                    }

                    // Text division
                    htmlResults += '<div class="resultTxt">';

                    // Name
                    htmlResults +=
                        "<a href=" +
                        item.external_urls.spotify +
                        ' target="_blank"><h2 class="resultName">' +
                        item.name +
                        "</h2>";

                    // End of divisions
                    htmlResults += "</div></div>";
                });

                //console.log(htmlResults);
                $container.html(htmlResults);

                // Decides whether more button or infinite scroll
                if (location.search.indexOf("scroll=infinite") > -1) {
                    moreButton = false;
                    timer = setTimeout(scrollResults, 500); // Start the check
                } // Checks if it exists

                // Modify an url
                if (data.next) {
                    nextUrl =
                        data.next &&
                        data.next.replace(
                            "https://api.spotify.com/v1/search",
                            "https://spicedify.herokuapp.com/spotify"
                        );
                    console.log("Checkpoint 3. nextUrl :", nextUrl);

                    moreButton && $moreBtn.show();
                } else {
                    $moreBtn.hide();
                }

                request = false;
            },
        });
    }

    $(document).on("click", "#searchBtn, #moreBtn", function (e) {
        console.log("" + e.target + " was clicked!");
    }); // Gives event listener to multiple elements

    // Infinite scroll tools (classnotes)

    $(document).height(); // The height of the document (will grow with more results!)

    $(document).scrollTop(); // How far from top are we (Will increase if we scroll down)

    $(window).height(); // The height of the screen view (Remains the same)

    // Timed check option (recommended)

    function scrollResults() {
        console.log("Scroll check!");
        if (
            request == false &&
            $(document).scrollTop() >
                $(document).height() - $(window).height() * 3
        ) {
            console.log("Checkpoint 4. Scroll search");

            request = true;
            searchFun(query, type);
        }
        timer = setTimeout(scrollResults, 500);
        return;
    }

    // scroll event listener option (not recommended)
    /*
    window.addEventListener("scroll", function () {
            // console.log("$(document).height() :", $(document).height());
        // console.log("$(document).scrollTop() :", $(document).scrollTop());
        // console.log("$(window).height() :", $(window).height());
        console.log("Scroll!");
        if (
            request == false &&
            $(document).scrollTop() >
                $(document).height() - $(window).height() * 3
        ) {
            console.log("Checkpoint 4. Scroll search");

            request = true;
            searchFun(query, type);
        } // Must refine firing condition
    }); // Fires every time the user scrolls
    */
})();
