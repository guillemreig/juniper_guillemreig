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

// console.log(chalk.blue("Hello world!"));

let story = {
    q: "Welcome to The Land Of Wizards! Would you like to play?",
    answers: {
        yes: {
            q: "You are alone in a dark forest and facing a fork in the road. Which direction do you turn?",
            answers: {
                left: {
                    q: "There's a scary wizard! He asks you a tough question. What's 1+1?",
                    answers: {
                        2: "congratulations!",
                    },
                },
                right: {
                    q: "After walking for a while the path turns into a trail. This was not the way.",
                    answers: {
                        "go back": "go back",
                    },
                },
            },
        },
        no: "Alright then. Enjoy your day!",
    },
    func() {
        console.log("test!");
    },
};

let stage = story;
let previousStage;

if (!colorSet) {
    rl.question(`Would you like to use a color the information text?:\n[No,${chalk.red("red")},${chalk.yellow("yellow")},${chalk.green("green")},${chalk.cyan("cyan")},${chalk.blue("blue")},${chalk.magenta("magenta")}]\n`, function (userInput) {
        setColor(userInput);
        next(stage);
        return;
    });
} else {
    next(stage);
}

function next(stage) {
    if (typeof stage.func === "function") {
        stage.func();
    }

    rl.question(color(stage.q) + ` [${Object.keys(stage.answers)}] \n`, function (userInput) {
        // Determine if input is valid
        if (!stage.answers.hasOwnProperty(userInput)) {
            next(stage);
            return;
        }
        // console.log(Object.keys(stage.answers).indexOf(userInput));
        // Go to userInput stage
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
