// Event emitters
const events = require("events");

function Landscape() {}

Landscape.prototype = new events.EventEmitter();

const mountain = new Landscape();

const dog = {
    name: "Doug",
    noticeSquirrel: function (location) {
        console.log(`Turning face to face ${location}`);
        console.log("Squirrel!");
    },
};

// Tell the dog to listen for future squirrel events
mountain.on("Squirrel", dog.noticeSquirrel);
//           event          action

// Fire a 'Squirrel' event
mountain.emit("Squirrel", "north-west");
mountain.emit("Squirrel", "west");
//              event     argument
