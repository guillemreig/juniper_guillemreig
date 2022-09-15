(function () {
    /////////// do not touch ////////////
    Handlebars.templates = Handlebars.templates || {};

    var templates = document.querySelectorAll('script[type="text/x-handlebars-template"]');

    templates.forEach(function (script) {
        Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
    });
    /////////// do not touch ////////////

    // Element identifiers
    var $infoDiv = $("#infoDiv"); // Information div
    var $moreBtn = $("#moreBtn"); // 'More' button
    var $info = $("#info"); // Text in info div
    var $searchBtn = $("#searchBtn"); // 'Search' button
    var $container = $("#results-container"); // Generated html elements go here

    // Hides the info div and the 'more' button if not already hidden
    $infoDiv.hide();
    $moreBtn.hide();

    // Infnite scroll
    var request = false; // Is request in course? Prevents duplicated requests
    var timer; // To stop the automated scroll check so it only runs when needed

    // Handlebars
    var htmlResults = ""; // Starts as an empty string to enable concatenation
    var iDiv = 0; // Keeps track of the current handlebars division index
    var dataArr = []; // Stores the data from previous queries

    // Query variables. Stored to prevent weird behavior if 'more' button is pressed after writing something else in search text area
    var query; // Keeps track of the last query for the 'more' button or infinite scroll searches
    var type;
    var nextUrl; // = "https://spicedify.herokuapp.com/spotify"; // Keeps track of what should be the next url

    // Event listeners
    $moreBtn.on("click", function (e) {
        searchFun(query, type);
        return;
    }); // The 'more' button just does another search with the updated url

    $searchBtn.on("click", function (e) {
        if (!$("input").val()) {
            return; // Don't do anything if input empty
        } else if (request) {
            return; // Don't do anything if request si already taking place
        }
        clearTimeout(timer); // Stops automated checks

        // 1st. Reset query options to make a new search
        query = $("input").val();
        type = $("select").val();
        nextUrl = "https://spicedify.herokuapp.com/spotify";

        htmlResults = ""; // New search. Delete the results division content
        $container.html(htmlResults); // Remove old results before loading new ones

        dataArr = []; // Resets the array containing previous data (if any)
        iDiv = 0; // Resets the handlebars current div index to 0

        searchFun(query, type); // Calls function that contains the ajax request and what to do with the data afterwards
        return;
    });

    function searchFun(query, type) {
        console.log("Checkpoint 1. New search");
        console.log("nextUrl", nextUrl); // For debugging

        request = true; // A request is taking place

        $info.text("Searching..."); // The info div and text will show that a search is taking place
        $infoDiv.show();

        $.ajax({
            url: nextUrl,
            data: {
                query: query,
                type: type,
            },
            success: function (data) {
                data = data.artists || data.albums; // Assigns .artists or .albums to data variable, as it's the only part of interest to us
                console.log("Checkpoint 2. data :", data);

                // Data to handlebars
                htmlResults += `<div class="results-info${iDiv}"></div>`; // Creates a handlebars div to fill for each data set inside the 'container' div
                $container.html(htmlResults);

                dataArr.push(data); // Stores the current data in an array

                for (var i = 0; i < dataArr.length; i++) {
                    $(`.results-info${i}`).html(Handlebars.templates.contentId(dataArr[i]));
                } // Fills each handlebars div with each data set

                iDiv++; // The current handlebars div index gets updated

                // Update info header
                if (data.items.length) {
                    $info.text('Results for "' + query + '"');
                } else {
                    $info.text('No results for "' + query + '"');
                }
                /*
                // Concatenation method (obsolete)
                data.items.forEach(function (item) {
                    // Result division
                    htmlResults += '<div class="resultDiv">';

                    // Image
                    if (item.images[0]) {
                        // Checks if there is at least one image
                        imageUrl = item.images[0].url;
                        htmlResults += "<a href=" + item.external_urls.spotify + ' target="_blank"><img class="resultImg" src="' + imageUrl + '" alt="' + item.name + ' picture" /></a>';
                    } else {
                        htmlResults += '<img class="resultImg" src="https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1" alt="no image available" />';
                    }

                    // Text division
                    htmlResults += '<div class="resultTxt">';

                    // Name
                    htmlResults += "<a href=" + item.external_urls.spotify + ' target="_blank"><h2 class="resultName">' + item.name + "</h2></a>";

                    // End of divisions
                    htmlResults += "</div></div>";
                });

                //console.log(htmlResults);
                $container.html(htmlResults);
                */

                // Update nextUrl if next url exists and
                if (data.next) {
                    nextUrl = data.next && data.next.replace("https://api.spotify.com/v1/search", "https://spicedify.herokuapp.com/spotify"); // We need to fix the next url to use the spiced version
                    console.log("Checkpoint 3. nextUrl :", nextUrl);

                    // Checks if 'infinite scroll' is active
                    if (location.search.indexOf("scroll=infinite") > -1) {
                        console.log("Checkpoint 4. setTimeout");
                        timer = setTimeout(scrollResults, 1000); // Starts the 'infinite scroll' check chain
                    } else {
                        $moreBtn.show(); // Shows the 'more' button
                    }
                } else {
                    $moreBtn.hide(); // If no next url, hide 'more' button
                    clearTimeout(timer); // Stops automated checks
                }
                request = false; // The request has finished
            },
        });
    }

    // setTimeout infinite scroll check option (recommended)
    function scrollResults() {
        console.log("Scroll check!");
        if (request == false && $(document).scrollTop() > $(document).height() - $(window).height() * 3) {
            console.log("Checkpoint 4. Scroll search");

            searchFun(query, type);
        }
        timer = setTimeout(scrollResults, 1000);
        return;
    }
})();
// End of spotify search code

// Classnotes

$(document).on("click", "#searchBtn, #moreBtn", function (e) {
    console.log("" + e.target + " was clicked!");
}); // Gives event listener to multiple elements

// Infinite scroll tools (classnotes)

$(document).height(); // The height of the document (will grow with more results!)

$(document).scrollTop(); // How far from top are we (Will increase if we scroll down)

$(window).height(); // The height of the screen view (Remains the same)

// Infinite scroll event listener option (not recommended)
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
