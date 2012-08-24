module.exports = function(grunt) {

    var jsreload = require('jsreload');

    grunt.registerTask('reloadsafari', 'Reloads the first tab of the first window of Safari', function() {
        var taskDone = this.async();
        jsreload.runReloadSafari(taskDone);
    });
};
