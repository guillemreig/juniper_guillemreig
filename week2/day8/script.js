(function () {
    // Part 1: Draw a stick figure

    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    // Beginning our path
    ctx.beginPath();

    // Set color and width of line (optional)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    // Body
    ctx.moveTo(150, 100); // Neck
    ctx.lineTo(150, 300); // Groin

    // Arms
    ctx.moveTo(0, 100); // Left hand
    ctx.lineTo(150, 200); // Shoulders
    ctx.lineTo(300, 100); // Right hand

    // Legs
    ctx.moveTo(0, 500); // Left foot
    ctx.lineTo(150, 300); // Groin
    ctx.lineTo(300, 500); // Right foot

    ctx.stroke(); // Draw body

    // Head
    ctx.beginPath();
    ctx.arc(150, 50, 50, 0, 2 * Math.PI);
    // (x, y, radius, start rad, end rad)

    ctx.stroke(); // Draw head

    // Bonus: Make the stick figure move

    var bigCanvas = document.getElementById("bigCanvas");
    var ctx2 = bigCanvas.getContext("2d");

    var stickX = 250; // Start X position
    var stickY = 300; // Start Y position

    ctx2.drawImage(canvas, stickX, stickY); // Initial drawing

    document.addEventListener("keydown", function (e) {
        if (e.keyCode === 37) {
            // Left arrow
            e.preventDefault(); // Prevents the default keyboard input
            stickX -= 20;
            if (stickX <= -320) {
                console.log("I'm lost!");
                stickX += 20;
            }
        } else if (e.keyCode === 38) {
            // Up arrow
            e.preventDefault();
            stickY -= 20;
            if (stickY <= -520) {
                console.log("I have to go now. My planet needs me…");
                stickY += 20;
            }
        } else if (e.keyCode === 39) {
            // Right arrow
            e.preventDefault();
            stickX += 20;
            if (stickX >= 820) {
                console.log("Where am I?");
                stickX -= 20;
            }
        } else if (e.keyCode === 40) {
            // Down arrow
            e.preventDefault();
            stickY += 20;
            if (stickY >= 320) {
                console.log("I'm already on the ground, buddy...");
                stickY -= 20;
            }
        }
        ctx2.clearRect(0, 0, bigCanvas.width, bigCanvas.height);
        ctx2.drawImage(canvas, stickX, stickY); // New position
    });
    //
    //
    //
    //
    //
})();
