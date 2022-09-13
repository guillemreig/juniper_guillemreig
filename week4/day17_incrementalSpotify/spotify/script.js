// alert("We are connected!");

// var $searchBtnDiv = $("#buttonDiv");
var $searchBtn = $("#searchBtn");
var $moreBtn = $("#moreBtn");

console.log($moreBtn);

var $results = $("#results-container");
var $infoDiv = $("#infoDiv");
var $info = $("#info");

var htmlResults = "";

$infoDiv.toggle();
$moreBtn.toggle();

var results;
var query;
var type;
var url; // = "https://spicedify.herokuapp.com/spotify";

$moreBtn.on("click", function (e) {
    searchFun(query, type);
});

$searchBtn.on("click", function (e) {
    query = $("input").val();
    type = $("select").val();
    url = "https://spicedify.herokuapp.com/spotify";

    $info.text("Searching...");
    $infoDiv.show();

    htmlResults = ""; // New search. Delete the results division content
    $results.html(htmlResults); // Remove old results before loading new ones

    searchFun(query, type, url);
});

function searchFun(query, type) {
    console.log("Checkpoint 1. New search");
    console.log("url", url);
    $.ajax({
        url: url,
        data: {
            query: query,
            type: type,
        },
        success: function (data) {
            data = data.artists || data.albums; // Assigns .artists or .albums to data variable
            console.log("Checkpoint 2. data:", data);

            // Update info header
            $info.text('Results for "' + query + '"');

            // For each loop
            data.items.forEach(function (item) {
                // Result division
                htmlResults += '<div class="resultDiv">';

                // Image
                if (item.images[0]) {
                    // Checks if there is at least one image
                    imageUrl = item.images[0].url;
                    htmlResults +=
                        '<img class="resultImg" src="' +
                        imageUrl +
                        '" alt="' +
                        item.name +
                        ' picture" />';
                } else {
                    htmlResults +=
                        '<img class="resultImg" src="https://community.spotify.com/t5/image/serverpage/image-id/25294i2836BD1C1A31BDF2/image-size/original?v=mpbl-1&px=-1" alt="no image available" />';
                }

                // Text division
                htmlResults += '<div class="resultTxt">';

                // Name
                htmlResults += '<h2 class="resultName">' + item.name + "</div>";

                // End of divisions
                htmlResults += "</div></div>";
            });

            //console.log(htmlResults);
            $results.html(htmlResults);

            $moreBtn.show();

            // Modify an url
            url =
                data.next &&
                data.next.replace(
                    "https://api.spotify.com/v1/search",
                    "https://spicedify.herokuapp.com/spotify"
                );

            console.log("url :", url);
        },
    });
}
