function getToken(callback) {
    const options = {
        host: "api.twitter.com",
        path: "/oauth2/token",
        method: "POST",
        headers: {
            authorization,
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
    }; // Define request options

    function requestCallback(response) {
        if (response.statusCode != 200) {
        }
    }

    const req = https.request(options, requestCallback); // http requests expect 'request options' and a 'function' to do after the response
}

//

function getTweets(callback) {}

function filterTweets(callback) {}

module.exports = {
    getToken,
    getTweets,
    filterTweets,
};
