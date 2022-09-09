// Restart the game options:
// Restart button
// Reload the page
// Clear board (player 2 starts)
//
var currentPlayer = "player1";

$(".column").on("click", function (e) {
    // console.log("column was clicked");
    var col = $(e.currentTarget);
    var slotsInCol = col.children();
    // console.log("col clicked is ==> ", col);
    // console.log("slotsInCol: ", slotsInCol);

    // we're looping through the slots in the column starting from the bottom
    for (var i = slotsInCol.length - 1; i >= 0; i--) {
        if (
            !slotsInCol.eq(i).hasClass("player1") &&
            !slotsInCol.eq(i).hasClass("player2")
        ) {
            slotsInCol.eq(i).addClass(currentPlayer);
            break;
        }
    }

    if (i === -1) {
        console.log("column is full - dont switch players!!");
        return;
    }

    var slotsInRow = $(".row" + i);
    console.log("slots in row: ", slotsInRow);

    // if (checkForVictory(slotsInCol)) {
    //     console.log("victory in column!!!!!");
    // } else if (check for your row victory here) {
    //     // well handle this in a sec
    //     console.log('victory in row!!!!!')
    // }

    switchPlayer();
});

function switchPlayer() {
    if (currentPlayer === "player1") {
        currentPlayer = "player2";
    } else {
        currentPlayer = "player1";
    }
}

function checkForVictory(slots) {
    // were going to write some logic to check who won
    var count = 0;
    for (var i = 0; i < slots.length; i++) {
        // console.log(slots.eq(i).hasClass(currentPlayer));

        if (slots.eq(i).hasClass(currentPlayer)) {
            count++;
            if (count === 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }
}
