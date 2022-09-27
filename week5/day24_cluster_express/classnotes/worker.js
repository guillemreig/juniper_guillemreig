const process = require("process");

console.log(`Checkpoint 2: worker with pid: ${process.pid} is executed`); // Logs each time worker uses this code

// const message = { name: "worker", pid: process.pid };
const message = true;

process.send(message); // Sends the message to primary
