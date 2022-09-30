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

const screen_nameArr = ["nytimes", "washingtonpost", "dwnews", "KyivIndependent", "KyivPost", "TheStudyofWar"];

app.get("/headlines.json", (req, res) => {
    console.log("Requesting headlines!");

    getToken // 1- get the token
        .then((token) => {
            console.log("token:", token);

            Promise.all(screen_nameArr.map((item) => getTweetsPromise(token, item))) // 2- with the token, make a request for tweets
                .then((results) => {
                    console.log("filterTweets(results) :", filterTweets(results));

                    res.json(filterTweets(results)); // 3- once we receive the tweets, filter them // 4- send filtered tweets to the client as JSON
                })
                .catch((error) => console.log("Error in getTweetsPromise :", error));
        })
        .catch((error) => console.log("Error in getToken :", error));
});

// INITIALIZATION
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
