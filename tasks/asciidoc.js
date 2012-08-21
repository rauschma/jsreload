module.exports = function(grunt) {

    var spawn = require('child_process').spawn;

    grunt.registerTask('asciidoc', 'Invoke asciidoc on all files', function() {
        var taskDone = this.async();

        // Simple configuration handling for now, we can always get more sophisticated in the future
        this.requiresConfig(['asciidoc', 'files']);
        var filePatterns = grunt.config(['asciidoc', 'files']);
        var files = grunt.file.expandFiles(filePatterns);
        files.forEach(function (file) {
            runAsciiDoc(file, maybeFinished);
        });
        var callCount = 0;
        function maybeFinished() {
            callCount++;
            if (callCount === files.length) {
                taskDone();
            }
        }
    });

    function runAsciiDoc(file, callback) {
        var asciiDoc = spawn("asciidoc", [file]);
        var out = "";
        var err = "";
        asciiDoc.stdout.on('data', function (data) {
            out += data;
        });
        asciiDoc.stderr.on('data', function (data) {
            err += data;
        });
        asciiDoc.on('exit', function (code) {
            if (out.length > 0) {
                grunt.log.write("STDOUT: "+out);
            }
            if (err.length > 0) {
                grunt.log.error("STDERR: "+err);
            }
            callback();
        });
    }

};
