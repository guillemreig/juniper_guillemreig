var selectCoin = document.getElementById("selectCoin");
console.log("selectCoin :", selectCoin);

var icol = 3; // Keeps track of current column / last coin column

var player = "Yellow";
selectCoin.classList.add("Yellow");

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
/*
$(".colDiv").on("click", function (e) {
    var col = $(e.currentTarget);
    var slotsInCol = col.children();
    consolelog();

    for (var i = slotsInCol.length - 1; i >= 0; i--) {
        console.log(slotsInCol[i]);

        if (
            !slotsInCol.eq(i).hasClass("Yellow") &&
            !slotsInCol.eq(i).hasClass("Red")
        ) {
            slotsInCol.eq(i).addClass(player);
            break;
        }
    }

    if (i == -1) {
        console.log("Column is full!");
        return;
    }

    var slotsInRow = 

    if (checkForVictory(slotsInCol)) {
        // This checks for the vertical
    } else {
    }

    switchPlayer();
    console.log("Next player is:", player);
});

function checkForVictory(slots) {
    var count = 0;
    for (var i = 0; i < slots.length; i++) {
        if (slots.eq(i).hasClass(player)) {
            count++;

            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }
}
*/
document.addEventListener("keydown", function (e) {
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
        // Space
        console.log("Select!");
        dropCoin(icol);
    }
});

function dropCoin(icol) {
    var $col = $(".col" + icol);
    console.log("$col :", $col);
    var irow; // Keeps track of last coin row

    for (irow = 0; irow < $col.length; irow++) {
        if (
            !$col.eq(irow).hasClass("Yellow") &&
            !$col.eq(irow).hasClass("Red")
        ) {
            $col.eq(irow).addClass(player);
            console.log("icol :", icol);
            console.log("icol :", irow);
            checkForWin(icol, irow); // After coin set, check for win
            switchPlayer();
            return;
        }
    }
    alert("Column is full! Please choose another one.");
}

function checkForWin(icol, irow) {
    var $colArr = $(".col" + icol);
    console.log("$colArr :", $colArr);
    checkLine($colArr); // Checks win in column

    var $rowArr = $(".row" + irow);
    console.log("$rowArr :", $rowArr);
    checkLine($rowArr); // Checks win in row
}

function checkLine(arr) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr.eq(i).hasClass(player)) {
            count++;
            if (count == 4) {
                victoryDance(player);
            }
        } else {
            count = 0;
        }
    }
}

function victoryDance(player) {
    console.log(player + " wins!!");
}
