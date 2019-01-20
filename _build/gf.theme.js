const gulp = require('gulp');
const log = require('fancy-log'); 
const sass = require('gulp-sass');
const args = require('yargs').argv; 
const header = require('gulp-header');
const rename = require("gulp-rename");
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const htmlmin = require('gulp-html-minifier');
const autoprefixer = require('gulp-autoprefixer');
const path = require('path');
const Jimp = require("jimp");
const imagemin = require('imagemin');
const foreach = require('gulp-foreach');
const imageminMozjpeg = require('imagemin-mozjpeg');

var paths = {
    sourceHtml: args.inputFolder,
    destHtml: args.outputFolder
};

gulp.task('css:compile', function() {
  log('input = ' +paths.sourceHtml); 
  log('output = ' +paths.destHtml); 
    return gulp.src(paths.sourceHtml+'/demo/themes/agency/scss/**/*.scss')
    .pipe(sass.sync({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    //.pipe(header(banner, {
    //  pkg: pkg
    //}))
    .pipe(gulp.dest(paths.destHtml+'/demo/themes/agency/css/'))
});

gulp.task('css:minify', function() {
//gulp.task('css:minify', ['css:compile'], function() {
  log('input = ' +paths.sourceHtml); 
  log('output = ' +paths.destHtml); 
  return gulp.src([
      paths.destHtml+'/demo/themes/agency/css/*.css',
      paths.destHtml+'!./demo/themes/agency/css/*.min.css'
    ])
    .pipe(cleanCSS())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(paths.destHtml+'/demo/themes/agency/css/'))
    //.pipe(browserSync.stream());
});

gulp.task('css', gulp.series('css:compile', 'css:minify'));

gulp.task('js:minify', function() {
  log('input = ' +paths.sourceHtml); 
  log('output = ' +paths.destHtml); 
  return gulp.src([
      paths.sourceHtml+'/demo/themes/agency/js/*.js',
      paths.sourceHtml+'!./demo/themes/agency/js/*.min.js'
    ])
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    //.pipe(header(banner, {
    //  pkg: pkg
    //}))
    .pipe(gulp.dest(paths.destHtml+'/demo/themes/agency/js/'))
    //.pipe(browserSync.stream());
});

gulp.task('vendor', function() {
  log('input = ' +paths.sourceHtml); 
  log('output = ' +paths.destHtml); 
  return gulp.src([
      paths.sourceHtml+'/demo/themes/agency/vendor/**/*',
    ])
    .pipe(gulp.dest(paths.destHtml+'/demo/themes/agency/vendor/'))

});

gulp.task('copyImages', function () {
  log('input = ' +paths.sourceHtml); 
  log('output = ' +paths.destHtml); 
  return gulp.src([
    paths.sourceHtml+'/demo/themes/agency/img/**/*']) 
    .pipe(gulp.dest(paths.destHtml+'/demo/themes/agency/img/'));
});

gulp.task('htmlMinify', function() {
  log('input = ' +paths.sourceHtml); 
  log('output = ' +paths.destHtml); 
  return gulp.src(paths.sourceHtml+'/demo/themes/agency/index*')
    .pipe(htmlmin({
      collapseWhitespace: true, 
      conservativeCollapse: true, 
      removeComments: true,
      ignoreCustomComments: [ /^!/ ]
  }))
    .pipe(gulp.dest(paths.destHtml+'/demo/themes/agency/')) 
});

gulp.task('htmlCopy', function () {
  log('input = ' +paths.sourceHtml); 
  log('output = ' +paths.destHtml); 
  return gulp.src([
    paths.sourceHtml+'/demo/themes/agency/*.ico',
    paths.sourceHtml+'/demo/themes/agency/*.html',
    paths.sourceHtml+'/demo/themes/agency/robots.txt'])
    .pipe(gulp.dest(paths.destHtml+'/demo/themes/agency/'));
});
