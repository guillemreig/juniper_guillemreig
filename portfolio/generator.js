/////////// do not touch ////////////
Handlebars.templates = Handlebars.templates || {};

var templates = document.querySelectorAll('script[type="text/x-handlebars-template"]');

templates.forEach(function (script) {
    Handlebars.templates[script.id] = Handlebars.compile(script.innerHTML);
});
/////////// do not touch ////////////

const fs = require("fs"); // Require 'fs' module
const path = require("path"); // Require 'path' module

const filePath = path.join(__dirname, "projects");

function htmlGenerator(response, dirPath) {
    dirContents = fs.readdirSync(dirPath, { withFileTypes: true });
    console.log(dirContents);

    response.write(
        `
                <!doctype html>
                    <html>
                        <title>Hello World!</title>
                        <p>Hello World!</p>
                    </html>
            ` + dirContents[1].name
    );

    response.write(
        `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Projects</title>
        <!-- <link rel="stylesheet" href="style.css" /> -->
    </head>
    <body>
        <div class="projects-info"></div>

        <script id="projectsId" type="text/x-handlebars-template">
            {{#dirContents}}
                <ul>
                    {{#name}}
                    <li>{{.}}</li>
                    {{/name}}
                </ul>
            {{/dirContents}}
        </script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.7/handlebars.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.1.js"></script>
        <script src="script.js"></script>
    </body>
</html>`
    );
}

$(".projects-info").html(Handlebars.templates.projectsId(dirContents));

module.exports = {
    htmlGenerator,
};
