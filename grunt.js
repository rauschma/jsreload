module.exports = function(grunt) {

    grunt.initConfig({
        asciidoc: {
            files: [ '**/*.asc' ]
        },
        watch: {
            files: '<config:asciidoc.files>',
            tasks: 'asciidoc reloadsafari'
        },
    });

    // Default task.
    grunt.registerTask('default', 'asciidoc');
    grunt.loadTasks('tasks');
};
