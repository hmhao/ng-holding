var mountFolder = function(connect, dir) {
    return connect.static(require('path').resolve(dir));
};
module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('serve', ['connect:serve', 'watch']);

    grunt.registerTask('dev', [
        'copy:dev'
    ]);

    grunt.registerTask('build', [
        'clean',
        'copy:js'
    ]);

    grunt.registerTask('default', [
        'build',
        'uglify'
    ]);

    grunt.initConfig({
        clean: {
            working: {
                src: ['./dist/']
            }
        },
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
        wiredep: {
            app: {
                src: ['./examples/ngHolding.html']
            }
        },
        watch: {
            js: {
                files: 'src/*.js',
                tasks: ['copy:dev'],
                options: {
                    livereload: true
                }
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
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