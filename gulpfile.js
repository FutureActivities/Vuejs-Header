var browserify = require('browserify');
var gulp = require('gulp');
var vueify = require('vueify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
 
var paths = {	
    vue: {
        src: ['./src/components/**/*.vue', './src/**/*.js']
    },
	script: {
		src: './src/App.js',
		dest: './dist'
	}
}

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: paths.script.src,
    debug: true
  });
  
  b.transform(babelify, {presets: ["es2015"], plugins: ["transform-runtime"]});
  b.transform(vueify);

  return b.bundle()
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.script.dest));
});

// Default task to be run with `gulp`
gulp.task('default', ['js'], function() {
	gulp.watch(paths.vue.src, ['js']);
});