console.log();

// Part 1
console.log("Part 1");

function Rectangle(width, height) {
    this.width = width;
    this.height = height;
} // We don't give the Rectangle constructor a getArea method...

function Square(width) {
    this.width = width;
}

Rectangle.prototype.getArea = function () {
    switch (this.hasOwnProperty("height")) {
        case true:
            return this.width * this.height;
        default:
            return this.width * this.width;
    }
}; // ...We give it to the Rectangle prototype, where the computer will search it when we call the .getArea method in Rectangle objects

Square.prototype = Rectangle.prototype; // Then we give Square objects the same prototype as Rectangles, so they also look there for the getArea method

var square = new Square(4);
console.log("square.getArea() :", square.getArea()); //16

var rect = new Rectangle(4, 5);
console.log("rect.getArea() :", rect.getArea()); //20

console.log();

// Part 2
console.log("Part 2");

function invertCase(string) {
    var upString = string.toUpperCase(); // Upper case version of the input string for comparison
    var loString = string.toLowerCase(); // Lower case version of the input string for comparison
    var mirrorString = ""; // An empty string to be filled

    for (var i = 0; i < string.length; i++) {
        if (string[i] === upString[i]) {
            mirrorString += loString[i];
        } else {
            mirrorString += upString[i];
        }
    } // the 'for' loop checks every character of the original string and inserts in the new string the opposite case
    return mirrorString; // Once the new string is complete we return it
}

console.log(invertCase("WhAt Is Up WiTh ThAt WeIrD SpOnGeBoB MeMe!?"));

console.log();

// Bonus!
console.log("Bonus!");

function Countdown(timer) {
    this.timer = timer;
    this.start = function () {
        if (!this.hasOwnProperty("timerBackup")) {
            this.timerBackup = this.timer;
        } // First we create a backup property of the timer property, because we will use and update it through the recursion chain. I tried to achieve the same using a variable, but I couldn't find a way to make it work.
        setTimeout(
            function () {
                console.log(this.timer);
                if (this.timer > 0) {
                    this.timer--;
                    this.start();
                } else {
                    this.timer = this.timerBackup;
                    delete this.timerBackup;
                } // We start a recursion chain in a way that will wait 1 second for every recursion, and use an if statement to break the loop once the timer reaches 0. Then we restore the 'timer' property to its original state using the backup, and delete the backup afterwards.
            }.bind(this),
            1000
        ); // We use .bind(this) to make sure that 'this' always refers to the 'countdown' object
    };
}

var countdown = new Countdown(5);

countdown.start();
