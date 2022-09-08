(function (countries) {
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

    var content; // The text content of the input (string)
    var highlightIndex = -1; // The result currently highlighted. Starts at -1 so that the first element will highlight after an ArrowDown

    // Event listeners on $input
    $input
        .on("input", function () {
            $resultsDiv.show(); // The results list appears
            content = this.value; // We store this.value in a global variable for future checks
            filteredCountries = getFilteredCountries(content); // Gets new array by calling a function with 'content' as argument

            showResults(filteredCountries); // Calls function with new array as argument
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
                    content = this.value;
                    filteredCountries = getFilteredCountries(content);
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

    // Function to get a filtered array
    function getFilteredCountries(content) {
        if (content === "") {
            return []; // Return empty array if input content empty
        }

        return countries // The 'countries' array used as an argument on the IIFE
            .filter(function (country) {
                return (
                    country.toLowerCase().indexOf(content.toLowerCase()) === 0
                ); // If characters written match with first letters of country name, pass the check
            }) // Returns a new array with elements that pass the check
            .slice(0, 4); // Cuts the array to first 4 items
    }

    // Function to show div with results
    function showResults(filteredCountries) {
        var resultHtml = ""; // A variable that stores the HTML code to write inside the results div
        if (filteredCountries.length === 0 && content) {
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
                //content = $input.text();
                //filteredCountries = getFilteredCountries(content);
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
})([
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia and Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei Darussalam",
    "Bulgaria",
    "Burkina Faso",
    "Burundi",
    "Cabo Verde",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Central African Republic",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Costa Rica",
    "Côte D'Ivoire",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Democratic People's Republic of Korea",
    "Democratic Republic of the Congo",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Eswatini",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Kuwait",
    "Kyrgyzstan",
    "Lao People’s Democratic Republic",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "North Macedonia",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Republic of Korea",
    "Republic of Moldova",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "Saint Kitts and Nevis",
    "Saint Lucia",
    "Saint Vincent and the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome and Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Sweden",
    "Switzerland",
    "Syrian Arab Republic",
    "Tajikistan",
    "Thailand",
    "Timor-Leste",
    "Togo",
    "Tonga",
    "Trinidad and Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United Republic of Tanzania",
    "United States of America",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Venezuela",
    "Viet Nam",
    "Yemen",
    "Zambia",
    "Zimbabwe",
]);
