(function () {
    // jQuery objects
    var $input = $("input[name=country]"); // jQuery object of the input element

    var $resultsDiv = $("#results"); // The 'results' div
    $resultsDiv.hide(); // Starts hidden

    var $searchBtn = $("#searchBtn");
    console.log($searchBtn);

    // Global variables
    var filteredCountries; // A 4 length array of matching countries
    var $resultsList; // a jQuery object that contains the divs with the filtered country names
    var length; // The length of the $resultsList
    var timer;

    var highlightIndex = -1; // The result currently highlighted. Starts at -1 so that the first element will highlight after an ArrowDown

    // Event listeners on $input
    $input
        .on("input", function () {
            clearTimeout(timer);
            console.log("clearTimeout(timer) :", timer);
            $resultsDiv.show(); // The results list appears
            var q = this.value; // The text in the input (string) at the moment of the input
            if (!q) {
                $resultsDiv.hide();
                return;
            }

            console.log("Checkpoint 1. q :", q);
            timer = setTimeout(function () {
                console.log("Checkpoint 2. Request made");
                $.ajax({
                    url: "https://spicedworld.herokuapp.com/",
                    method: "GET", // Default is 'GET' (optional)
                    data: {
                        q: q,
                    },
                    success: function (data) {
                        console.log("Checkpoint 3. Data arrives");
                        console.log("data :", data);
                        console.log("$input.val() :", $input.val());
                        console.log("q :", q);
                        console.log("q == $input.val() :", q == $input.val());

                        if ($input.val() === q) {
                            console.log("Checkpoint 4a. data on time");
                            showResults(data); // Calls function with new array as argument
                        } else {
                            console.log("Checkpoint 4b. data was late!");
                            return;
                        }
                    },
                });
            }, 250);
        }) // This runs each time a character is added
        .on("blur", function () {
            $resultsDiv.hide();
        }) // If focus lost, hide list
        .on("focus", function () {
            $resultsDiv.show();
        }) // If focus recovered, show list again
        .on("keydown", function (e) {
            $resultsList = $("#results div");
            length = $resultsList.length;
            switch (e.key) {
                case "ArrowDown":
                    highlightIndex++;
                    break;
                case "ArrowUp":
                    highlightIndex--;
                    break;
                case "Backspace":
                    highlightIndex = -1;
                    break;
                case "Enter":
                    $input.val(
                        filteredCountries[(length + highlightIndex) % length]
                    );
                    q = this.value;
                    filteredCountries = getFilteredCountries(q);
                    showResults(filteredCountries);
                    $resultsDiv.hide();
                    break;
            }
            highlight(highlightIndex);
        }); // This allows navigation through the list with arrow keys and selection with 'enter'

    // Event listener on button

    $searchBtn.on("click", function () {
        console.log(
            "$input.text() :",
            document.querySelector("input[name=country]").value
        );
        console.log("filteredCountries[0] :", filteredCountries[0]);

        alert("You must select a valid country name");
    });

    // Function to get a filtered array (Obsolete)
    /* 
    function getFilteredCountries(q) {
        if (q === "") {
            return []; // Return empty array if input q empty
        }

        return countries // The 'countries' array used as an argument on the IIFE
            .filter(function (country) {
                return country.toLowerCase().indexOf(q.toLowerCase()) === 0; // If characters written match with first letters of country name, pass the check
            }) // Returns a new array with elements that pass the check
            .slice(0, 4); // Cuts the array to first 4 items
    }
    */
    // Function to show div with results
    function showResults(filteredCountries) {
        var resultHtml = ""; // A variable that stores the HTML code to write inside the results div
        if (filteredCountries.length === 0 && q) {
            resultHtml = `<em class="noResults">No results</em>`; // Adds 'No results' if filtered array is empty
        } else {
            filteredCountries.forEach(function (country) {
                resultHtml += `<div class="result">${country}</div>`; // Inserts code fragment to resultHtml,
            });
        }
        $resultsDiv.html(resultHtml); // Inserts html code to results div

        $resultsList = $("#results div"); // Makes a jQuery element of the results

        $resultsList.each(function (i) {
            // The jQuery variant of the .forEach() loop
            $resultsList.eq(i).on("mouseover", function () {
                $resultsList.removeClass("highlight");
                $resultsList.eq(i).addClass("highlight");
                highlightIndex = i;
            });
            $resultsList.eq(i).on("mouseleave", function () {
                $resultsList.eq(i).removeClass("highlight");
            });
            $resultsList.eq(i).on("mousedown", function () {
                $input.val($resultsList.eq(i).text());
                //q = $input.text();
                //filteredCountries = getFilteredCountries(q);
                //showResults(filteredCountries);
            }); // Bandaid
        }); // Adds event listeners to all result divs
    }

    function highlight(highlightIndex) {
        $resultsList.removeClass("highlight"); // Cleans all other highlights
        $resultsList // Highlights selected element
            .eq((length + highlightIndex) % length)
            .addClass("highlight");
    }
})();
