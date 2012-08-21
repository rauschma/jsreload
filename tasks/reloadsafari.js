module.exports = function(grunt) {

    var spawn = require('child_process').spawn;

    grunt.registerTask('reloadsafari', 'Reloads the first tab of the first window of Safari', function() {
        var taskDone = this.async();
        reloadSafari(taskDone);
    });

    // Inspiration: http://brettterpstra.com/watch-for-file-changes-and-refresh-your-browser-automatically/
    var code = '\
    tell application "Safari"\n\
        set mytab to first tab of first window\n\
        tell mytab to do javascript "window.location.reload()"\n\
    end tell\n\
    ';
    function reloadSafari(callback) {
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
                grunt.log.error("STDERR: "+err);
            }
            callback();
        });
    }

};




