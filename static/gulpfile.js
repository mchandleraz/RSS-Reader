var gulp = require('gulp'),
    rename = require('gulp-rename'),
    browserify = require('gulp-browserify'),
    babel = require('gulp-babel');

gulp.task('compile', function() {
    gulp.src('scripts/*.js')
    .pipe(babel({
        presets:['react']
    }))
    .pipe(browserify())
    .pipe(rename({
        suffix: '.build'
    }))
    .pipe(gulp.dest('./scripts/build'));
});

gulp.task('default', ['compile']);
    