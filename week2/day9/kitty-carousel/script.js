(function () {
    var kitties = document.querySelectorAll("#kittyDiv img"); // The Array-like of images
    var kittyDiv = document.getElementById("kittyDiv"); // The div

    function moveKitties() {
        // console.log("moveKitties activation");

        // Remainder version
        // NOTE: The 'remainder' version makes all the code under'currKitty++' redundant
        /*
        kitties[(4 + currKitty) % 4].classList.remove("onScreen");
        kitties[(4 + currKitty) % 4].classList.add("exit-left");
        kitties[(5 + currKitty) % 4].classList.add("onScreen");
        kitties[(3 + currKitty) % 4].classList.remove("exit-left");
        */
        // Classroom version

        var kitties = document.querySelectorAll("#kittyDiv img");

        kitties[0].classList.remove("onScreen");
        kitties[0].classList.add("exit-left"); // 1. Kitty currently on screen begins to move out

        kitties[1].classList.add("onScreen"); // 2. Kitty next in line begins to move in

        // currKitty++;
        /*
        if (currKitty >= kitties.length) {
            currKitty = 0;
        }
        */
        //console.log("currKitty :", currKitty);
    }

    // var currKitty = 0;

    setTimeout(moveKitties, 1000); // This starts the process

    document.addEventListener("transitionend", function (e) {
        // console.log("transition ends!");

        // console.log("e.target :", e.target);
        // console.log("kitties[currKitty + 1] :", kitties[currKitty + 1]);

        /*
        console.log(
            "e.target == kitties[currKitty + 1] :",
            e.target == kitties[currKitty + 1]
        ); 
        */

        if (e.target === kitties[1]) {
            kitties[0].classList.remove("exit-left");

            // console.log("kitties[currKitty] :", kitties[currKitty]);
            // console.log(kitties[currKitty], "back to stack"); // For debugging

            //kittyDiv.appendChild(document.getElementsByTagName("img")[0]); // Remove the first link and make it the last
            kittyDiv.appendChild(kitties[0]); // Remove the first link and make it the last

            kitties = document.querySelectorAll("#kittyDiv img"); // Refresh kitties to reassign indexes

            // console.log("kitties :", kitties);

            setTimeout(moveKitties, 2000); // Keeps the function going indefinitely
        }
    });
})();
