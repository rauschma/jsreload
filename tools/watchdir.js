#!/usr/bin/env node

var fs = require('fs');
var spawn = require('child_process').spawn;
var path = require('path');
var _ = require("underscore");

var extensions = {
    ".html": 1,
    ".css": 1,
};
var mtimes = {};
var watchers = {};

var dirname = process.argv[2];
traverseFiles(dirname);

function traverseFiles(dir) {
    fs.readdirSync(dir).forEach(function (filename) {
        var absolute = path.resolve(dir, filename);

        var stats = fs.statSync(absolute);
        if (stats.isDirectory()) {
            traverseFiles(absolute);
        } else if (stats.isFile()) {
            if (path.basename(absolute).indexOf(".") !== 0 && path.extname(absolute) in extensions) {
                console.log("WATCH: "+absolute);
                watchFile(absolute);
            }
        }
    });
}

function watchFile(filename) {
    // Most editors trigger a series of events whenever a single file is saved
    // Via debouncing, we only take action after the last event.
    watchers[filename] = fs.watch(filename, _.debounce(handleFileChanges.bind(null, filename), 250));
}

function handleFileChanges(absName, event, filename) {
    // On Mac OS X, filename is always null

    switch (event) {
        case 'rename':
            // Some editors (vi) rename the file when swapping it with the new version
            watchers[absName].close();
            if (fs.existsSync(absName)) {
                watchFile(absName);
            } else {
                // With debouncing, this shouldn’t happen, warn about it
                console.log("STOPPED WATCHING: "+absName);
                return;
            }
            fileChanged(event, absName);
            break;
        case 'change':
            fileChanged(event, absName);
            break;
    }
}

function fileChanged(event, absName) {
    // Check the date of last modification to make sure that there really was a change
    var mtime = +fs.statSync(absName).mtime;
    if (mtime !== mtimes[absName]) {
        mtimes[absName] = mtime;
        console.log(event.toUpperCase()+": "+absName);
        reloadSafari();
    }
}

// Inspiration: http://brettterpstra.com/watch-for-file-changes-and-refresh-your-browser-automatically/
var code = '\
tell application "Safari"\n\
    set mytab to first tab of first window\n\
    tell mytab to do javascript "window.location.reload()"\n\
end tell\n\
';
function reloadSafari() {
    var osa = spawn("osascript", ["-e", code]);
    var out = "";
    var err = "";
    osa.stdout.on('data', function (data) {
        out += data;
    });
    osa.stderr.on('data', function (data) {
        err += data;
    });
    osa.on('exit', function (code) {
        // Ignore stdout (which shows the return value of the AppleScript code)
        if (err.length > 0) {
            console.log("STDERR: "+err);
        }
        console.log("RELOADED");
    });
}
