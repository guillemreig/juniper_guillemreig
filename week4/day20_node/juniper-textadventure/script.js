///// do not touch /////
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const chalk = require("chalk");
///// do not touch /////

// Select name

// Color choice
let color;
let colorSet;

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
            colorSet = true;
    }
    return;
}

// Player stats and items

const player = {
    name: "will",
    hp: 100,
    strength: 1,
    intelligence: 1,
    charisma: 1,
};

const items = {
    gold: 10,
    map: "A map of the region",
};

// Story vars

let brooch;

// Story

const intro0 = {
    func: function () {},
    s: `\nWelcome to the Land of Heinlein! \n
This is a story of a young adventurer in a land where mythology is more history than myth. This is your story.`,
    q: "Would you like to play?",
    answers: {
        yes: () => next(intro1),
        no: () => {
            console.log(color("Alright then. Enjoy your day!"));
            rl.close();
        },
    },
};

const intro1 = {
    func: function () {
        if (brooch) {
        }
    },
    s: `\nAlthough your journey began some days ago, it was not until you were 
crossing the forest near ${chalk.cyanBright("Perthos")} that your choices 
began to shape your future.

It was past sunset that you were still walking through the dark forest. 
The journey took longer than expected and the darkness caught you off guard.
Luckily, you shouldn't be far from the nearest Inn.

At some point you reached a fork in the road that didn't appear on your 
${chalk.greenBright("map")}, and you couldn't see any sign in the dark.

${chalk.yellow("[Tip: You can check your inventory by typing 'items' at any moment.]")}`,
    q: "You are alone in a dark forest and facing a fork in the road. Which direction do you turn?",
    answers: {
        right: () => next(intro2),
        left: () => next(intro3),
    },
};

const intro2 = {
    func: function () {},
    s: `\nAfter walking for a while the path turns into a rocky trail, and you know for a fact
that the path that you were supposed to take is regularly used by travelers on horse.`,
    q: "This was not the way...",
    answers: {
        "go back": () => {
            delete intro1.answers.right;
            brooch = true;
            console.log(`\nJust as you turn to go back to the fork you notice something shining in the ground.
It is a nicely crafted ${chalk.greenBright("brooch")}. You put it in your pocket.`);
            items.brooch = "A brooch found in the forest floor.";
            next(intro1);
        },
    },
};

const intro3 = {
    func: function () {},
    s: `\nYou take the left path and continue walking in the dark.
    
After some time, you notice a distant light in the path ahead. You are not able to recognise what it is, 
but it definitely isn't the light of another lamp, or torch. You recognise, though, that it's moving, 
fast, and towards you.

${chalk.yellow("[Tip: You can check your stats by typing 'stats' at any moment.]")}`,
    q: "What will you do?",
    answers: {
        fight: () => {
            player.strength++;
            console.log(`You are unarmed, so you go grab a big stick on the side of the path and ready yourself.`);
            next(intro4);
        },
        hide: () => {
            player.intelligence++;
            console.log(`You don't know wether you can fight or outrun the light, so you decide to hide and let it pass by.`);
            next(intro4);
        },
    },
};

const intro4 = {
    func: function () {
        if (brooch) {
            intro5.answers["show him the brooch"] = () => {
                player.charisma++;
                console.log(player);
                next(intro6);
            };
        }
    },
    s: `But before you can do it the running light speaks.
    
${chalk.red(`Lionel!`)}, called the light.

You turn around and take another look at the flying light, and you notice that behind it is
the illumined silhouette of an adult bearded man, wearing a long crimson tunic whose golden ornaments
shine faintly in the dark.

The man eases his pace after noticing you, but still noticeably in a hurry aproaches you while catching 
his breath. It is then that you realise that this man must be a wizard, and the light orb is his.

${chalk.red(`You!`)}, says the man. ${chalk.red(`Did you see a young man dressed in green on the way here? Answer, quick!`)}`,
    q: "You did not.",
    answers: {
        no: () => {
            console.log(`\nYou can briefly see the concern in the mage's eyes.`);
            next(intro5);
        },
        "why do you ask?": () => {
            console.log(`\nThe wizard is dumbfounded by your non-answer.
            
${chalk.red("This is an emergency! Did you see him or not?")}, he asks again.`);
            delete intro4.answers["why do you ask?"];
            next(intro4);
        },
    },
};

const intro5 = {
    func: function () {},
    s: `\n${chalk.red(`Damn it!`)}, the mage curses, then looks around as if thinking what to do.
    
${color(`What's going on?`)}, you ask the wizard, clueless about the situation.

The mage then looks at you dead in the eye.

${chalk.red(`A manticore has been spotted in this forest`)}, he says. ${chalk.red(`Just as my assistant was looking for herbs.`)}

Manticores are no joke. They are monsters, and unlike animals they are driven by an unnatural insatiable bloodlust.`,
    q: "At this moment, the image of the path fork comes to your mind.",
    answers: {
        "mention the fork": () => next(intro6),
    },
};

const intro6 = {
    func: function () {},
    s: `\nIntroduction text.`,
    q: "Question?",
    answers: {
        yes: () => next(intro1),
        no: () => {
            console.log(color("Alright then. Enjoy your day!"));
            rl.close();
        },
    },
};

const template = {
    func: function () {},
    s: `\nIntroduction text.`,
    q: "Question?",
    answers: {
        yes: () => next(intro1),
        no: () => {
            console.log(color("Alright then. Enjoy your day!"));
            rl.close();
        },
    },
};

// Choose name
if (process.argv[3]) {
    player.name = process.argv[3];
}

// Choose color
if (colorSet) {
    rl.question(`\nDo you have a favorite color?:\n[No,${chalk.red("red")},${chalk.yellow("yellow")},${chalk.green("green")},${chalk.cyan("cyan")},${chalk.blue("blue")},${chalk.magenta("magenta")}]\n`, function (userInput) {
        setColor(userInput);
        next(intro0); // Start the game
        return;
    });
} else {
    next(intro0); // Start the game
}

// Game function
function next(stage) {
    // Write the stage story only once
    stage.s && console.log(stage.s);
    delete stage.s;

    // If stage has an opening function, execute it
    if (typeof stage.func === "function") {
        stage.func();
    }

    // readline question function
    rl.question(color(stage.q) + ` [${Object.keys(stage.answers)}] \n`, function (userInput) {
        // Check items and stats
        if (userInput == "items") {
            console.log(items);
            next(stage);
            return;
        } else if (userInput == "stats") {
            console.log(player);
            next(stage);
            return;
        }
        // Determine if input is valid
        if (!stage.answers.hasOwnProperty(userInput)) {
            next(stage);
            return;
        }
        // Go to userInput stage
        stage.answers[userInput]();
    });
}
