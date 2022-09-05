(function () {
    // Identifiers
    var kitties = document.querySelectorAll("#kittyDiv img"); // The Array-like of images
    console.log("kitties :", kitties);

    var dots = document.getElementsByClassName("dot");
    console.log("dots :", dots);

    // Flags
    var isTransitioning = false;
    var buttonClicked = false;
    var swipeRight = false;

    // Variables
    var currKitty = 0;
    var timer;

    console.log("currKitty :", currKitty); // For debugging info

    timer = setTimeout(moveKitties, 3000); // This starts the process

    function moveKitties(idx) {
        // Remainder version
        /*
        kitties[(4 + currKitty) % 4].classList.remove("onScreen");
        kitties[(4 + currKitty) % 4].classList.add("exit-left");
        dots[(4 + currKitty) % 4].classList.remove("on");
        
        kitties[(5 + currKitty) % 4].classList.add("onScreen");
        dots[(5 + currKitty) % 4].classList.add("on");
        
        kitties[(3 + currKitty) % 4].classList.remove("exit-left");
        */
        // Classroom version

        isTransitioning = true; // Prevents button input while running

        if (swipeRight) {
            kitties[currKitty].classList.add("onRight"); // 1. Kitty currently on screen begins to move out
            kitties[currKitty].classList.remove("onScreen");
            dots[currKitty].classList.remove("on"); // Its dot truns off

            kitties[(5 + currKitty) % 4].classList.remove("onRight"); // 2. Kitten on the right no longer ready

            currKitty--;

            if (currKitty < 0) {
                currKitty = 3;
            } // counter correction to avoid negative numbers

            kitties[currKitty].classList.add("onScreen"); // 3. Previous kitty moves back in
            kitties[currKitty].classList.remove("onLeft");
            dots[currKitty].classList.add("on"); // Its dot turns on

            kitties[(3 + currKitty) % 4].style.transitionDuration = "0";
            kitties[(3 + currKitty) % 4].classList.add("onLeft"); // 4. Another kitty goes left ready for consecutive swipe right
            kitties[(3 + currKitty) % 4].style.transitionDuration = "1";

            swipeRight = false;

            return; // End of swipe function
        } else if (buttonClicked) {
            console.log("idx :", idx); // Debug

            if (idx === (5 + currKitty) % 4) {
                buttonClicked = false;
                moveKitties(); // Continues like normal

                return;
            } else if (idx === (3 + currKitty) % 4) {
                buttonClicked = false;
                swipeRight = true;
                moveKitties(); // Behaves like right swipe

                return;
            } else {
                kitties[(3 + currKitty) % 4].classList.remove("onLeft"); // 1. Kitty on the left goes to stack
                kitties[(5 + currKitty) % 4].classList.remove("onRight"); // 2. Kitty on the right no longer ready

                kitties[currKitty].classList.add("onLeft"); // 3. Kitty currently on screen begins to move out
                kitties[currKitty].classList.remove("onScreen");
                dots[currKitty].classList.remove("on"); // Its dot truns off

                var resetKitten = currKitty;
                setTimeout(function () {
                    kitties[resetKitten].classList.remove("onLeft"); // Removes "onLeft" to original kitten after transition
                }, 1000);

                currKitty = idx; // Kitten clicked is now current kitten

                kitties[currKitty].classList.add("onScreen"); // 4. Kitty clicked begins to move in
                dots[currKitty].classList.add("on"); // Its dot turns on

                kitties[(3 + currKitty) % 4].classList.add("onLeft"); // 5. Kitty previous in line goes on the left
                kitties[(5 + currKitty) % 4].classList.add("onRight"); // 6. Kitty next in line goes on the right (ready)

                buttonClicked = false; // Button-triggered 'moveKitties' follow this path. 'buttonClicked' turns 'false' afterwards

                return;
            }

            //kitties[(2 + idx) % 4].classList.add("onLeft"); // 4. Another kitty goes left waiting for swipe right
        }
        // Automated 'moveKitties' follow this path
        kitties[(3 + currKitty) % 4].classList.remove("onLeft"); // 1. Kitty on the left goes to stack

        kitties[currKitty].classList.add("onLeft"); // 2. Kitty currently on screen begins to move out
        kitties[currKitty].classList.remove("onScreen");
        dots[currKitty].classList.remove("on"); // Its dot truns off

        currKitty++; // currkKtty updates to next kitty

        if (currKitty >= kitties.length) {
            currKitty = 0;
        } // if array end is reached, start again

        console.log("currKitty :", currKitty); // For debugging info

        kitties[currKitty].classList.add("onScreen"); // 3. Kitty next in line begins to move on screen
        kitties[currKitty].classList.remove("onRight");
        dots[currKitty].classList.add("on"); // Its dot turns on

        kitties[(5 + currKitty) % 4].classList.add("onRight"); // 4. Next kitty gets ready (probably redundant)
    }

    document.addEventListener("transitionend", function (e) {
        // console.log("transition ends!");
        if (isTransitioning) {
            timer = setTimeout(moveKitties, 3000); // Keeps the function going indefinitely. Also stores the current setTimeout id so it can be stopped using buttons
            isTransitioning = false; // The transition has ended. Buttons unlocked
        }
    }); // This triggers every time a transition ends

    // Approach 1: Make sure we keep the value of i, inside the function that runs upon click using scope
    /*
    for (var i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", clickHandler(i));
    }

    function clickHandler(dotIndex) {
        console.log("assigning clickhandler for dot at index:", dotIndex);
        return function () {
            console.log("dotIndex you clicked:", dotIndex);
            // check if cats are transitioning: IF yes do nothing, i.e. return
            // check if dot clicked is the one that already is on screen: IF yes 
            // do nothing, i.e. return
            // if you make it past these checks:
            // clearTimeout to stop and scheduled
            // now you want to call your moveKitties function and pass to it, the dotIndex
            // that got clicked
        };
    }
    */
    // Approach 2: using iife to create a scoped handler

    for (var i = 0; i < dots.length; i++) {
        (function (idx) {
            dots[i].addEventListener("click", function (e) {
                // If we are mid-transition, don't do anything
                if (isTransitioning) {
                    console.log("Denied: Can't do it while transitioning!");
                    return;
                } else if (e.target.classList.contains("on")) {
                    console.log("Denied: Image already in use!");
                    return;
                } else {
                    clearTimeout(timer); // 1st. Stop the carousel

                    // 2nd. Bring the kitty that got clicked instead
                    console.log("You clicked on dot index :", idx);
                    buttonClicked = true;
                    moveKitties(idx);
                }
            });
        })(i);
    }

    for (var i = 0; i < dots.length; i++) {
        (function (idx) {
            dots[i].addEventListener("touchstart", function (e) {
                // If we are mid-transition, don't do anything
                if (isTransitioning) {
                    console.log("Denied: Can't do it while transitioning!");
                    return;
                } else if (e.target.classList.contains("on")) {
                    console.log("Denied: Image already in use!");
                    return;
                } else {
                    clearTimeout(timer); // 1st. Stop the carousel

                    // 2nd. Bring the kitty that got clicked instead
                    console.log("You touched dot index :", idx);
                    buttonClicked = true;
                    moveKitties(idx);
                }
            });
        })(i); // This adds dots touch functionality
    }

    for (var i = 0; i < dots.length; i++) {
        (function () {
            kitties[i].addEventListener(
                "touchstart",
                function (e) {
                    var touchobj = e.changedTouches[0];
                    startx = parseInt(touchobj.clientX); //
                },
                false
            );

            kitties[i].addEventListener(
                "touchmove",
                function (e) {
                    var touchobj = e.changedTouches[0];
                    dist = parseInt(touchobj.clientX) - startx;
                },
                false
            );

            kitties[i].addEventListener(
                "touchend",
                function (e) {
                    if (dist > 5) {
                        if (isTransitioning) {
                            console.log(
                                "Denied: Can't do it while transitioning!"
                            );
                            return;
                        } else {
                            console.log("swipe right!"); // if swipe goes from left to right call function move(left)
                            clearTimeout(timer);
                            swipeRight = true;
                            moveKitties();
                        }
                    } else if (dist < -5) {
                        if (isTransitioning) {
                            console.log(
                                "Denied: Can't do it while transitioning!"
                            );
                            return;
                        } else {
                            console.log("swipe left!"); // If swipe goes from right to left call function move(right)
                            clearTimeout(timer);
                            moveKitties();
                        }
                    }
                    dist = 0;
                },
                false
            );
            /*
            dots[i].addEventListener("touchstart", function (e) {
                // If we are mid-transition, don't do anything
                if (isTransitioning) {
                    console.log("Denied: Can't do it while transitioning!");
                    return;
                } else if (e.target.classList.contains("on")) {
                    console.log("Denied: Image already in use!");
                    return;
                } else {
                    clearTimeout(timer); // 1st. Stop the carousel

                    // 2nd. Bring the kitty that got clicked instead
                    console.log("You touched dot index :", idx);
                    buttonClicked = true;
                    moveKitties(idx);
                }
            });
            */
        })(i); // This is supposed to add touchscreen functionality
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
