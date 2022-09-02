(function () {
    var kitties = document.querySelectorAll("#kittyDiv img"); // The Array-like of images
    var dots = document.getElementsByClassName("dot");

    var isTransitioning = false;
    var timer;

    var currKitty = 0;

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

        // var kitties = document.querySelectorAll("#kittyDiv img");

        isTransitioning = true;

        kitties[currKitty].classList.remove("onScreen");
        dots[currKitty].classList.remove("on");

        kitties[currKitty].classList.add("exit-left"); // 1. Kitty currently on screen begins to move out

        currKitty++;

        if (currKitty >= kitties.length) {
            currKitty = 0;
        }
        console.log("currKitty :", currKitty);

        kitties[currKitty].classList.add("onScreen"); // 2. Kitty next in line begins to move in
        dots[currKitty].classList.add("on");
    }

    // var currKitty = 0;

    timer = setTimeout(moveKitties, 1000); // This starts the process

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

        if (e.target.classList.contains("exit-left")) {
            e.target.classList.remove("exit-left");

            isTransitioning = false;

            // console.log("kitties[currKitty] :", kitties[currKitty]);
            // console.log(kitties[currKitty], "back to stack"); // For debugging

            //kittyDiv.appendChild(document.getElementsByTagName("img")[0]); // Remove the first link and make it the last
            // kittyDiv.appendChild(kitties[0]); // Remove the first link and make it the last

            // kitties = document.querySelectorAll("#kittyDiv img"); // Refresh kitties to reassign indexes

            // console.log("kitties :", kitties);

            timer = setTimeout(moveKitties, 2000); // Keeps the function going indefinitely
            console.log("timer :", timer);
        }
    });

    // Approach 1: Make sure we keep the value of i, inside the function that runs upon click using scope
    /*
    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", clickhandler(i));
    }

    function clickhandler(idx) {
        return function () {
            console.log("you clicked on dot index :", idx);
            return idx;
        };
    }
    */
    // Approach 2: using iife to create a scoped handler

    for (var i = 0; i < dots.length; i++) {
        (function (idx) {
            dots[i].addEventListener("click", function (e) {
                // If we are mid-transition, don't do anything
                if (isTransitioning) {
                    console.log("can't do it while transitioning!");
                    return;
                } else if (e.target.classList.contains("on")) {
                    console.log("image already in use!");
                    return;
                } else {
                    clearTimeout(timer); // 1st. Stop the carousel

                    // 2nd. Bring the kitty that got clicked instead
                    console.log("you clicked on dot index :", idx);

                    isTransitioning = true; // Set transitioning 'true' to prevent dot functionality
                    kitties[currKitty].classList.remove("onScreen"); // Current kitty goes away
                    kitties[currKitty].classList.add("exit-left");
                    dots[currKitty].classList.remove("on"); // So does its dot

                    kitties[idx].classList.add("onScreen"); // Kitty clicked comes in
                    dots[idx].classList.add("on"); // As its dot does

                    currKitty = idx; // Kitten clicked is now current kitten
                }
            });
        })(i);
    }

    // Approach 3: utilising that the event object knows wich target got clicked on
    /*
    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function (e) {
            console.log("you clicked on dot index :", e.target);
            for (var j = 0; j < dots.length; j++) {

            }
        });
    }
    */
})();
