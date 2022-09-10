// Buttons

var startBtn = document.getElementById("startBtn"); // Quick start button
var selectBtn = document.getElementById("selectBtn"); // New Game button
var vsBtn = document.getElementById("vsBtn"); // 1 vs 1 button
var readyBtn = document.getElementById("readyBtn"); // Go! button
var rematchBtn = document.getElementById("rematchBtn"); // Rematch! button

// Selection coin

var selectCoin = document.getElementById("selectCoin"); // The flashing coin used in column selection

// Variables
/*
var columns = 7; // For calculations and future procedural boards
var rows = 6;
var winLine = 4;
*/
var icol = 3; // Keeps track of current selected column

var player = "Yellow"; // Keeps track of current player. Starting player "Yellow"
selectCoin.classList.add("Yellow"); // The selecting coin starts being yellow

var idiv; // The index of the menu division currently displayed
var ibtn = 1; // The index of the button currently selected

/*
// The future game intro sequence screen
timer = setTimeout(function intro(){}, 1000)
clearTimeout(timer);
*/

(function intro() {
    $("#startDiv").css({
        height: "100px",
        visibility: "visible",
    });
    idiv = 0; // Currently at menu index 0
})();

// Event listeners
document.addEventListener("keydown", function menu(e) {
    var $btnDiv = $(".btnDiv"); // All menu screens
    var $currMenu = $btnDiv.eq(idiv).children(); // Current menu screen
    var menuLength = $currMenu.length; // Current menu length

    var $currBtn; // The current button 'p' element

    if (e.key === "ArrowDown") {
        ibtn--;
        if (ibtn < 1) {
            ibtn = menuLength - 1;
        }
        $("button").removeClass("btnSelect");
        $currBtn = $currMenu.eq(ibtn);
        $currBtn.children().addClass("btnSelect");
    } else if (e.key === "ArrowUp") {
        ibtn++;
        if (ibtn > menuLength - 1) {
            ibtn = 1;
        }
        $("button").removeClass("btnSelect");
        $currBtn = $currMenu.eq(ibtn);
        $currBtn.children().addClass("btnSelect");
    } else if (e.keyCode === 32 || e.key === "Enter") {
        if (idiv === 0 && ibtn === 1) {
        }

        // Space or Enter
    }
    console.log("idiv :", idiv);
    console.log("ibtn :", ibtn);
});

startBtn.addEventListener("click", function (e) {
    console.log("Checkpoint 0. Start");
    $("#startDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#infoDiv").css({
        height: "100px",
        visibility: "visible",
    });

    $(".slot").removeClass("Yellow Red flagged");

    win = false;
    newGame(player);
});

selectBtn.addEventListener("click", function (e) {
    $("#startDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#gameDiv").css({
        height: "100px",
        visibility: "visible",
    });
    return;
});

vsBtn.addEventListener("click", function (e) {
    $("#gameDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#readyDiv").css({
        height: "100px",
        visibility: "visible",
    });
    return;
});

readyBtn.addEventListener("click", function (e) {
    $("#readyDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#infoDiv").css({
        height: "100px",
        visibility: "visible",
    });
    newGame(player);
    return;
});

rematchBtn.addEventListener("click", function (e) {
    console.log("Checkpoint 5. Restart");
    $("#winDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#infoDiv").css({
        height: "100px",
        visibility: "visible",
    });
    $("#selectDiv").css({
        visibility: "visible",
    });

    $(".slot").removeClass("Yellow Red flagged");

    switchPlayer();
    win = false;
    newGame(player);
});

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
    $("#selectDiv").css({
        visibility: "visible",
    });
    $("#board").css({
        visibility: "visible",
    });
    return;
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
        document.removeEventListener("keydown", keyFunc); // Disables keydown
        dropCoin(icol);
    }
    return;
}

function dropCoin(icol) {
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
    return;
}

function moveCoin(icol, irow) {
    console.log("Checkpoint 3: moveCoin");

    var $col = $(".col" + icol);
    var h = $col.length - irow; // The height of the drop

    selectCoin.style.animation = "none";
    selectCoin.style.transition = "all " + h * 100 + "ms linear"; // Adapts fall time to height
    selectCoin.style.transform = "translateY(" + h * 100 + "px)"; // The distance to move

    document.addEventListener("transitionend", function refresh(e) {
        console.log("Checkpoint 4: transitionend");

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

    $("#infoDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#winDiv").css({
        height: "100px",
        visibility: "visible",
    });
    $("#winTxt").html("<span id=" + player + ">" + player + "</span> wins!");

    document.removeEventListener("keydown", keyFunc);
    $("#selectDiv").css({
        visibility: "hidden",
    });
    selectCoin.style.visibility = "hidden";
    return;
}

// Animations
/*
    if (left <= -links[0].offsetWidth) {
        left = left + links[0].offsetWidth; //
        headlines.appendChild(document.getElementsByTagName("a")[0]); // Remove the first link and make it the last
    } // This will run when the first link is completely offscreen

    headlines.style.left = left + "px"; // This moves the box
    reqId = requestAnimationFrame(moveHeadlines); // 2. This keeps it going
    */
