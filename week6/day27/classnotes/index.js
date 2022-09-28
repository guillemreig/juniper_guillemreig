// SETUP
const PORT = 8080;

// npm i express
const express = require("express");
const app = express();

// require twitter.js functions
const { getToken, getTweets, filterTweets } = require("./twitter");

app.use(express.static("./ticker"));

app.get("/headlines.json", (req, res) => {
    console.log("Requesting headlines!");

    // There are 4 things we want to do
    // 1- get the token
    // 2- with the token, make a request for tweets
    // 3- once we receive the tweets, filter them
    // 4- send filtered tweets to the client as JSON

    getToken(function (error, bearerToken) {
        // 1- get the token
        if (error) {
            console.log("Error in getToken:", error);
            return;
        }
        console.log("bearerToken :", bearerToken);

        // 2- with the token, make a request for tweets
        getTweets(bearerToken, (error, tweets) => {
            if (error) {
                console.log("Error in getTweets:", error);
                return;
            }
            console.log("tweets :", tweets);

            // 3- once we receive the tweets, filter them
            const filteredTweets = filterTweets(tweets);

            console.log("filteredTweets :", filteredTweets);
            // 4- send filtered tweets to the client as JSON
            res.json(filteredTweets);
        });
    });
});

// INITIALIZATION
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
