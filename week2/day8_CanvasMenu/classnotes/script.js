(function () {
    console.log("script linked!");

    var canvas = document.getElementById("canvas");

    console.log("canvas :", canvas);

    // Render our drawing context

    var ctx = canvas.getContext("2d");

    console.log("ctx :", ctx);

    // 2. Beginning our path
    ctx.beginPath();

    // 3. Set color and width of line (optional)
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    // 4. Move to the start position
    ctx.moveTo(300, 150);

    // 5. Map out the shape we want

    ctx.lineTo(450, 450);
    ctx.lineTo(150, 450);
    ctx.lineTo(300, 150);

    ctx.closePath(); // To get rid of ugly corners

    // 6. Draw out the plan we want

    ctx.stroke();

    // 7. Fill the shape (optional)

    ctx.fillStyle = "green";
    ctx.fill();

    // 8. Draw a circle

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(450, 450, 70, 0, 2 * Math.PI);
    // arguments: (x, y, radius, startAngle, endAngle)
    ctx.stroke();
    ctx.fillStyle = "teal";
    ctx.fill();

    // Create a rectangle
    ctx.strokeRect(10, 20, 30, 40);
    // arguments: (origin x, origin y, width height)

    // Create a color-filled rectangle
    ctx.fillRect(10, 20, 30, 40);

    // Clear your canvas
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    //
    //
    //
    //
    //
})();
