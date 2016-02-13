var gulp           = require('gulp'),
    browserSync    = require('browser-sync').create(),
    sass           = require('gulp-sass'),
    postcss        = require('gulp-postcss'),
    autoprefixer   = require('autoprefixer'),
    mqpacker       = require('css-mqpacker'),
    nano           = require('gulp-cssnano'),
    rename         = require('gulp-rename');

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("scss/*.scss")
        .pipe(sass({errLogToConsole:true}).on('error', sass.logError))
        .pipe(postcss([ 
            autoprefixer({ browsers: ['last 4 versions'] }),
            mqpacker()
         ]))
        .pipe(gulp.dest("css"))
        .pipe(nano())
        .pipe(rename({
            suffix: '.min'
        }))
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
