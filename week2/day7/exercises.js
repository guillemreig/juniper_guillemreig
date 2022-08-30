// Part 1
var cube = document.getElementById("cube");

document.addEventListener("mousemove", function (e) {
    cube.style.left = e.pageX - 50 + "px";
    cube.style.top = e.pageY - 50 + "px";
});

// Part 2

var textArea = document.getElementById("textArea");

var address =
    "Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, \
and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that \
nation, or any nation so conceived and dedicated, can long endure. We are met on a great battle-field of that war. We have come \
to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. \
It is altogether fitting and proper that we should do this. But, in a larger sense, we can not dedicate -- we can not consecrate \
-- we can not hallow -- this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor \
power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did \
here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so \
nobly advanced. It is rather for us to be here dedicated to the great task remaining before us -- that from these honored dead \
we take increased devotion to that cause for which they gave the last full measure of devotion -- that we here highly resolve \
that these dead shall not have died in vain -- that this nation, under God, shall have a new birth of freedom -- and that \
government of the people, by the people, for the people, shall not perish from the earth.";

textArea.value = ""; // We empty the text area (not necessary if already empty)

document.addEventListener("keydown", function (e) {
    if (e.keyCode !== 8) {
        e.preventDefault(); // Prevents the text area to be filled with the keyboard input
        textArea.value += address[textArea.value.length]; // And instead adds a character from the 'address' text. We use the current text lenghth as index value.
    } // This 'if' checks if the 'backspace' key was pushed. If it was, it lets the 'backspace' work normally
});

// Part 3

var colorBox = document.getElementById("colorBox");

colorBox.addEventListener("mousedown", function (e) {
    var randomColor =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ")";
    e.target.style.backgroundColor = randomColor;
});

colorBox.addEventListener("mouseup", function (e) {
    var randomColor =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ")";
    e.target.style.backgroundColor = randomColor;
});

// Part 4
var outerBox = document.getElementById("outerBox");
var innerBox = document.getElementById("innerBox");

innerBox.addEventListener("mousedown", function (e) {
    e.stopPropagation(); // This prevents a click in the inner box to also trigger the outer box. Or you could just use 'target'
    var randomColor =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ")";
    e.currentTarget.style.backgroundColor = randomColor;
});

outerBox.addEventListener("mousedown", function (e) {
    var randomColor =
        "rgb(" +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ", " +
        Math.floor(Math.random() * 256) +
        ")";
    e.currentTarget.style.backgroundColor = randomColor;
});
