module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [['js/vendor/*.js'], 'js/utilities.js', 'js/main.js', 'js/demo.js'],
        dest: 'dist/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'js/*.js']
    },
    svgstore: {
      options: {
        prefix : 'shape-',
        svg: {
          style: 'display: none;',
          viewBox : '0 0 100 100',
          xmlns: 'http://www.w3.org/2000/svg'
        }
      },
      your_target: {
        files: {
          'dist/dist.svg': ['svg/*.svg'],
        }
      },
    },
    jasmine: {
      src: 'dist/starting-point.js',
      options: {
        vendor: [
          'bower_components/jquery/dist/jquery.js',
          'bower_components/jasmine-jquery/lib/jasmine-jquery.js'
        ],
        specs: 'spec/**/*.js'
      }
    },
    watch: {
      js: {
        files: ['<%= jshint.files %>'],
        tasks: ['jshint', 'concat', 'uglify']
      },
      svg: {
        files: ['svg/*.svg'],
        tasks: ['svgstore']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.loadNpmTasks('grunt-svgstore');
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'svgstore']);

};
