// XMLHttpRequest
// XMLHttpRequest objects are used to make HTTP requests for data
// There is no requirement that the data be XML and it is usually more convenient for it to be in JSON format

// Making requests
// 1st, we crete a new xhr object. Once we have the object we can start making requests
var xhr = new XMLHttpRequest();

// 2nd, you call the open method to initialize the request.
xhr.open("GET", "https://api.agify.io/?name=merle");

// The first parameter is the HTTP method (e.g., GET, POST, PUT, DELETE, etc.) to use
// The second parameter is the url
// The third parameter is a boolean indicating whether or not the request should be asynchronous. It defaults to 'true' (recommended)
// The fourth and fifth parameters are for specifying a username and password if the url requires it

// 3rd, provide headers (optional)
xhr.setRequestHeader("Accept", "text/plain");

// 4th. we get send out request
xhr.send();

// Handling responses
// 1st. To actually get a hold of our request, we want to listen for when our readystate changes
xhr.addEventListener("readystatechange", function () {
    if (xhr.readyState != XMLHttpRequest.DONE) {
        //The constants are UNSENT, OPENED, HEADERS_RECEIVED, LOADING, and DONE
        return; // if we reach any other state than DONE exit this function!
    }
    // After a request completes you will want to check the status property
    var status;

    // There are situations in which merely accessing the status property can cause an exception, so you will want to do it with a try...catch
    try {
        status = xhr.status;
    } catch (e) {
        // Handle possible error
        return;
    }

    // The request may not have completed with a 200 (OK)
    if (status != 200) {
        // Handle possible error
        return;
    }

    // Once you know you have a successful response, you can do something with the content of it
    // You can access the data using the responseText property. The value is a 'string'
    var responseText = xhr.responseText;

    // do something with responseText
    // If the string is valid JSON, convert it into a Javascript object using JSON.parse.
    var data;

    try {
        data = JSON.parse(responseText); // Convert from JSON to JS
    } catch (e) {
        // Handle the possible error
        console.log("not JSON!", e);
        return;
    }

    console.log("data from ageify:", data); // Check data in console log
    console.log("name", data.name);
    console.log("age", data.age);

    $("#results").html(data.name + " is " + data.age + " years old"); // Use data
});

// CORS (cross-origin resource sharing)
// For a long time it was impossible for a page to use XMLHttpRequest to request a resource from a domain other than the one from which it was served because of the same-origin policy.
// These days CORS (cross-origin resource sharing) is pretty well supported by browsers.

// AJAX
// jQuery.ajax() method takes a lot of the tedium out of making ajax requests

$.ajax({
    url: "https://catfact.ninja/fact",
    method: "GET",
    data: {
        limit: 20,
    },
    // The data property in the options passed to $.ajax is converted into a query string for GET requests.
    // For POST requests it becomes the body of the request.

    success: function (data) {
        console.log("Here are some fun cat facts:", data);
    },
});

// There are many other fields you can add to the options you pass to $.ajax.
// For example, you can add an error handler, specify the content type of the body of the request, and set request headers.

// jQuery provides shorthand methods for making common types of requests.
// For example, the following is equivalent to the $.ajax call above.

$.get("/users", { limit: 20 }, function (data) {
    console.log(data);
});

// requesting data from our data.json
(function () {
    $.ajax({
        url: "data.json",
        method: "GET",
        success: function (dataResponse) {
            // console.log("dataResponse", dataResponse);
            var myHtml = "";
            console.log("myHTML", myHtml);
            for (var i = 0; i < dataResponse.length; i++) {
                console.log("dataResponse[i]", dataResponse[i]);
                var city = "<h1>" + dataResponse[i].city + "</h1>";
                myHtml += city;
            }
            $("#results").html(myHtml);
        },
        error: function (err) {
            console.log("error in ajact to data.json", err);
        },
    });
})();
