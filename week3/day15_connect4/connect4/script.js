// Buttons

var startBtn = document.getElementById("startBtn");
console.log("startBtn :", startBtn);

var vsBtn = document.getElementById("vsBtn");
console.log("vsBtn :", vsBtn);

var readyBtn = document.getElementById("readyBtn");
console.log("readyBtn :", readyBtn);

var rematchBtn = document.getElementById("rematchBtn");
console.log("rematchBtn :", rematchBtn);

// Selection coin

var selectCoin = document.getElementById("selectCoin");
console.log("selectCoin :", selectCoin);

// Variables
/*
var columns = 7; // For calculations and future procedural boards
var rows = 6;
var winLine = 4;
*/
var icol = 3; // Keeps track of current column / last coin column

var player = "Yellow";
selectCoin.classList.add("Yellow");

// Event listeners

startBtn.addEventListener("click", function (e) {
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

    $(".slot").removeClass("Yellow Red");

    switchPlayer();
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
}

function newGame(player) {
    selectCoin.style.visibility = "visible";
    document.addEventListener("keydown", keyFunc);
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
        console.log("Checkpoint 1. icol :", icol);
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
            console.log("Checkpoint 2. irow :", irow);

            $col.eq(irow).addClass(player);

            if (checkForWin(icol, irow)) {
                // After coin successfully set, check for win
                victoryDance(player);
            } else {
                switchPlayer();
            }
            return;
        }
    }
    alert("Column is full! Please choose another one.");
    return;
}

function moveCoin(icol) {
    console.log("Checkpoint animation");
    console.log('$(".col" + icol).length', $(".col" + icol).length);

    document.removeEventListener("keydown", keyFunc);

    var dropHeight = $(".col" + icol).length;
    selectCoin.style.transition = "all " + 600 + "ms linear";
    selectCoin.style.transform = "translateY(" + 600 + "px)";

    document.addEventListener("transitionend", function refresh(e) {
        console.log("e.taget :", e.target);
        document.removeEventListener("transitionend", refresh); // Only triggers once

        document.addEventListener("keydown", keyFunc);
        selectCoin.style.transition = "";
        selectCoin.style.transform = "translateY(0px)";

        dropCoin(icol);
    });
}

function checkForWin(icol, irow) {
    console.log("Checkpoint 3. jQ lists");

    var $colArr = $(".col" + icol);
    // console.log("$colArr :", $colArr);

    // Try to get slot classes
    // console.log("TEST $colArr.eq(irow) :", $colArr.eq(irow));
    var $slot = $colArr.eq(irow); // Gets the individual slot that was filled

    // console.log($slot.attr("class"));
    var classStr = $slot.attr("class"); // Gets a string of the slot classes

    // console.log(classStr.split(" "));
    var classArr = classStr.split(" "); // Transforms the string into an array

    classArr.pop();
    classArr.shift(); // Removes redundant 'slot' and 'player' classes
    // console.log(classArr);

    if (checkLine(classArr[0])) {
        // Checks win in column
        // console.log("column win");
        return true;
    } else if (checkLine(classArr[1])) {
        // Checks win in row
        // console.log("row win");
        return true;
    } else if (checkLine(classArr[2]) || checkLine(classArr[3])) {
        // Checks win in diagonals
        // console.log("diagonal win");
        return true;
    } else false;
}

function checkLine(line) {
    $arr = $("." + line); // This converts each class string into a class selector
    var count = 0;
    for (var i = 0; i < $arr.length; i++) {
        if ($arr.eq(i).hasClass(player)) {
            count++;
            if (count == 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function victoryDance(player) {
    // console.log("Checkpoint 4. Win");

    $("#infoDiv").css({
        height: "0px",
        visibility: "hidden",
    });
    $("#winDiv").css({
        height: "100px",
        visibility: "visible",
    });
    document.removeEventListener("keydown", keyFunc);
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
