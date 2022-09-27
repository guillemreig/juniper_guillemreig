const os = require("os"); // Used to get the number of CPUs
const cluster = require("cluster");

const process = require("process");
const path = require("path");
const { Console } = require("console");

const DEBUG = true;
function log(...log) {
    if (DEBUG) {
        console.log(...log);
    }
}

log("cluster.workers:", cluster.workers); // Empty object

// for (let i = 0, l = os.cpus().length; i < l; i++) {
//     cluster.fork(); // To create a new process you call cluster.fork
// }

if (cluster.isPrimary) {
    log("Checkpoint 1");
    cluster.setupPrimary({
        exec: path.join(__dirname, "worker.js"), // Assigns worker code path
    });

    os.cpus().forEach(() => {
        cluster.fork();
    });

    // log("cluster.workers:", cluster.workers); // Object no longer empty

    for (let worker in cluster.workers) {
        // cluster.workers is an object-like
        cluster.workers[worker].on("exit", (worker) => {
            console.log(worker, "died");
        });

        cluster.workers[worker].on("message", (msg) => {
            console.log("msg:", msg);
        }); // Event listener to worker messages
    }
} else {
    log("child process:", process.pid);
}
