module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            kmc: {
                options: {
                    packages: [
                        {
                            name: 'openjs',
                            path: './assets',
                            charset: 'utf8'
                        }

                    ]
                },
                main: {
                    files: [
                        {
                            expand: true,
                            cwd: "assets/openjs",
                            src: "**/*.js",
                            dest: "assets/openjs",
                            ext: "-min.js"
                        }
                    ]
                }
            },
            clean: {
                build: {
                    src: ['assets/**/*-min.js']
                }
            },
            copy: {
                main: {
                    files: [
                        {expand: true, cwd: 'src/scripts', src: ['**/*.js'], dest: 'build/scripts'} // makes all src relative to cwd
                    ]
                }
            },
            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %>  */\n',
                    beautify: {
                        ascii_only: true
                    }
                },
                openjs: {
                    expand: true,
                    src: "**/*-min.js",
                    cwd: 'assets/openjs',
                    dest: "assets/openjs",
                    ext: '.js'
                },
                base: {
                    expand: true,
                    src: "**/*.js",
                    cwd: 'assets/base',
                    dest: "assets/base",
                    ext: '-min.js'
                },
                widgets: {
                    expand: true,
                    src: "**/*.js",
                    cwd: 'assets/widgets',
                    dest: "assets/widgets",
                    ext: '-min.js'
                }
            },
            cssmin: {
                compress: {
                    expand: true,
                    src: '**/*.css',
                    ext: "-min.css",
                    cwd: "build/stylesheets",
                    dest: "build/stylesheets/"

                }
            },
            concat: {
                foo: {
                    src: ['src/stylesheets/css/*.css'],
                    dest: ['build/stylesheets/combo.css']

                },
                openjs: {
                    expand: true,
                    src: "**/*-min.js",
                    cwd: 'assets/openjs',
                    dest: "assets/openjs",
                    ext: '.js'
                },
                base: {
                    expand: true,
                    src: "**/*.js",
                    cwd: 'assets/base',
                    dest: "assets/base",
                    ext: '-min.js'
                },
                widgets: {
                    expand: true,
                    src: "**/*.js",
                    cwd: 'assets/widgets',
                    dest: "assets/widgets",
                    ext: '-min.js'
                }
            },

            concat: {
                foo: {
                    src: ['src/stylesheets/css/*.css'],
                    dest: ['build/stylesheets/combo.css']
                }

            }


        }

    )
    ;

    grunt.loadNpmTasks('grunt-kmc');


    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadNpmTasks('grunt-kmc');


//    grunt.registerTask('watchall', ['watch']);

// Default task(s).
    grunt.registerTask('default', ['clean', 'kmc', 'uglify']);
    grunt.registerTask('demo', ['clean', 'kmc']);

}
;