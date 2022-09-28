// SETUP
const PORT = 8080;

// npm i express
const express = require("express"); // require express
const { get } = require("http");
const app = express(); // create a new instance of express

// require .twitter.js functions
const { getToken, getTweets, filterTweets } = require("./twitter_copy");

// Set static files
app.use(express.static("./ticker"));

// BODY
app.get("/headlinbes.json", (req, res) => {
    getToken(function (error, bearerToken) {
        if (error) {
            console.log("error in getToken", error);
        } else {
            console.log("bearerToken :", bearerToken);
            getTweets(bearerToken, (error, tweets) => {});
        }
    });
});
