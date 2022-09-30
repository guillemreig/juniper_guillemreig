const { readdir } = require("fs");
const { hasUncaughtExceptionCaptureCallback } = require("process");
const { readdir: readdirPromise } = require("fs").promises;

test("test readdir (callback version)", (done) => {
    readdir(__dirname, (err, files) => {
        if (!err) {
            expect(files).toContain("sum.js");
        }
        done();
    });
});
