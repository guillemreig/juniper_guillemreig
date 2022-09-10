// Part 1
function changeStyle(input) {
    var element = document.querySelectorAll(input);
    element.forEach(function (item) {
        item.style.fontStyle = "italic";
        item.style.fontWeight = "bold";
        item.style.textDecoration = "underline";
    });
}

changeStyle("#links"); // For testing

// Part 2
function classArray(input) {
    var inputList = document.getElementsByClassName(input);
    var outputArray = [];
    for (var i = 0; i < inputList.length; i++) {
        outputArray.push(inputList[i]);
    }
    return outputArray;
}

console.log(classArray("lists")); // For testing

// Part 3
function awesomeFunc() {
    var awesomeH1 = document.createElement("h1");
    var awesomeTxt = document.createTextNode("AWESOME!");

    awesomeH1.appendChild(awesomeTxt);
    document.body.append(awesomeH1);

    awesomeH1.style.zIndex = 2147483647;
    awesomeH1.style.left = "20px";
    awesomeH1.style.top = "100px";
    awesomeH1.style.fontSize = "200px";
} // Is it supposed to look like this?

awesomeFunc(); // For testing
