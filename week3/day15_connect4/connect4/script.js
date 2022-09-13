// Board

// Buttons

var startBtn = document.getElementById("startBtn"); // Quick start button
var selectBtn = document.getElementById("selectBtn"); // New Game button
var vsBtn = document.getElementById("vsBtn"); // 1 vs 1 button
var aiBtn = document.getElementById("aiBtn"); // 1 vs AI button
var readyBtn = document.getElementById("readyBtn"); // Go! button
var rematchBtn = document.getElementById("rematchBtn"); // Rematch! button

// Selection coin

var selectCoin = document.getElementById("selectCoin"); // The flashing coin used in column selection

// Selection area

var selectDiv = document.getElementById("selectDiv");
console.log("selectDiv :", selectDiv);

// Variables
/*
var columns = 7; // For future procedural boards
var rows = 6;
var winLine = 4;
*/

var icol = 3; // Keeps track of current selected column

var player = "Yellow"; // Keeps track of current player. Starting player "Yellow"
selectCoin.classList.add("Yellow"); // The selecting coin starts being yellow

var idiv; // The index of the menu division currently displayed
var ibtn = 1; // The index of the button currently selected

var score1 = 0;
var score2 = 0;

var $score1 = $("#score1");
console.log("$score1", $score1);

var $score2 = $("#score2");
console.log("$score2", $score2);
/*
// The future game intro sequence screen
timer = setTimeout(function intro(){}, 1000)
clearTimeout(timer);
*/

var timer1;
var timer2;
var timer3;

var pressStart = document.getElementById("pressStart");
var screenDiv = document.getElementById("screenDiv");

pressStart.addEventListener("click", cutscene);
document.addEventListener("keydown", press);

function press(e) {
    if (e.keyCode === 32 || e.key === "Enter") {
        document.removeEventListener("keydown", press);
        cutscene();
    }
    return;
}

function cutscene() {
    sfxSelect();
    pressStart.removeEventListener("click", intro);
    pressStart.style.visibility = "hidden";
    musicMenu();

    setTimeout(function () {
        screenDiv.style.backgroundColor = "rgba(20, 20, 20, 0)";
        intro();
    }, 500);

    setTimeout(function () {
        screenDiv.style.visibility = "hidden";
    }, 1500);
}

function intro() {
    $("#startDiv").css({
        height: "100px",
        visibility: "visible",
    });
    $("#copyDiv").css({
        visibility: "visible",
    });
    timer1 = setTimeout(coinRain1, 2300);
    timer2 = setTimeout(coinRain2, 5800);
    timer3 = setTimeout(coinRain3, 7300);
    document.addEventListener("transitionend", rainReset); // Resets Coins

    document.addEventListener("keydown", menu);

    idiv = 0; // Currently at menu index 0
    ibtn = 1;
    menu(0);
}

// Navigation through keyboard

function menu(e) {
    var $btnDiv = $(".btnDiv"); // All menu screens
    var $currMenu = $btnDiv.eq(idiv).children(); // Current menu screen
    var menuLength = $currMenu.length; // Current menu length
    var $currBtn = $currMenu.eq(ibtn); // The current button 'p' element

    console.log("$currBtn :", $currBtn);
    $currBtn.children().addClass("btnSelect"); // Highlights default button
    console.log($currBtn.children());

    if (e.key === "ArrowDown") {
        $currBtn.children().removeClass("btnSelect");
        ibtn--;
        if (ibtn < 1) {
            ibtn = menuLength - 1;
        }
        $currBtn = $currMenu.eq(ibtn);
        $currBtn.children().addClass("btnSelect");
    } else if (e.key === "ArrowUp") {
        $currBtn.children().removeClass("btnSelect");
        ibtn++;
        if (ibtn > menuLength - 1) {
            ibtn = 1;
        }
        $currBtn = $currMenu.eq(ibtn);
        $currBtn.children().addClass("btnSelect");
    } else if (e.keyCode === 32 || e.key === "Enter") {
        if (idiv === 0 && ibtn === 1) {
            idiv = 3;
            start();
        } else if (idiv === 0 && ibtn === 2) {
            idiv = 1;
            select();
        } else if (idiv === 1 && ibtn === 1) {
            idiv = 2;
            vs1();
        } else if (idiv === 1 && ibtn === 2) {
            alert("AI not yet implemented!");
        } else if (idiv === 2 && ibtn === 1) {
            idiv = 3;
            ready();
        } else if (idiv === 4 && ibtn === 1) {
            idiv = 3;
            rematch();
        }
        ibtn = 1;
    }
    console.log("idiv :", idiv);
    console.log("ibtn :", ibtn);
}

function keyFunc(e) {
    if (e.key === "ArrowLeft") {
        // Left arrow
        icol--;
        if (icol < 0) {
            icol = 6;
        }
        selectCoin.style.gridArea = "1 / " + (icol + 1);
    } else if (e.key === "ArrowRight") {
        // Right arrow
        icol++;
        if (icol >= 7) {
            icol = 0;
        }
        selectCoin.style.gridArea = "1 / " + (icol + 1);
    } else if (e.keyCode === 32 || e.key === "Enter") {
        // Space or Enter
        console.log("Checkpoint 1: keyFunc");
        dropCoin(icol);
    }
    return;
}

// Navigation through mouse

startBtn.addEventListener("click", start);

function start() {
    sfxSelect();
    console.log("Checkpoint 0. Start");
    $("#startDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#copyDiv").css({
        visibility: "hidden",
    });
    $(".rainDiv").css({
        visibility: "hidden",
    });
    document.removeEventListener("transitionend", rainReset);
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
    music1.pause();
    musicBoard();
    $("#infoDiv").css({
        height: "100px",
        visibility: "visible",
    });
    idiv = 3;

    document.removeEventListener("keydown", menu);

    win = false;
    newGame(player);
}

startBtn.addEventListener("mouseenter", function (e) {
    console.log("start mousenter!");
    ibtn = 1;
    $("button").removeClass("btnSelect");
    e.target.classList.add("btnSelect");
});

selectBtn.addEventListener("click", select);

function select() {
    sfxSelect();
    $("#startDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#copyDiv").css({
        visibility: "hidden",
    });
    $("#gameDiv").css({
        height: "100px",
        visibility: "visible",
    });
    ibtn = 1;
    idiv = 1;
    menu(0);
    return;
}

selectBtn.addEventListener("mouseenter", function (e) {
    ibtn = 2;
    $("button").removeClass("btnSelect");
    e.target.classList.add("btnSelect");
});

vsBtn.addEventListener("click", vs1);

function vs1() {
    sfxSelect();
    $("#gameDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#readyDiv").css({
        height: "100px",
        visibility: "visible",
    });
    ibtn = 1;
    idiv = 2;
    menu(0);

    return;
}

vsBtn.addEventListener("mouseenter", function (e) {
    ibtn = 1;
    $("button").removeClass("btnSelect");
    e.target.classList.add("btnSelect");
});

aiBtn.addEventListener("click", function () {
    alert("AI not yet implemented!");
    return;
});

aiBtn.addEventListener("mouseenter", function (e) {
    ibtn = 2;
    $("button").removeClass("btnSelect");
    e.target.classList.add("btnSelect");
});

readyBtn.addEventListener("click", ready);

function ready() {
    sfxSelect();
    $("#readyDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $(".rainDiv").css({
        visibility: "hidden",
    });
    document.removeEventListener("transitionend", rainReset);
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
    music1.pause();
    musicBoard();
    $("#infoDiv").css({
        height: "100px",
        visibility: "visible",
    });
    idiv = 3;
    document.removeEventListener("keydown", menu);
    newGame(player);
    return;
}

readyBtn.addEventListener("mouseenter", function (e) {
    ibtn = 1;
    $("button").removeClass("btnSelect");
    e.target.classList.add("btnSelect");
});

rematchBtn.addEventListener("click", rematch);

function rematch() {
    sfxSelect();
    console.log("Checkpoint 5. Restart");
    $("#winDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $(".rainDiv").css({
        visibility: "hidden",
    });
    document.removeEventListener("transitionend", rainReset);
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(timer3);
    music3.pause();
    music3.currentTime = 1;
    musicBoard();
    $("#infoDiv").css({
        height: "100px",
        visibility: "visible",
    });
    $("#selectDiv").css({
        visibility: "visible",
    });

    $(".slot").removeClass("Yellow Red flagged");
    document.removeEventListener("keydown", menu);
    idiv = 3;
    switchPlayer();
    win = false;
    newGame(player);
}

rematchBtn.addEventListener("mouseenter", function (e) {
    ibtn = 1;
    $("button").removeClass("btnSelect");
    e.target.classList.add("btnSelect");
});

// Move selection coin using mouse
selectDiv.addEventListener("mousemove", mouseSelect);

function mouseSelect(e) {
    console.log("mouse move!");
    if (e.target === e.currentTarget) {
        if (e.offsetX < 100) {
            icol = 0;
            selectCoin.style.gridArea = "1 / " + (icol + 1);
        } else if (e.offsetX < 200) {
            icol = 1;
            selectCoin.style.gridArea = "1 / " + (icol + 1);
        } else if (e.offsetX < 300) {
            icol = 2;
            selectCoin.style.gridArea = "1 / " + (icol + 1);
        } else if (e.offsetX < 400) {
            icol = 3;
            selectCoin.style.gridArea = "1 / " + (icol + 1);
        } else if (e.offsetX < 500) {
            icol = 4;
            selectCoin.style.gridArea = "1 / " + (icol + 1);
        } else if (e.offsetX < 600) {
            icol = 5;
            selectCoin.style.gridArea = "1 / " + (icol + 1);
        } else if (e.offsetX < 700) {
            icol = 6;
            selectCoin.style.gridArea = "1 / " + (icol + 1);
        }
    }
}

// Drop coin using mouse

function clickDrop() {
    dropCoin(icol);
}

// Gameplay functions

function switchPlayer() {
    switch (player) {
        case "Yellow":
            selectCoin.classList.remove("Yellow");
            player = "Red";
            selectCoin.classList.add("Red");
            break;
        case "Red":
            selectCoin.classList.remove("Red");
            player = "Yellow";
            selectCoin.classList.add("Yellow");
            break;
    }
    $("#infoTxt").html(player + "'s turn");
}

function newGame(player) {
    selectCoin.style.visibility = "visible";
    document.addEventListener("keydown", keyFunc);
    selectDiv.addEventListener("mousemove", mouseSelect);
    selectCoin.addEventListener("click", clickDrop);
    $("#selectDiv").css({
        visibility: "visible",
    });
    $("#board").css({
        visibility: "visible",
    });
    return;
}

function dropCoin(icol) {
    document.removeEventListener("keydown", keyFunc); // Disables keydown
    selectDiv.removeEventListener("mousemove", mouseSelect);
    selectCoin.removeEventListener("click", clickDrop);

    var irow; // Keeps track of current row / last coin row
    var $col = $(".col" + icol); // Makes a jQuery list of the slots in the current column

    for (irow = 0; irow < $col.length; irow++) {
        if (
            !$col.eq(irow).hasClass("Yellow") &&
            !$col.eq(irow).hasClass("Red")
        ) {
            console.log("Checkpoint 2: dropCoin");
            moveCoin(icol, irow);

            return;
        }
    }
    $("#infoTxt").html("Column is full!");
    document.addEventListener("keydown", keyFunc); // Enables keydown
    selectDiv.addEventListener("mousemove", mouseSelect);
    selectCoin.addEventListener("click", clickDrop);
    return;
}

function moveCoin(icol, irow) {
    console.log("Checkpoint 3: moveCoin");

    sfxFall();
    var $col = $(".col" + icol);
    var h = $col.length - irow; // The height of the drop

    selectCoin.style.animation = "none";
    selectCoin.style.transition = "all " + h * 100 + "ms linear"; // Adapts fall time to height
    selectCoin.style.transform = "translateY(" + h * 100 + "px)"; // The distance to move
    setTimeout(function () {
        sfx2.pause();
        sfx2.currentTime = 0;
        sfx3.pause();
        sfx3.currentTime = 0;
    }, h * 99);

    document.addEventListener("transitionend", function refresh(e) {
        console.log("Checkpoint 4: transitionend");

        sfxCoin();
        document.removeEventListener("transitionend", refresh); // Only triggers once

        $col.eq(irow).addClass(player);
        selectCoin.style.animation = "1s infinite select";
        selectCoin.style.transition = "";
        selectCoin.style.transform = "translateY(0px)";

        if (checkForWin(icol, irow)) {
            // After coin successfully set, check for win
            victoryDance(player);
        } else {
            document.addEventListener("keydown", keyFunc);
            selectDiv.addEventListener("mousemove", mouseSelect);
            selectCoin.addEventListener("click", clickDrop);
            switchPlayer();
        }
    });
}

function checkForWin(icol, irow) {
    console.log("Checkpoint 5: checkForWin");
    var win = false;
    var $colArr = $(".col" + icol);

    // Get slot classes (directions) and make an array of each direction
    var $slot = $colArr.eq(irow); // Gets the individual slot that was filled
    var classStr = $slot.attr("class"); // Gets a string of the slot classes
    var classArr = classStr.split(" "); // Transforms the string into an array

    classArr.pop();
    classArr.shift(); // Removes redundant 'slot' and 'player' classes

    checkLine(classArr[0]);
    checkLine(classArr[1]);
    checkLine(classArr[2]);
    checkLine(classArr[3]);

    function checkLine(line) {
        $arr = $("." + line); // This converts each class string into a class selector
        var count = 0;
        for (var i = 0; i < $arr.length; i++) {
            if ($arr.eq(i).hasClass(player)) {
                $arr.eq(i).addClass("x");
                count++;
                if (count >= 4) {
                    win = true;
                    $(".x").addClass("flagged");
                }
            } else {
                count = 0;
                $arr.removeClass("x");
            }
        }
        $arr.removeClass("x");
        return;
    }

    return win;
}

function victoryDance(player) {
    console.log("Checkpoint 6: victoryDance");

    if (player === "Yellow") {
        score1++;
        $score1.html(score1);
    } else if (player === "Red") {
        score2++;
        $score2.html(score2);
    }

    $("#infoDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#winDiv").css({
        height: "100px",
        visibility: "visible",
    });
    $(".rainDiv").css({
        visibility: "visible",
    });

    timer1 = setTimeout(coinRain1, 2000);
    timer2 = setTimeout(coinRain2, 1000);
    timer3 = setTimeout(coinRain3, 0);
    document.addEventListener("transitionend", rainReset); // Resets Coins

    music2.pause();
    music2.currentTime = 0;
    musicWin();

    document.addEventListener("keydown", menu);
    idiv = 4;
    ibtn = 1;
    menu(0);

    $("#winTxt").html("<span id=" + player + ">" + player + "</span> wins!");

    document.removeEventListener("keydown", keyFunc);
    $("#selectDiv").css({
        visibility: "hidden",
    });
    selectCoin.style.visibility = "hidden";
    return;
}

// Animations

var rainArr1 = document.querySelectorAll("#rainDiv1>div"); // Array-like element
var $rainCoins1 = $("#rainDiv1 div");
var rainCoin1;
var oldCoin1;

var rainArr2 = document.querySelectorAll("#rainDiv2>div");
var $rainCoins2 = $("#rainDiv2 div");
var rainCoin2;
var oldCoin2;

var rainArr3 = document.querySelectorAll("#rainDiv3>div");
var $rainCoins3 = $("#rainDiv3 div");
var rainCoin3;
var oldCoin3;

function coinRain1() {
    do {
        rainCoin1 = Math.floor(Math.random() * 10);
    } while (rainCoin1 == oldCoin1);
    oldCoin1 = rainCoin1;

    console.log("rainCoin1", rainCoin1);
    rainArr1[rainCoin1].style.transition = "transform 2s linear";
    rainArr1[rainCoin1].style.transform = "translateY(120vh)";
    timer1 = setTimeout(coinRain1, 2230);
}

function coinRain2() {
    do {
        rainCoin2 = Math.floor(Math.random() * 12);
    } while (rainCoin2 == oldCoin2);
    oldCoin2 = rainCoin2;

    console.log("rainCoin2", rainCoin2);
    rainArr2[rainCoin2].style.transition = "transform 2.5s linear";
    rainArr2[rainCoin2].style.transform = "translateY(120vh)";
    timer2 = setTimeout(coinRain2, 1630);
}

function coinRain3() {
    do {
        rainCoin3 = Math.floor(Math.random() * 16);
    } while (rainCoin3 == oldCoin3);
    oldCoin3 = rainCoin3;

    console.log("rainCoin3", rainCoin3);
    rainArr3[rainCoin3].style.transition = "transform 3.5s linear";
    rainArr3[rainCoin3].style.transform = "translateY(120vh)";
    timer3 = setTimeout(coinRain3, 1830);
}

function rainReset(e) {
    e.target.style.transition = "none";
    e.target.style.transform = "";
}

// Music and SFX // I googled this part. I couldn't figure out why autoplay wasn't working

//window.addEventListener("DOMContentLoaded", musicMenu);
//window.addEventListener("DOMContentLoaded", musicMenu);

var music1;
var music2;
var music3;
var sfx1;
var sfx2;
var sfx3;

function musicMenu() {
    music1 = document.getElementById("music1");
    music1.volume = 1;
    music1.play();
}

function musicBoard() {
    music2 = document.getElementById("music2");
    music2.volume = 1;
    music2.play();
}

function musicWin() {
    music3 = document.getElementById("music3");
    music3.volume = 0.6;
    music3.currentTime = 1;
    music3.play();
}

function sfxSelect() {
    sfx1 = document.getElementById("sfx1");
    sfx1.volume = 1;
    sfx1.play();
}

function sfxFall() {
    sfx2 = document.getElementById("sfx2");
    sfx2.volume = 0.7;
    sfx2.play();
}

function sfxCoin() {
    sfx3 = document.getElementById("sfx3");
    sfx3.volume = 1;
    sfx3.play();
}
