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
    var $col = $(".col" + icol); // Makes a jQuery list of the slots in the current column
    var irow; // Keeps track of current row / last coin row

    for (irow = 0; irow < $col.length; irow++) {
        if (
            !$col.eq(irow).hasClass("Yellow") &&
            !$col.eq(irow).hasClass("Red")
        ) {
            $col.eq(irow).addClass(player);
            console.log("Checkpoint 2. irow :", irow);

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

function checkForWin(icol, irow) {
    console.log("Checkpoint 3. jQ lists");

    var $colArr = $(".col" + icol);
    console.log("$colArr :", $colArr);

    // Try to get slot classes
    console.log("TEST $colArr.eq(icol) :", $colArr.eq(icol));

    var $rowArr = $(".row" + irow);
    console.log("$rowArr :", $rowArr);

    if (checkLine($colArr)) {
        // Checks win in column
        console.log("col win");
        return true;
    } else if (checkLine($rowArr)) {
        // Checks win in row
        console.log("row win");
        return true;
    } else {
        return false;
    }
}

function checkLine(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr.eq(i).hasClass(player)) {
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
    console.log("Checkpoint 4. Win");

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
