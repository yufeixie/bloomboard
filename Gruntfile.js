module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      files: ['Gruntfile.js', 'public/**/*.js', 'test/**/*.js', 'app.js', '!public/js/lib/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    'node-inspector': {
      dev: {
        options: {
          'web-port': 4000,
          'web-host': 'localhost',
          'debug-port': 5858
        }
      }
    },
    nodemon: {
      dev: {
        ignoredFiles: ['README.md', 'node_modules/**', 'public/**'],
        options: {
          nodeArgs: ['--debug']
        }
      }
    },
    concurrent: {
      dev: {
        tasks: ['nodemon', 'node-inspector', 'watch'],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    karma: {
      dev: {
        options: {
          files: ['public/js/lib/angular/angular.min.js', 'public/js/lib/angular/angular-mocks.js', 'public/js/lib/*.js', 'public/js/*.js', 'test/client/**/*.js'],
          singleRun: true,
          autoWatch: false,
          browsers: ['PhantomJS'],
          frameworks: ['jasmine']
        },
      },
      travis: {
        options: {
          files: ['public/js/lib/angular/angular.min.js', 'public/js/lib/angular/angular-mocks.js', 'public/js/lib/*.js', 'public/js/*.js', 'test/client/**/*.js'],
          singleRun: true,
          browsers: ['PhantomJS'],
          frameworks: ['jasmine']
        }
      }
    },
    jasmine_node: {
      specNameMatcher: "spec", // load only specs containing specNameMatcher
      projectRoot: "test/server",
      requirejs: false,
      forceExit: true,
    },
    watch: {
      files: ['<%= jshint.files %>'],
      tasks: []
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-jasmine-node');
  grunt.loadNpmTasks('grunt-node-inspector');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('test', ['jasmine_node', 'karma:dev']);

  grunt.registerTask('travis', ['jasmine_node', 'karma:travis']);

  grunt.registerTask('default', ['concurrent:dev']);

};