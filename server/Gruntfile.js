module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
            all: ['Gruntfile.js', 'routes/**/*.js']
        },

        nodeunit: {
            all: ['test/**/*_test.js'],
            options: {
                reporter: 'verbose',
                reporterOptions: {
                    output: 'build/tests'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Create my own tasks.
    grunt.registerTask('check', ['jshint', 'nodeunit']);
};
