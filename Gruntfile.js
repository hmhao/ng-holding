var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('serve', ['connect:serve', 'watch']);

    grunt.registerTask('dev', [
        'copy:dev'
    ]);

    grunt.registerTask('default', [
        'dev',
        'uglify'
    ]);

    grunt.initConfig({
        copy: {
            dev: {
                files: [{
                    src: './src/ngHolding.js',
                    dest: './examples/ngHolding.js'
                }]
            },
            js: {
                files: [{
                    src: './src/ngHolding.js',
                    dest: './dist/js/ngHolding.js'
                }]
            }
        },
        uglify: {
            js: {
                src: ['./dist/js/ngHolding.js'],
                dest: './dist/js/ngHolding.min.js',
                options: {
                    sourceMap: true
                }
            }
        },
        watch: {
            js: {
                files: 'src/*.js',
                tasks: ['copy'],
                options: {
                    livereload: true
                }
            }
        },
        connect: {
            options: {
                port: 8000,
                hostname: 'localhost'
            },
            serve: {
                options: {
                    middleware: function(connect) {
                        return [
                            mountFolder(connect, '.')
                        ];
                    }
                }
            }
        }
    });
};