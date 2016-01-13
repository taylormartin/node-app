"use strict"

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  maps = require('gulp-sourcemaps'),
  del = require('del');

gulp.task("concatScripts", function(){
  return gulp.src([
    'src/js/main.js' 
  ])
  .pipe(maps.init())
  .pipe(concat('app.js'))
  .pipe(maps.write('./'))
  .pipe(gulp.dest('src/js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("src/js/app.js")
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('src/js'));
});

gulp.task("addJsDep", function() {
  return gulp.src([
      './bower_components/bootstrap-sass/assets/javascripts/bootstrap.min.js',
      './bower_components/jquery/dist/jquery.min.js' 
    ])
    .pipe(gulp.dest('src/js'))
});

gulp.task('compileSass', ['addFonts'], function () {
    return gulp.src('src/scss/application.scss')
        .pipe(sass({
          outputStyle: 'nested',
          precison: 3,
          errLogToConsole: true,
          includePaths: ['./bower_components/bootstrap-sass/assets/stylesheets']
        }))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('addFonts', function () {
    return gulp
        .src('./bower_components/bootstrap-sass/assets/fonts/**/*')
        .pipe(gulp.dest('src/fonts/'));
});

gulp.task('watchSass', function() {
  gulp.watch('src/scss/**/*.scss', ['compileSass']);
});

gulp.task('clean', function() {
  del(['dist', 'src/css/application.css*', 'src/js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'addJsDep', 'compileSass'], function() {
  return gulp.src(["src/css/application.css",
                   "src/js/app.min.js",
                   "src/js/jquery.min.js",
                   "src/js/bootstrap.min.js",
                   'src/index.html',
                   "src/img/**",
                   "src/fonts/**"],
                   { base: './src'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean", "build"]);

