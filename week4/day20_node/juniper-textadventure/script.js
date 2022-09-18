///// do not touch /////
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
///// do not touch /////

/*
rl.question("Do you enjoy learning Node.js?", function (answer) {
    if (answer === "yes") {
        console.log("great!");
    }
    rl.close();
});
*/

// Choose text adventure color by passing an argument

const chalk = require("chalk");

let color;
let colorSet = true;

const history = [];

setColor(process.argv[2]);

function setColor(colorChoice) {
    switch (colorChoice) {
        case "red":
            color = (txt) => chalk.red(txt);
            break;
        case "yellow":
            color = (txt) => chalk.yellow(txt);
            break;
        case "green":
            color = (txt) => chalk.green(txt);
            break;
        case "cyan":
            color = (txt) => chalk.cyan(txt);
            break;
        case "blue":
            color = (txt) => chalk.blue(txt);
            break;
        case "magenta":
            color = (txt) => chalk.magenta(txt);
            break;
        default:
            color = (txt) => chalk.white(txt);
            colorSet = false;
    }
    return;
}

// Player stats
const player = {
    name: "Will",
    level: 1,
    hp: 100,
    mp: 10,
    combat: 1,
    magic: 1,
    charisma: 1,
    weapon: "none",
    armor: "none",
};

const sword = {
    damage: 5,
    type: "melee",
};

const items = {
    map: "A map of the area",
};

console.log(items);

// Story
let lastInput;

let intro = {
    func: function () {},
    s: `\nWelcome to the Land of Heinlein! \n
This is a story of a young adventurer in a land where mythology is more hitory than myth. This is your story.`,
    q: "Would you like to play?",
    answers: {
        yes: {
            func: function () {
                inputStage = true;
            },
            q: "What is your name?",
            answers: {
                func: function () {
                    inputStage = false;
                    player.name = lastInput;
                    console.log(player);
                    next(story);
                },
            },
        },
        no: "Alright then. Enjoy your day!",
    },
};

let story = {
    func: function () {
        console.log("Checkpoint!");
        if (brooch) {
            console.log(`Just as you turn to go back to the fork \
you notice something shining in the ground. \
It is a nicely crafted ${chalk.yellow("brooch")}. \
You put it in your pocket.`);
        }
    },
    s: `\nYou are alone in a dark forest and facing a fork in the road.`,
    q: "Which direction do you turn?",
    answers: {
        left: {
            func: function () {},
            s: `\nThere's a scary wizard! He asks you a tough question.`,
            q: "What's 1+1?",
            answers: {
                2: "congratulations!",
            },
        },
        right: {
            func: function () {
                delete previousStage.answers.right;
                brooch = true;
            },
            s: `\nAfter walking for a while the path turns into a trail.`,
            q: "This was not the way.",
            answers: {
                "go back": "",
            },
        },
    },
};

let stage;
let previousStage;
let inputStage = false;

// Story vars
let brooch;

if (!colorSet) {
    rl.question(`Would you like to use a color the information text?:\n[No,${chalk.red("red")},${chalk.yellow("yellow")},${chalk.green("green")},${chalk.cyan("cyan")},${chalk.blue("blue")},${chalk.magenta("magenta")}]\n`, function (userInput) {
        setColor(userInput);
        next(intro);
        return;
    });
} else {
    next(intro);
}

// Game function
function next(stage) {
    if (typeof stage.func === "function") {
        stage.func();
    }
    stage.s && console.log(stage.s);

    rl.question(color(stage.q) + ` [${Object.keys(stage.answers)}] \n`, function (userInput) {
        // Determine if input is valid
        if (inputStage) {
            lastInput = userInput;
            stage.answers.func();
            return;
        }

        if (!stage.answers.hasOwnProperty(userInput)) {
            next(stage);
            return;
        }
        // go back
        if (userInput == "go back") {
            next(previousStage);
            return;
        }
        // Go to userInput stage
        previousStage = stage;
        stage = stage.answers[userInput];
        // Determine if story has ended
        if (typeof stage == "string") {
            console.log(color(stage));
            rl.close();
            return;
        }
        next(stage);
    });
}
