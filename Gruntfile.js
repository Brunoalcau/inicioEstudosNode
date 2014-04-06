module.exports = function(grunt){
	'use strict';

	grunt.initConfig({
		pkg:grunt.file.readJSON('package.json'),
		connect:{
			server:{
  				options:{
  					port:9000,
  					hostname:'localhost',
  					keepalive:true
  				}
			}
		},
		jshint:{
			all:[
				'Gruntfile.js',
				'controllers/**/*.js',
				'middleware/**/*.js',
				'sockets/**/*.js',
				'routes/**/*.js',
				'models/**/*.js'
			]
		}
	});

	grunt.loadNpmTasks('grunt-contrib-connect');	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('teste',['jshint:all']);
	grunt.registerTask('createserver',['connect:server']);
};