var gulp = require('gulp');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['serve']);

gulp.task('serve', ['minifyJS', 'minifyCSS'], function() {
  browserSync({
    server: {
      baseDir: './',
      port: 3000
    }
  });

  gulp.watch(
    ['*.html', 'src/**/*.css', 'src/**/*.js'],
    {cwd: './'},
    ['minifyJS', 'minifyCSS', reload]
  );
});

gulp.task('jshint', ['clean'], function() {
  return gulp.src(['src/**/*.js'])
             .pipe(jshint())
             .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('minifyCSS', function() {
  return gulp.src('src/**/*.css')
             .pipe(concat('app.css'))
             .pipe(autoprefixer())
             .pipe(minifyCSS({compatibility: 'ie8'}))
             .pipe(gulp.dest('dist/css/'));
});

gulp.task('minifyJS', ['jshint'], function() {
  return gulp.src('src/**/*.js')
             .pipe(concat('bundle.js'))
             .pipe(uglify())
             .pipe(gulp.dest('dist/js/'));
});

gulp.task('clean', function() {
  return del(['dist/*.js', 'dist/*.css']);
});
