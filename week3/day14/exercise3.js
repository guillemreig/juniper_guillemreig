var textarea = document.getElementById("textArea"); // the text area element

var btn = document.getElementById("btn"); // the button element

textarea.value = localStorage.getItem("text");
/*
textarea.addEventListener("keyup", function () {
    localStorage.setItem("text", textarea.value);
}); // This version uploads the text after each character
*/
btn.addEventListener("click", function () {
    textarea.value = "";
    localStorage.removeItem("text");
}); // Used to clean the text area and the local storage

window.addEventListener(
    "beforeunload",
    function () {
        if (textarea.value) {
            localStorage.setItem("text", textarea.value); // Only saves if text area has something in it
        } else {
            localStorage.removeItem("text"); // This cleans your local storage if text area is empty
        }
    },
    false
); // This version only stores the text when the window is closed instead after each character is written
