var textarea = document.getElementById("textArea"); // the text area element

var btn = document.getElementById("btn"); // the button element

btn.addEventListener("click", function (e) {
    try {
        JSON.parse(textarea.value); // Tries to read the text as JSON
        alert("This is valid JSON! :D"); // If there is an error this will not run. Otherwise it will run
    } catch (error) {
        alert("This is not valid JSON! :("); // If an error is thrown the code in 'catch' will run
    }
}); // Event listener attached to button
