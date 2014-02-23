module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['public/js/**/*.js', '!**/*.min.js']  
    },
    
    requirejs: {
      dist: {
        options: {
          baseUrl: 'public/js',
          name: 'main',
          paths: {
            jquery: 'empty:',
            underscore: 'empty:',
            backbone: 'empty:',
            async: 'lib/async'
          },
          out: 'public/js/main.min.js'
        }
      }
    },
    
    sass: {
      dist: {
        options: {
          style: 'compressed'  
        },
        files: {
          'public/css/styles.min.css': ['public/css/scss/main.scss']  
        }
      }
    },
    
    watch: {
      js: {
        tasks: ['jshint'],
        files: ['<%= jshint.files %>']
      },
      sass: {
        tasks: ['sass'],
        files: ['public/css/scss/*.scss']
      }
    }
  });
  
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
};