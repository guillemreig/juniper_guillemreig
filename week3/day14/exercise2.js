(function main() {
    var number = document.getElementById("number");

    var german = document.getElementById("german");

    var germanNumArr = [
        "null",
        "eins",
        "zwei",
        "drei",
        "vier",
        "fünf",
        "sechs",
        "sieben",
        "acht",
        "neun",
        "zehn",
    ];

    var num;

    while (num == undefined) {
        german.innerHTML = translateNumberToGerman();
        number.innerHTML = num;
    } // I wish it updated the html so the 'undefined' would be shown

    function translateNumberToGerman() {
        try {
            num = Number(askForNumber());
            return germanNumArr[num];
        } catch (error) {
            console.log("error :", error);
            return "unbekannt"; // it translates 'undefined'!
        }
    }

    function askForNumber() {
        var num = prompt("Please enter a number between 1 and 10");
        if (num >= 1 && num <= 10 && num == parseInt(num)) {
            return num;
        }
        throw "Bad number"; //new Error
    }
})();
