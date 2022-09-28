// SETUP
const PORT = 8080;

// npm i express
const express = require("express");
const app = express();

// require twitter.js functions
const { getToken, getTweets, filterTweets } = require("./twitterPromise");

const { promisify } = require("util");
const getTweetsPromise = promisify(getTweets);

// Static

app.use(express.static("./ticker"));

// Variables

const screen_nameArr = ["nytimes", "washingtonpost", "TheOnion"];

app.get("/headlines.json", (req, res) => {
    console.log("Requesting headlines!");

    // There are 4 things we want to do
    // 1- get the token
    // 2- with the token, make a request for tweets
    // 3- once we receive the tweets, filter them
    // 4- send filtered tweets to the client as JSON

    getToken
        .then((token) => {
            console.log("token:", token);

            screen_nameArr.forEach((item) => {
                getTweetsPromise(token, item)
                    .then((tweets) => {
                        console.log("filterTweets(tweets) :", filterTweets(tweets));

                        res.json(filterTweets(tweets));
                    })
                    .catch((error) => console.log("Error in getTweetsPromise :", error));
            });
        })
        .catch((error) => console.log("Error in getToken :", error));
});

// INITIALIZATION
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
