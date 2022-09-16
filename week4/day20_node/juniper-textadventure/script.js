///// do not touch /////
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
/*
rl.question("Do you enjoy learning Node.js?", function (answer) {
    if (answer === "yes") {
        console.log("great!");
    }
    rl.close();
});
*/
///// do not touch /////

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
                right: "This was not the right choice. Goodbye!",
            },
        },
        no: "Alright then. Enjoy your day!",
    },
};

//
// Object.keys(story.answers);
// [1, 2].includes(3)

let currQ = story.q;
let currA = story.answers;

next(currQ, currA);

function next(question, answers) {
    rl.question(stage.q, function (userInput) {
        // Determine if input is valid
        // Determine if story has ended
        currQ = currQ[userInput];
        currA = currA[userInput];
        next(currQ, currA);
        rl.close();
    });
    console.log(Object.keys(currA));
}
