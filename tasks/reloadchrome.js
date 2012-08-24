module.exports = function(grunt) {

    var jsreload = require('jsreload');

    grunt.registerTask('reloadchrome', 'Reloads the first tab of the first window of Google Chrome', function() {
        var taskDone = this.async();
        jsreload.runReloadChrome(taskDone);
    });
};
