var gulp           = require('gulp');
var browserSync    = require('browser-sync').create();
var sass           = require('gulp-sass');
var postcss        = require('gulp-postcss');
var autoprefixer   = require('autoprefixer');
var nano           = require('gulp-cssnano');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/**/*.scss")
        .pipe(sass())
        .pipe(postcss([ autoprefixer({ browsers: ['last 4 versions'] }) ]))
        .pipe(nano())
        .pipe(gulp.dest("css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {
    browserSync.init({
      notify: false,
      ghostMode: {
        clicks: true,
        forms: true,
        scroll: true
      },
      server: "./"
    });
    gulp.watch("scss/**/*.scss", ['sass']);
    gulp.watch("*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
