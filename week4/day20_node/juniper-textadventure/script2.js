///// do not touch /////
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
///// do not touch /////

// Color choice

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

// Story

let intro0 = {
    func: function () {},
    s: `\nWelcome to the Land of Heinlein! \n
    This is a story of a young adventurer in a land where mythology is more history than myth. This is your story.`,
    q: "Would you like to play?",
    answers: {
        yes: function () {
            next(intro1);
        },
        no: "Alright then. Enjoy your day!",
    },
};

let intro1 = {
    func: function () {
        if (brooch) {
            console.log(`Just as you turn to go back to the fork \
you notice something shining in the ground. \
It is a nicely crafted ${chalk.green("brooch")}. \
You put it in your pocket.`);
        }
    },
    s: `\nAlthough your journey began some days ago, it was not until you were 
crossing the forest near ${chalk.cyan("Perthos")} that your choices 
began to shape your future.

It was past sunset that you were still walking through the dark forest. 
The journey took longer than expected and the darkness caught you off guard.
Luckily, you shouldn't be far from the nearest Inn.

At some point you reached a fork in the road that didn't appear on your 
${chalk.green("map")}, and you couldn't see any sign in the dark.

${chalk.yellow("[Tip: You can check your inventory by typing 'items' at any moment.]")}`,
    q: "You are alone in a dark forest and facing a fork in the road. Which direction do you turn?",
    answers: {
        left: function () {},
        right: function () {},
    },
};

const player = {
    name: "will",
};

const items = {
    map: "A map of the region",
};

next(intro0);

let brooch;

// Game function
function next(stage) {
    if (typeof stage.func === "function") {
        stage.func();
    }
    stage.s && console.log(stage.s);

    delete stage.s;

    rl.question(color(stage.q) + ` [${Object.keys(stage.answers)}] \n`, function (userInput) {
        // Check items
        if (userInput == "items") {
            console.log(items);
            next(stage);
            return;
        }

        // Determine if input is valid
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
