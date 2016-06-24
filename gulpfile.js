// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    spritesmith = require('gulp.spritesmith'),
    browserify = require('gulp-browserify'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');

//sprites
gulp.task('sprite', function () {
  var spriteData = gulp.src('./src/img/sprites/*.png').pipe(spritesmith({
    retinaSrcFilter: './src/img/sprites/*@2x.png',
    algorithm: 'binary-tree',
    imgName: '../img/sprites/sprite.png',
    retinaImgName: '../img/sprites/sprite@2x.png',
    cssName: '_sprites.scss',
    padding: 5
  }));
  spriteData
    .pipe(gulp.dest('build/img/sprites'));
  spriteData.css.pipe(gulp.dest('./src/scss/include'));
});
//browserify
gulp.task('scripts', function() {
  // Single entry point to browserify
  gulp.src(['src/js/index.js'])
    .pipe(browserify({
      debug: false,
      transform: ['jadeify'],
      extensions: ['.jade']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.reload({stream: true}))
});


gulp.task('script-jquery', function() {
  // Single entry point to browserify
  gulp.src(['src/js/jquery/jquery-1.12.js'])
    .pipe(gulp.dest('./build/js'))
});


// Static server and Watch Files For Changes
gulp.task('watch', function() {
  browserSync.init({
    server: {
      baseDir: "./build/"
    }
  });
  gulp.watch('src/**/*.js', ['scripts','scripts-lib']);
  gulp.watch(['src/**/*.scss','src/**/*.sass'], ['sass']);
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/img/images/**'], ['imagemin']);
});

// Compile html
gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream: true}));
});

// Compile img
gulp.task('imagemin', function() {
  return gulp.src('src/img/images/**')
    .pipe(imagemin())
    .pipe(gulp.dest('build/img/images/'))
    .pipe(browserSync.reload({stream: true}));
});

// Compile fonts
gulp.task('fonts', function() {
  return gulp.src('src/fonts/**')
    .pipe(gulp.dest('build/css/fonts'))
    .pipe(browserSync.reload({stream: true}));
});

// Compile Our Sass
gulp.task('sass', function() {
  return gulp.src('src/scss/style.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 10 versions', '> 5%', 'ie 8'],
      cascade: false }))
    .pipe(gulp.dest('./build/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Concatenate & Minify JS
gulp.task('scripts-lib', function() {
  return gulp.src('src/js/lib/*.js')
    .pipe(concat('lib.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.reload({stream: true}));
});


// Default Task
gulp.task('build', ['sass', 'script-jquery','scripts', 'scripts-lib',  'html', 'fonts', 'imagemin', 'sprite']);