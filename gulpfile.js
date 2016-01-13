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

gulp.task('compileSass', ['fonts'], function () {
    return gulp.src('src/scss/application.scss')
        .pipe(sass({
          outputStyle: 'nested',
          precison: 3,
          errLogToConsole: true,
          includePaths: ['./bower_components/bootstrap-sass/assets/stylesheets']
        }))
        .pipe(gulp.dest('src/css/'));
});

gulp.task('fonts', function () {
    return gulp
        .src(['src/fonts/*.*', './bower_components/bootstrap-sass-official/assets/fonts/**/*'])
        .pipe(gulp.dest('dist/fonts/'));
});

gulp.task('watchSass', function() {
  gulp.watch('src/scss/**/*.scss', ['compileSass']);
});

gulp.task('clean', function() {
  del(['dist', 'src/css/application.css*', 'src/js/app*.js*']);
});

gulp.task("build", ['minifyScripts', 'compileSass'], function() {
  return gulp.src(["src/css/application.css", "src/js/app.min.js", 'src/index.html',
                   "src/img/**", "src/fonts/**"], { base: './'})
            .pipe(gulp.dest('dist'));
});

gulp.task("default", ["clean", "build"]);

