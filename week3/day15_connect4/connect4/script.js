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
var win = false;

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
    alert("Column is full! Please choose another one.");
    document.addEventListener("keydown", keyFunc); // Enables keydown
    return;
}

function moveCoin(icol, irow) {
    console.log("Checkpoint 3: moveCoin");
    console.log('$(".col" + icol).length', $(".col" + icol).length);

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
    console.log("Checkpoint 3. jQ lists");

    var $colArr = $(".col" + icol);
    // console.log("$colArr :", $colArr);

    // Try to get slot classes
    var $slot = $colArr.eq(irow); // Gets the individual slot that was filled

    var classStr = $slot.attr("class"); // Gets a string of the slot classes

    var classArr = classStr.split(" "); // Transforms the string into an array

    classArr.pop();
    classArr.shift(); // Removes redundant 'slot' and 'player' classes

    checkLine(classArr[0]);
    checkLine(classArr[1]);
    checkLine(classArr[2]);
    checkLine(classArr[3]);
    console.log("win :", win);
    return win;
}

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
