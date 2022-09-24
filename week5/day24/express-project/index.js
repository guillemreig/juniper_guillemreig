// know wich PORT I want to run on
const PORT = 8080;

// require express
const express = require("express");

// Create a new instance of express
const app = express();

const path = require("path");

/*
res.send() // Sends snippets of text / html
res.sendFile() // Sends an entire file
res.redirect() // Redirects request to another url
res.json() // Sends JSON responses
res.render() // 
*/

// ============== MIDDLEROUTES ==============
// Middleroutes are functions that have access to our request and response objects
// and they can intercept the cycle of request and response
// i.e. maybe we want to parse incoming request bodies that are of urlencoded form type

// Built-in middleware
app.use(express.urlencoded({ extended: false }));

// Built-in middleware to serve static files
// express.static gets given path to all static files
app.use(express.static(path.join(__dirname, "public")));

// If you want to serve your atatic files on a subpath
// app.use("/public", express.static(path.join(__dirname, "public")));

// Pass cookie-parser to app.use
app.use(cookieParser());

// Our very own middleware
app.use((req, res, next) => {
    console.log("----------");
    console.log(`accessed at:\t${new Date(Date.now().toString())}`);
    console.log(`req.method:\t${req.method}\nreq.url:\t${req.url}`);
    console.log("----------");
    console.log("What's in my usercookies:", req.cookies); // read the cookies
    next(); // exit a middleware
}); // This runs for every request written after the middleware

// ============== ROUTES ===============
// .get() method of app takes a ropute to handle and a function to execute
app.get("/", (req, res) => {
    // set a cookie
    res.cookie("isExpressGreat", true);
    res.send("<h1>express is wonderful</h1>");
});

app.get("/about", (req, res) => {
    res.cookie("consent", true);
    res.sendFile(__dirname + "/index.html");
});

app.get("/non-consent", (req, res) => {
    res.cookie("consent", "");
});

app.get("/about", (req, res) => {
    console.log("req.query: ", req.query);
    res.sendFile(__dirname + "/index.html");
});

app.get("/about/:name", (req, res) => {
    console.log("req.params: ", req.params.name);
    res.send(`<h1>This is the /about/${req.params.name} page</h1>`);
});

app.get("/add-cute-animals", (req, res) => {
    res.sendFile(__dirname + "/addCute.html");
});

app.post("/add-cute-animals", (req, res) => {
    console.log("req.body", req.body);
    res.send(`<h1>The animal you submitted was ${req.body.animal} and the cuteness score was ${req.body.score}</h1>`);
});

app.get("/all-my-secrets", (req, res) => {
    console.log("Have you consented to keeping them secret?", req.cookies.consent);
    if (req.cookies.consent) {
        res.send(`<h1>here are all my secrets</h1>`);
    } else {
        res.redirect("/");
    }
});

// To get my server running
app.listen(PORT, () => {
    console.log(`Express project listening on port: ${PORT}`);
});
