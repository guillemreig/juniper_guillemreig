const https = require("https");

const { twitterKey, twitterSecret } = require("./secrets");

const authorization = `Basic ${Buffer.from(twitterKey + ":" + twitterSecret).toString("base64")}`;
console.log("authorization :", authorization);

module.exports.getToken = function (callback) {
    // Define where the request is going to be made
    const options = {
        host: "api.twitter.com",
        path: "/oauth2/token",
        method: "POST",
        headers: {
            authorization,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    };

    const callbackToken = (resp) => {
        if (resp.statusCode != 200) {
            callback(new Error(resp.statusCode));
            return;
        } else {
            let body = "";
            resp.on("data", (chunk) => (body += chunk));
            resp.on("end", () => {
                let parsedBody = JSON.parse(body);
                callback(null, parsedBody.access_token);
            });
        }
    };

    const req = https.request(options, callbackToken);

    req.end("grant_type=client_credentials");
};

module.exports.getTweets = function (token, callback) {
    const options = {
        host: "api.twitter.com",
        path: "/1.1/statuses/user_timeline.json?screen_name=nytimes&count=20",
        method: "GET",
        headers: {
            Authorization: "Bearer " + token,
        },
    };

    const callbackTweets = (resp) => {
        if (resp.statusCode != 200) {
            callback(new Error(resp.statusCode));
            return;
        } else {
            let tweets = "";
            resp.on("data", (chunk) => {
                tweets += chunk;
            });
            resp.on("end", () => {
                callback(null, JSON.parse(tweets));
            });
        }
    };

    const req = https.request(options, callbackTweets);

    req.end();
};

module.exports.filterTweets = function (rawTweets) {
    rawTweets.forEach((item) => {
        console.log("item.text :", item.text);
        console.log("item.entities.urls.length :", item.entities.urls.length);
    });

    const filteredArr = rawTweets.filter((item) => item.entities.urls.length == 1);

    const shortArr = filteredArr.slice(0, 7);

    const jsonObj = [];

    shortArr.forEach((item) => {
        jsonObj.push({
            text: item.text.split("https://")[0],
            url: item.entities.urls[0].url,
        });
    });

    return jsonObj;
};
