var overlay = document.getElementById("overlay");

var nav = document.getElementById("nav");

var menu = document.getElementById("menu");

var xBtn = document.getElementById("xBtn");

menu.addEventListener("click", function (e) {
    nav.classList.add("navOn");
    overlay.classList.add("overlayOn");
});

xBtn.addEventListener("click", function (e) {
    nav.classList.remove("navOn");
    overlay.classList.remove("overlayOn");
});

overlay.addEventListener("click", function (e) {
    nav.classList.remove("navOn");
    overlay.classList.remove("overlayOn");
});

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 27) {
        nav.classList.remove("navOn");
        overlay.classList.remove("overlayOn");
    }
});

// popUp

setTimeout(function () {
    overlay.classList.add("overlayOn");

    $("body").append(
        '<div id="popUp">\
                <h3 class="popUpText">Welcome to our redesigned site!</h3>\
                <p class="popUpText">\
                    Would like to take a <a href="">tour</a> of our new features?\
                </p>\
                <p class="popUpText">\
                    By the way, this site uses cookies to track every little thing\
                    you do and if you are here we are going to assume you are ok\
                    with that.\
                </p>\
                <h3 id="popUpX">X</h3>\
            </div>'
    );

    var $popUp = $("#popUp"); // The popUp div
    console.log("$popUp :", $popUp);

    var $popUpText = $(".popUpText");
    console.log("$popUpText :", $popUpText);

    var $popUpX = $("#popUpX");
    console.log("$popUpX :", $popUpX);

    $popUp.css({
        backgroundColor: "white",
        position: "absolute",
        width: "440px",
        minWidth: "440px",
        height: "175px",
        top: "185px",
        margin: "0 25vw",
        borderRadius: "10px",
        paddingTop: "10px",
    });

    $popUpText.css({
        margin: "15px 30px",
    });

    $popUpX.css({
        position: "relative",
        float: "right",
        top: "-160px",
        right: "10px",
        fontFamily: "sans-serif",
        color: "grey",
        cursor: "pointer",
    });

    $popUpX[0].addEventListener("click", function (e) {
        overlay.classList.remove("overlayOn");
        $popUp.remove("#popUp");
    });
}, 1000);
