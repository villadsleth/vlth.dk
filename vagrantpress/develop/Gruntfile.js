module.exports = function (grunt) {
    "use strict";
    require('load-grunt-tasks')(grunt);
    var timer = require("grunt-timer");
    timer.init(grunt, { ignoreAlias: ["watch"], totalOnly: false, deferLogs: false, color: "white" });
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        /**
         * Directory variables
         */
        app : {
            root : '../wordpress/wp-content/themes/<%= pkg.name %>',
            js : '<%= app.root %>/js',
            css : '<%= app.root %>',
            assets : '<%= app.root %>/assets'
        },
        src : {
            bower : 'bower_components',
            node : 'node_modules',
            root : 'src',
            js : '<%= src.root %>/js',
            sass : '<%= src.root %>/sass',
            html : '<%= src.root %>/templating',
            assets : '<%= src.root %>/assets',
            angular : '<%= src.bower %>/angular',
            lodash : '<%= src.node %>/lodash',
            bootstrap : '<%= src.node %>/bootstrap/dist/js',
            jquery : '<%= src.node %>/jquery/dist',
            temp : '<%= src.root %>/temp',
            foundation : '<=% src.bower =>/foundation/js',
            images : '<%= src.assets %>/images'
        },

        /**
         * concat setup
         */
        concat: {
            options : {
                sourceMap : true,
            },
            vendor: {
                src: [
                    //JQUERY 2.1.3 // wordpress admin page refix
                    '<%= src.jquery %>/jquery.js',
                    '<%= src.node %>/angular/angular.js',
                    '<%= src.node %>/angular-ui-router/release/angular-ui-router.js',
                    '<%= src.node %>/angular-sanitize/angular-sanitize.js',
                    '<%= src.node %>/angular-animate/angular-animate.js',
                    '<%= src.bootstrap %>/bootstrap.js',
                    '<%= src.lodash %>/lodash.js',
                    '<%= src.node %>/fullpage.js/dist/jquery.fullpage.js',
                    '<%= src.node %>/fullpage.js/dist/jquery.fullpage.extensions.min.js',
                    '<%= src.node %>/fancybox/dist/js/jquery.fancybox.js'
                    // '<%= src.node %>/crypto-js/crypto-js.js',
                ],
                dest: '<%= app.js %>/vendor.js'
            },
            dist: {
                src: [
                    '<%= src.js %>/app.js',
                    '<%= src.js %>/app/services.js'
                ],
                dest: '<%= app.js %>/app.js'
            },
        },
         clean: {
             temp : ['<%= src.temp %>']
         },
         jshint: {
            all: ['Gruntfile.js', '<%= src.js %>/*.js', '<%= src.js %>/**/*.js']
          },
        /**
         * uglify setup
         */
        uglify: {
            options: {
                mangle: false,
                sourceMap: true,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            vendor: {
                files: {
                    '<%= app.js %>/vendor.min.js': '<%= app.js %>/vendor.js',
                }
            },
            app: {
                files: {
                    '<%= app.js %>/app.min.js': '<%= app.js %>/app.js'
                }
            }
        },

        /**
         * SASS setup
         */
        sass: {
            dist: {
                options: {
                    banner: '/*\nTheme Name: <%= pkg.name %>\nTemplate: plant_boilerplate\nVersion: <%=pkg.version %>\nDescription: <%= pkg.description%>\nAuthor: <%= pkg.author %>\n*/',
                    style: 'compressed'
                },
                files: {
                    '<%= app.css %>/style.css': '<%= src.sass %>/style.scss',
                }
            },
            vendor: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= app.css %>/vendor.css': '<%= src.sass %>/vendor.scss'
                }
            },
        },
        cssmin: {
            options: {
              mergeIntoShorthands: false,
              roundingPrecision: -1,
              sourceMap: false
            },
            target: {
              files: {
                '<%= app.css %>/style.min.css': ['<%= app.css %>/style.css'],
                '<%= app.css %>/vendor.min.css': ['<%= app.css %>/vendor.css']
              }
            }
        },
        modernizr: {
            dist: {
                "devFile" : "<%= src.bower %>/modernizr/modernizr.js",
                "outputFile" : "<%= app.js %>/modernizr-custom.js",
                "extra" : {
                    "shiv" : false,
                    "load" : false,
                    "mq" : false,
                    "cssclasses" : false
                },
                "extensibility" : {
                    "addtest" : false,
                    "prefixed" : false,
                    "teststyles" : false,
                    "testprops" : false,
                    "testallprops" : false,
                    "hasevents" : false,
                    "prefixes" : false,
                    "domprefixes" : false
                },
                "uglify" : false,
                "parseFiles" : false,
                "files" : {
                    "src": ['<%= app.css %>/style.css', '<%= app.js %>/site.min.js']
                }
            }
        },
        copy: {
            themeTemplates: {
                expand : true,
                cwd : '<%= src.html %>',
                src : ['**', '**/*'],
                dest : '<%= app.root %>'
            },
            json: {
                expand : true,
                cwd : '<%= src.assets %>',
                src : ['*.json', '**/*.json', '**/*.pdf'],
                dest : '<%= app.assets %>'
            },
            fonts: {
                expand : true,
                cwd : '<%= src.node %>',
                src : ['**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2'],
                dest : '<%= app.assets %>/fonts'
            }
        },
        imagemin: {                          // Task
            dynamic: {                         // Another target
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: '<%= src.images %>/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: '<%= app.assets %>/images'                  // Destination path prefix
                }]
            }
        },
        svgmin: {
            options: {
                plugins: [
                    {
                        removeViewBox: false
                    }, {
                        removeUselessStrokeAndFill: false
                    }, {
                        convertPathData: {
                            straightCurves: false
                        }
                    }
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= src.assets %>/svg/',
                    src: ['**/*.svg'],
                    dest: '<%= app.assets %>/svg/',
                    ext: '.svg'
                }]
            }
        },

        /**
         * Watch setup
         */
        watch: {
            jsfiles : {
                options : {
                    livereload : 35729
                },
                files: [
                    '<%= src.js %>/*.js',
                    '<%= src.js %>/**/*.js',
                    '<%= src.js %>/**/**/*.js'
                ],
                tasks: ['js_build']
            },
            sassfiles: {
                options : {
                    livereload : 35729
                },
                files: ['<%= src.sass %>/**/*.scss'],
                tasks: ['css_build']
            },
            sassvendor: {
                options : {
                    livereload : 35729
                },
                files: ['<%= src.bower %>/**/*.scss'],
                tasks: ['css_vendor']
            },
            templatefiles: {
                options : {
                    livereload : 35729
                },
                files: ['<%= src.html %>/**'],
                tasks: ['template_build']
            },
            assets: {
                options : {
                    livereload : 35729
                },
                files: ['<%= src.assets %>/**/*'],
                tasks: ['assets_build']
            }
        },

        /**
         * Notify setup
         */
        notify_hooks: {
            options: {
                enabled: true,
                title: "<%= pkg.name %>" // defaults to the name in package.json, or will use project directory's name
            }
        },
        notify: {
            all : {
                options : {
                    message : 'APP build'
                }
            },
            css: {
                options: {
                    message: 'CSS build',
                }
            },
            css_vendor: {
                options: {
                    message: 'CSS Vendor build',
                }
            },
            js: {
                options: {
                    message: 'JS build',
                }
            },
            js_vendor: {
                options: {
                    message: 'JS Vendor build',
                }
            },
            templates: {
                options: {
                    message: 'Templates build',
                }
            },
            assets: {
                options: {
                    message: 'Assets build',
                }
            }
        }
    });


    grunt.registerTask('template_build', ['copy:themeTemplates', 'notify:templates']);
    grunt.registerTask('css_build', ['sass:dist', 'cssmin', 'notify:css']);
    grunt.registerTask('css_vendor', ['sass:vendor', 'cssmin', 'notify:css_vendor']);
    grunt.registerTask('js_build', [ 'js_hint', 'concat:dist', 'uglify:app', 'notify:js']);
    grunt.registerTask('js_vendor', ['concat:vendor', 'uglify:vendor', 'notify:js']);
    grunt.registerTask('first_build', ['js_hint', 'concat', 'uglify', 'sass', 'cssmin', 'modernizr', 'copy', 'clean', 'imagemin', 'svgmin', 'notify:all', 'watch']);
    grunt.registerTask('assets_build', ['imagemin', 'svgmin', 'copy:json', 'notify:assets']);
    grunt.registerTask('js_hint', ['jshint']);
    grunt.registerTask('default', ['first_build']);
};
