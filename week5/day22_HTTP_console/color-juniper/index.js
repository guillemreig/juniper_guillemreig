const chalk = require("chalk");
const http = require("http");
const querystring = require("querystring");

const PORT = 8080;

console.log(`[white,${chalk.red("red")},${chalk.yellow("yellow")},${chalk.green("green")},${chalk.cyan("cyan")},${chalk.blue("blue")},${chalk.magenta("magenta")}]`);

const server = http.createServer((req, res) => {
    req.on("error", (error) => console.log("Error in Request: ", error));
    res.on("error", (error) => console.log("Error in Response: ", error));

    if (req.method === "GET") {
        res.write(`
<!doctype html>
<html>
<title>Colors</title>
<form method="POST">
<body style="background-color:black;">
<input type="text" name="text">
  <select name="color">
    <option value="red">red</option>
    <option value="blue">blue</option>
    <option value="green">green</option>
    <option value="yellow">yellow</option>
    <option value="gray">gray</option>
    <option value="magenta">magenta</option>
    <option value="cyan">cyan</option>
  </select>
  <button type="submit">Go</button>
  </form>
  </body>
</html>
        `);

        res.end();
    } else if (req.method === "POST") {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
        });
        req.on("end", () => {
            const parsedBody = querystring.parse(body); // { text: 'Test text', color: 'cyan' }

            const parsedColor = parsedBody.color; // "cyan"
            const parsedText = parsedBody.text; // "Test text"

            let color; // Empty var where we will store a function

            setColor(parsedColor); // Run the below function, pass 'parsedColor' string as an argument

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
                }
                return;
            } // Now color() is just a function that applies 'chalk' to whatever we write, but using the selected color

            console.log(color(parsedText)); // chalk to console.log the specified text in the specified color

            res.write(`<!doctype html>
<html>
<title>${parsedText}</title>
<body style="background-color:black;">  
<a href="/" style="color:${parsedColor}">${parsedText}</a>
</body>
</html>`); // send a response to write

            res.end(); // End the process
        });
    }
});

server.listen(PORT, console.log(`Listening on port ${PORT}`));
