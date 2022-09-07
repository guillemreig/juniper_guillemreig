(function (countries) {
    var $input = $("input[name=country]"); // Selects inputs with name 'country'.

    var $resultsDiv = $("#results"); // The 'results' div
    $resultsDiv.hide();

    var filteredCountries;
    var $resultsList;
    var length;

    var content;
    var highlightedElement;
    var highlightIndex = -1;

    // Event listeners on input

    $input
        .on("input", function () {
            $resultsDiv.show();
            value = this.value;
            filteredCountries = getFilteredCountries(value); // Calls the function with 'input' contents as argument

            console.log(filteredCountries); // The result array of the function called
            showResults(filteredCountries); // Sends result array as argument
        }) // This gets a filtered array and uses it as an argument
        .on("blur", function () {
            $resultsDiv.hide();
        })
        .on("focus", function () {
            $resultsDiv.show();
        })
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
                    $resultsDiv.hide();
                    break;
            }
            highlight(highlightIndex);
        });

    // Function to get a filtered array

    function getFilteredCountries(value) {
        if (value === "") {
            return []; // Return empty array if field empty
        }

        return countries // The 'countries' array
            .filter(function (country) {
                return country.toLowerCase().indexOf(value.toLowerCase()) === 0; // IndexOf returns index of matching string fragment
            }) // Returns an array with elements that pass the function
            .slice(0, 4); // Cuts the array to first 4 items (index 4 excluded)
    }

    // Function to show div with results

    function showResults(results) {
        var resultHtml = "";
        if (results.length === 0 && value) {
            resultHtml = `<div id="noResults"><em>No results</em></div>`; // Adds 'No results' if filtered array is empty
        } else {
            results.forEach(function (country) {
                resultHtml += `<div class="result">${country}</div>`; // Inserts code fragment to resultHtml
            });
        }
        $resultsDiv.html(resultHtml); // Inserts html code to results div
    }

    function highlight(index) {
        $resultsList.eq((length + index - 1) % length).removeClass("highlight");
        $resultsList.eq((length + index + 1) % length).removeClass("highlight");
        $resultsList.eq((length + index) % length).addClass("highlight");
    }

    //
    //
    //
    //
    //
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
