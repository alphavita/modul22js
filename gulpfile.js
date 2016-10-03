var gulp = require('gulp');
var browserSync = require('browser-sync');
var watch = require('gulp-watch');
var babel = require('gulp-babel');
var rename = require("gulp-rename");



gulp.task('webserver', function() {
	browserSync({
		server: {
			baseDir:"./build"
		},
		host: 'localhost',
		port: 3000,
		tunnel: true
		});
});

gulp.task('babel',  function () {
	return gulp.src('es6.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(rename("script.js"))
		.pipe(gulp.dest('bild/js'));
});
gulp.task('default', ['babel']);