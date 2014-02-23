module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      files: ['public/js/**/*.js', '!**/*.min.js', '!public/js/bower_components/**/*.js']  
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
            async: 'lib/async',
            infinitescroll: 'lib/jquery.infinitescroll.min',
            requireLib: 'bower_components/requirejs/require'
          },
          include: ['requireLib'],
          out: 'public/js/dist/main.min.js'
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
  
  grunt.registerTask('default', ['sass', 'jshint', 'requirejs']);
};